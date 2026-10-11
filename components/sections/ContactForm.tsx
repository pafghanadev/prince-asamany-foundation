'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/lib/site';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...formData }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Sorry, something went wrong. Please try again or call us directly.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Sorry, something went wrong. Please try again or call us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-paper text-ink py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Contact details, 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="text-center lg:text-left">
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Find Us</span>
              <h2 className="font-display text-2xl font-bold text-ink mt-2 leading-tight">
                Get in Touch
              </h2>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:flex-row lg:items-start gap-4">
              <div className="w-10 h-10 bg-ink text-paper rounded-editorial flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <address className="not-italic">
                <div className="font-body text-sm font-bold text-ink mb-1">Physical Address</div>
                <p className="font-body text-sm text-ink/75 leading-relaxed">
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}<br />
                  {siteConfig.address.box}, {siteConfig.address.city}
                </p>
              </address>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center md:flex-row lg:items-start gap-4">
              <div className="w-10 h-10 bg-brand-red rounded-editorial flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="font-body text-sm font-bold text-ink mb-1">Phone</div>
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="font-body text-base font-semibold text-brand-red-dark hover:underline"
                >
                  {siteConfig.phone.display}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center md:flex-row lg:items-start gap-4">
              <div className="w-10 h-10 bg-brand-green rounded-editorial flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
                </svg>
              </div>
              <div>
                <div className="font-body text-sm font-bold text-ink mb-1">Email</div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-body text-base font-semibold text-brand-green hover:underline break-all"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-editorial overflow-hidden border-2 border-rule">
              <iframe
                title="Map showing Prince Asamany Foundation location in Ejisu, Ashanti Region, Ghana"
                src="https://maps.google.com/maps?q=Ejisu,+Ashanti+Region,+Ghana&output=embed&z=13"
                width="100%"
                height="240"
                className="w-full h-[240px] sm:h-[280px] lg:h-[380px] block"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Map showing Ejisu, Ashanti Region, Ghana"
              />
              {/* Fallback link for browsers that block iframes */}
              <a
                href="https://maps.google.com/maps?q=Ejisu,+Ashanti+Region,+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center font-body text-xs text-ink/75 py-2 hover:text-brand-red-dark transition-colors duration-200"
              >
                View on Google Maps ↗
              </a>
            </div>
          </div>

          {/* Contact form, 3 cols */}
          <div className="lg:col-span-3">
            <div className="mb-8 text-center lg:text-left">
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Message</span>
              <h2 className="font-display text-2xl font-bold text-ink mt-2 leading-tight">
                Send a Message
              </h2>
            </div>

            {submitted ? (
              <div role="status" className="bg-brand-green/10 border-2 border-brand-green rounded-editorial p-10">
                <div className="font-display text-2xl font-bold text-brand-green mb-3">Message received.</div>
                <p className="font-body text-lg text-ink/75 leading-relaxed">
                  Thank you for reaching out to the Prince Asamany Foundation. We will respond as
                  soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div role="alert" className="bg-brand-red/10 border-2 border-brand-red rounded-editorial p-4 font-body text-sm text-brand-red-dark">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block font-body text-sm font-semibold text-ink mb-1.5">
                      Full Name <span className="text-brand-red-dark" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name" name="name" type="text" required autoComplete="name"
                      value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 min-h-[52px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-body text-sm font-semibold text-ink mb-1.5">
                      Email Address <span className="text-brand-red-dark" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email" name="email" type="email" required autoComplete="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 min-h-[52px]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block font-body text-sm font-semibold text-ink mb-1.5">
                    Subject
                  </label>
                  <input
                    id="contact-subject" name="subject" type="text"
                    value={formData.subject} onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 min-h-[52px]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-body text-sm font-semibold text-ink mb-1.5">
                    Message <span className="text-brand-red-dark" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message" name="message" required rows={6}
                    value={formData.message} onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-[1.25rem] border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 resize-none"
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  defaultValue=""
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={sending}
                  className="font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-editorial border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark transition-all duration-200 active:scale-[0.98] min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

