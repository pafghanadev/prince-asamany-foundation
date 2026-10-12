import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getEvents,
  getGoogleCalendarUrl,
  formatEventCategory,
  formatEventTime,
  normalizeImageUrl,
  normalizeRegistrationUrl,
  parseHumanDate,
} from '../lib/events.ts';
import { checkContactRateLimit } from '../lib/contact-rate-limit.ts';

const sampleEvent = {
  title: 'Community Health Fair',
  date: '05/11/2099',
  time: '8:30 AM - 3:30 PM GMT',
  description: 'Free outreach',
  location: 'Ejisu, Ghana',
};

function restoreEnv(key, original) {
  if (original === undefined) delete process.env[key];
  else process.env[key] = original;
}

test('parses Ghana numeric dates, human dates, and rejects invalid dates', () => {
  assert.equal(parseHumanDate('05/11/2099')?.toISOString(), '2099-11-05T00:00:00.000Z');
  assert.equal(parseHumanDate('11/24/2099')?.toISOString(), '2099-11-24T00:00:00.000Z');
  assert.equal(parseHumanDate('24th October 2099')?.toISOString(), '2099-10-24T00:00:00.000Z');
  assert.equal(parseHumanDate('2099-02-30'), null);
  assert.equal(parseHumanDate('31/11/2099'), null);
  assert.equal(parseHumanDate('random'), null);
});

test('Google Calendar gets Ghana-local event hours or an exclusive all-day end', () => {
  const timed = new URL(getGoogleCalendarUrl(sampleEvent));
  assert.equal(timed.searchParams.get('dates'), '20991105T083000/20991105T153000');
  assert.equal(timed.searchParams.get('ctz'), 'Africa/Accra');

  const allDay = new URL(getGoogleCalendarUrl({ ...sampleEvent, time: undefined }));
  assert.equal(allDay.searchParams.get('dates'), '20991105/20991106');

  const overnight = new URL(getGoogleCalendarUrl({ ...sampleEvent, time: '11 PM - 1 AM' }));
  assert.equal(overnight.searchParams.get('dates'), '20991105T230000/20991106T010000');

  const onlyStart = new URL(getGoogleCalendarUrl({ ...sampleEvent, time: '11:00:00' }));
  assert.equal(onlyStart.searchParams.get('dates'), '20991105T110000/20991105T120000');
  assert.match(onlyStart.searchParams.get('details'), /one-hour placeholder/);

  const nearMidnight = new URL(getGoogleCalendarUrl({ ...sampleEvent, time: '23:30:00' }));
  assert.equal(nearMidnight.searchParams.get('dates'), '20991105T233000/20991106T003000');
});

test('formats spreadsheet time and category labels for visitors', () => {
  assert.equal(formatEventTime('11:00:00'), '11:00 AM');
  assert.equal(formatEventTime('13:30:00 - 16:00:00'), '1:30 PM - 4:00 PM');
  assert.equal(formatEventTime('8:30 AM - 3:30 PM GMT'), '8:30 AM - 3:30 PM GMT');
  assert.equal(formatEventCategory('SocialWelfare'), 'Social Welfare');
  assert.equal(formatEventCategory('community_health'), 'community health');
});

test('only accepts approved event image sources', () => {
  assert.equal(normalizeImageUrl('https://drive.google.com/file/d/abc123/view'), 'https://lh3.googleusercontent.com/d/abc123');
  assert.equal(normalizeImageUrl('https://drive.google.com/open?id=abc123'), 'https://lh3.googleusercontent.com/d/abc123');
  assert.equal(normalizeImageUrl('https://evil.test/drive.google.com/file/d/abc123'), undefined);
  assert.equal(normalizeImageUrl('http://images.unsplash.com/test'), undefined);
  assert.equal(normalizeImageUrl('//evil.test/path'), undefined);
  assert.equal(normalizeImageUrl('/media/opt/event.webp'), '/media/opt/event.webp');
});

test('prevents untrusted spreadsheet registration link schemes', () => {
  assert.deepEqual(normalizeRegistrationUrl('/contact'), { href: '/contact', kind: 'internal' });
  assert.equal(normalizeRegistrationUrl('javascript:alert(1)'), null);
  assert.equal(normalizeRegistrationUrl('data:text/html,hello'), null);
  assert.equal(normalizeRegistrationUrl('//evil.test'), null);
  assert.deepEqual(normalizeRegistrationUrl('https://example.org/register'), { href: 'https://example.org/register', kind: 'web' });
  assert.deepEqual(normalizeRegistrationUrl('team@example.org'), { href: 'mailto:team@example.org', kind: 'email' });
  assert.deepEqual(normalizeRegistrationUrl('+233 24 123 4567'), { href: 'tel:+233241234567', kind: 'phone' });
  assert.deepEqual(normalizeRegistrationUrl('0553045832'), { href: 'tel:+233553045832', kind: 'phone' });
});

