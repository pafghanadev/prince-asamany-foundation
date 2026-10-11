'use client';

import React, { useState } from 'react';
import { CTABanner } from '@/components/sections/CTABanner';

const opportunities = [
  {
    title: 'Community Outreach Volunteer',
    description:
      'Work directly with our team in Ejisu communities, listening to community needs, supporting clean water outreach, and spending time with families.',
    commitment: 'Flexible, weekends or weekdays',
    location: 'Ejisu Municipality',
  },
  {
    title: 'Skills Trainer / Facilitator',
    description:
      'Share your practical skills and know-how by leading workshops in areas such as business skills, health education, financial literacy, or vocational trades.',
    commitment: '1 - 2 sessions per month',
    location: 'On-site in Ejisu / Hybrid',
  },
  {
    title: 'Environmental Program Volunteer',
    description:
      'Join our tree-planting and environmental care campaigns in the Ashanti Region. No prior experience required, just a heart for the community.',
    commitment: 'Seasonal campaigns',
    location: 'Ashanti Region field sites',
  },
  {
    title: 'Communications & Documentation',
    description:
      'Help us document our impact through photography, writing, or social media content. Support our storytelling to reach more partners and donors.',
    commitment: 'Remote / Flexible',
    location: 'Remote or Ejisu',
  },
];

export function GetInvolvedContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    opportunity: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        body: JSON.stringify({ type: 'volunteer', ...formData }),
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
    <>
      {/* Opportunities */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="opportunities-heading">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12 text-center">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Volunteer</span>
            <h2 id="opportunities-heading" className="font-display text-3xl md:text-4xl font-bold text-ink mt-2 leading-tight">
              Volunteer Opportunities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <div key={opp.title} className="p-6 bg-paper text-ink rounded-editorial flex flex-col gap-4 border border-rule hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-display text-xl font-bold text-ink leading-tight">{opp.title}</h3>
                <p className="font-body text-sm text-ink/75 leading-relaxed">{opp.description}</p>
                <div className="flex flex-col gap-1.5 mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                    <span className="font-body text-xs text-ink/75"><strong className="font-semibold">Commitment:</strong> {opp.commitment}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden="true" />
                    <span className="font-body text-xs text-ink/75"><strong className="font-semibold">Location:</strong> {opp.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="form-heading">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <div className="mb-10 text-center">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Express Interest</span>
            <h2 id="form-heading" className="font-display text-3xl font-bold text-ink mt-2 leading-tight">
              Register as a Volunteer
            </h2>
          </div>

          {submitted ? (
            <div role="status" className="bg-brand-green/10 border-2 border-brand-green rounded-editorial p-10 text-center">
              <div className="font-display text-2xl font-bold text-brand-green mb-3">Thank you for reaching out.</div>
              <p className="font-body text-lg text-ink/75 leading-relaxed">
                We have received your interest. A member of our team will contact you at the details
                you provided. We look forward to working with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div role="alert" className="bg-brand-red/10 border-2 border-brand-red rounded-editorial p-4 font-body text-sm text-brand-red-dark">
                  {error}
                </div>
              )}
              {/* Name */}
              <div>
                <label htmlFor="volunteer-name" className="block font-body text-sm font-semibold text-ink mb-1.5">
                  Full Name <span className="text-brand-red-dark" aria-hidden="true">*</span>
                </label>
                <input
                  id="volunteer-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 min-h-[52px]"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="volunteer-email" className="block font-body text-sm font-semibold text-ink mb-1.5">
                    Email Address <span className="text-brand-red-dark" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="volunteer-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 min-h-[52px]"
                  />
                </div>
                <div>
                  <label htmlFor="volunteer-phone" className="block font-body text-sm font-semibold text-ink mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="volunteer-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+233..."
                    className="w-full px-4 py-3 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 min-h-[52px]"
                  />
                </div>
              </div>

              {/* Opportunity */}
              <div>
<label htmlFor="volunteer-opportunity" className="block font-body text-sm font-semibold text-ink mb-1.5">
                    Area of Interest
                  </label>
                  <div className="relative">
                    <select
                      id="volunteer-opportunity"
                      name="opportunity"
                      value={formData.opportunity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 rounded-editorial border-2 border-brand-navy/20 bg-paper font-body text-base text-ink focus:border-brand-navy transition-colors duration-200 min-h-[52px] appearance-none"
                    >
                      <option value="">Select an opportunity...</option>
                      {opportunities.map((opp) => (
                        <option key={opp.title} value={opp.title}>{opp.title}</option>
                      ))}
                      <option value="General Support">General Support</option>
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="volunteer-message" className="block font-body text-sm font-semibold text-ink mb-1.5">
                  Tell us about yourself
                </label>
                <textarea
                  id="volunteer-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your skills, availability, and why you want to volunteer..."
                  className="w-full px-4 py-3 rounded-[1.25rem] border-2 border-brand-navy/20 bg-paper font-body text-base text-ink placeholder:text-ink/55 focus:border-brand-navy transition-colors duration-200 resize-none"
                />
              </div>

              <input
                type="text"
                name="website"
                value=""
                readOnly
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <button
                type="submit"
                id="volunteer-submit"
                disabled={sending}
                className="font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-editorial border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark transition-all duration-200 active:scale-[0.98] min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>

      <CTABanner
        secondaryAction={{ href: '/contact', label: 'Speak With Our Team' }}
      />
    </>
  );
}
