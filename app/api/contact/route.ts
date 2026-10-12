import { NextResponse } from 'next/server';
import { EMAIL } from '@/lib/site';
import { checkContactRateLimit } from '@/lib/contact-rate-limit';

export const runtime = 'nodejs';

/**
 * Shared API route for the contact and volunteer forms.
 *
 * Delivers messages to the foundation inbox via the Resend REST API.
 * Configure by adding to .env.local:
 *   RESEND_API_KEY=re_...            (from https://resend.com)
 *   CONTACT_FROM_EMAIL=onboarding@resend.dev   (a sender verified in Resend)
 *
 * If RESEND_API_KEY is missing the submission is logged and a 503 is returned
 * so callers can surface a clear error instead of silently dropping messages.
 */
async function deliverMessage(payload: {
  formType: string;
  subject: string;
  name: string;
  email: string;
  phone?: string;
  opportunity?: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
  const text = [
    `New ${payload.formType}`,
    '',
    `From: ${payload.name} <${payload.email}>`,
    `Phone: ${payload.phone || 'n/a'}`,
    `Opportunity: ${payload.opportunity || 'n/a'}`,
    '',
    payload.message,
  ].join('\n');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from,
        to: [EMAIL],
        replyTo: payload.email,
        subject: payload.subject,
        text,
      }),
    });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => '');
    throw new Error(`Resend returned ${res.status}: ${bodyText}`);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: 'Invalid payload.' }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; pretend they succeeded without sending email.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const { type, name, email, subject, message, phone, opportunity } = body;

  // Type allow-list
  if (type !== 'contact' && type !== 'volunteer') {
    return NextResponse.json(
      { ok: false, error: 'Invalid form type.' },
      { status: 400 }
    );
  }

  // Basic validation
  const isValidEmail = typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email.trim());
  const validName = typeof name === 'string' && name.trim().length > 0 && name.trim().length <= 100;
  const validMessage = typeof message === 'string' && message.trim().length > 0 && message.trim().length <= 5000;
  const validSubject = typeof subject === 'string' ? subject.trim().length <= 200 : true;
  if (!validName || !isValidEmail || !validMessage || !validSubject) {
    return NextResponse.json(
      { ok: false, error: 'A valid name, email and message are required.' },
      { status: 400 }
    );
  }

  // Length caps
  const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
  const trimmedOpportunity = typeof opportunity === 'string' ? opportunity.trim() : '';
  if (trimmedPhone.length > 50) {
    return NextResponse.json(
      { ok: false, error: 'Phone number is too long.' },
      { status: 400 }
    );
  }
  if (trimmedOpportunity.length > 200) {
    return NextResponse.json(
      { ok: false, error: 'Opportunity text is too long.' },
      { status: 400 }
    );
  }

  try {
    if (await checkContactRateLimit(request, email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'Too many submissions. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '900' } }
      );
    }
  } catch (error) {
    console.error('Contact rate limit unavailable:', error);
    return NextResponse.json(
      { ok: false, error: 'Contact form is temporarily unavailable. Please try again later.' },
      { status: 503 }
    );
  }

  const formType = type === 'volunteer' ? 'Volunteer Application' : 'Contact Message';
  const subjectLine = (typeof subject === 'string' && subject.trim()) || `New ${formType}`;

  try {
    await deliverMessage({
      formType,
      subject: subjectLine,
      name: name.trim(),
      email: email.trim(),
      phone: trimmedPhone || undefined,
      opportunity: trimmedOpportunity || undefined,
      message: message.trim(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error.';
    console.error('Form submission error:', message);
    const isConfigError = message.startsWith('RESEND_API_KEY');
    return NextResponse.json(
      { ok: false, error: isConfigError ? 'Contact delivery is not configured yet.' : 'Server error.' },
      { status: isConfigError ? 503 : 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