test('missing event sheet gives an unavailable response, never made-up dates', async () => {
  const publicId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID;
  const privateId = process.env.GOOGLE_SHEETS_EVENTS_ID;
  try {
    delete process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID;
    delete process.env.GOOGLE_SHEETS_EVENTS_ID;
    assert.deepEqual(await getEvents(), { upcoming: [], past: [], all: [], source: 'fallback' });
  } finally {
    restoreEnv('NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID', publicId);
    restoreEnv('GOOGLE_SHEETS_EVENTS_ID', privateId);
  }
});

test('live CSV respects Published, Draft, Cancelled, and date status', async () => {
  const priorId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID;
  const previousFetch = globalThis.fetch;
  try {
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID = 'test-sheet';
    const csv = [
      'Title,Date,Time,Location,Category,Description,Image,Registration,Featured,Status',
      'Future Event,05/11/2099,9 AM - 1 PM,Ejisu,Healthcare,Open to all,,/contact,yes,Published',
      'Past Event,2020-05-10,9 AM - 1 PM,Ejisu,Healthcare,Completed,,,no,Published',
      'Cancelled Event,2099-12-01,9 AM - 1 PM,Ejisu,Healthcare,Cancelled,,,no,Cancelled',
      'Draft Event,2099-12-05,9 AM - 1 PM,Ejisu,Healthcare,Unconfirmed,,,no,Draft',
      'Bad Date,2099-02-30,9 AM - 1 PM,Ejisu,Healthcare,Invalid,,,no,Published',
    ].join('\n');
    globalThis.fetch = async () => new Response(csv, { status: 200 });
    const result = await getEvents();
    assert.equal(result.source, 'google_sheets');
    assert.deepEqual(result.upcoming.map((event) => event.title), ['Future Event']);
    assert.deepEqual(result.past.map((event) => event.title), ['Past Event']);
    assert.deepEqual(result.all.map((event) => event.title), ['Future Event', 'Past Event', 'Cancelled Event']);
  } finally {
    globalThis.fetch = previousFetch;
    restoreEnv('NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID', priorId);
  }
});

test('unavailable sheet or invalid headers show unavailable state', async () => {
  const priorId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID;
  const previousFetch = globalThis.fetch;
  try {
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID = 'test-sheet';
    globalThis.fetch = async () => new Response('Wrong,Headers\nfoo,bar', { status: 200 });
    assert.equal((await getEvents()).source, 'fallback');
    globalThis.fetch = async () => new Response('Title,Date', { status: 200 });
    assert.equal((await getEvents()).source, 'google_sheets');
    globalThis.fetch = async () => new Response('unavailable', { status: 503 });
    assert.equal((await getEvents()).source, 'fallback');
  } finally {
    globalThis.fetch = previousFetch;
    restoreEnv('NEXT_PUBLIC_GOOGLE_SHEET_EVENTS_ID', priorId);
  }
});

test('shared contact counters enforce five submissions per email', async () => {
  const oldUrl = process.env.UPSTASH_REDIS_REST_URL;
  const oldToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const oldHeader = process.env.CONTACT_TRUSTED_IP_HEADER;
  const originalFetch = globalThis.fetch;
  const counts = new Map();
  try {
    process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.test';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
    delete process.env.CONTACT_TRUSTED_IP_HEADER;
    globalThis.fetch = async (_url, options) => {
      const [, , , key] = JSON.parse(options.body);
      const next = (counts.get(key) ?? 0) + 1;
      counts.set(key, next);
      return Response.json({ result: next });
    };
    const request = new Request('https://example.org/api/contact');
    for (let i = 0; i < 5; i++) {
      assert.equal(await checkContactRateLimit(request, 'Someone@Example.org'), false);
    }
    assert.equal(await checkContactRateLimit(request, 'someone@example.org'), true);

    globalThis.fetch = async () => new Response('failure', { status: 503 });
    await assert.rejects(checkContactRateLimit(request, 'other@example.org'), /503/);
  } finally {
    globalThis.fetch = originalFetch;
    restoreEnv('UPSTASH_REDIS_REST_URL', oldUrl);
    restoreEnv('UPSTASH_REDIS_REST_TOKEN', oldToken);
    restoreEnv('CONTACT_TRUSTED_IP_HEADER', oldHeader);
  }
});
