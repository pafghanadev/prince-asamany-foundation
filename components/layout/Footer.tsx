import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks, siteConfig } from '@/lib/site';

const footerLinks = [...navLinks, { label: 'Donate', href: '/donate' }];

const socialIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'facebook':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    default:
      return null;
  }
};

// Only render social links that have been given real URLs in lib/site.ts
const socialLinks = Object.entries(siteConfig.social)
  .filter(([, href]) => href)
  .map(([label, href]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), href, icon: socialIcon(label) }));

export function Footer() {
  return (
    <footer className="bg-ink text-paper" role="contentinfo">
      {/* ── Mobile-Optimized Compact Footer (md:hidden) ── */}
      <div className="md:hidden px-5 py-6 flex flex-col gap-4">
        {/* Brand Header Block: Centered Logo, Slogan, Status & Socials */}
        <div className="flex flex-col items-center text-center gap-2">
          {/* Centered Logo */}
          <Link href="/" aria-label="Prince Asamany Foundation, Home" className="inline-flex items-center justify-center">
            <Image
              src="/media/opt/logo-mark.webp"
              alt="Prince Asamany Foundation"
              width={800}
              height={427}
              sizes="160px"
              className="h-10 w-auto max-w-[10rem] object-contain"
            />
          </Link>

          {/* Centered Slogan */}
          <p className="font-display text-sm italic text-brand-gold font-medium leading-snug">
            Hope, Development &amp; Opportunity for All
          </p>

          {/* Centered Status Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-editorial bg-white/10 text-white/85 font-body text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0 animate-pulse" aria-hidden="true" />
            Registered NGO · Ejisu, Ghana
          </span>

          {/* Centered Social Icons */}
          <div className="flex items-center justify-center gap-2.5 pt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 flex items-center justify-center rounded-editorial border border-white/20 text-white/80 hover:text-brand-gold hover:border-brand-gold transition-colors active:scale-95"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full" aria-hidden="true" />

        {/* Navigation Grid: 2-column centered links */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 list-none m-0 p-0 text-center max-w-xs mx-auto w-full" role="list">
          {footerLinks.map((link) => {
            const isDonate = link.href === '/donate';
            return (
              <li key={link.href} className="flex items-center justify-center">
                <Link
                  href={link.href}
                  className={`font-body text-xs py-1 inline-flex items-center justify-center gap-1 ${
                    isDonate
                      ? 'font-bold text-brand-gold hover:text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isDonate && <span aria-hidden="true">→</span>}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Dedicated 2-Button Action Bar & Clean Postal Address */}
        <div className="pt-2.5 border-t border-white/10 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-editorial bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 text-xs font-body font-semibold text-white transition-all active:scale-[0.98]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Us</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-editorial bg-white/10 hover:bg-brand-gold hover:text-brand-navy border border-white/15 text-xs font-body font-semibold text-white transition-all active:scale-[0.98]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold shrink-0">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
              </svg>
              <span>Email Us</span>
            </a>
          </div>

          {/* Clean Postal Address String */}
          <div className="flex items-center justify-center text-center gap-1.5 text-[11px] text-white/65 font-body">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold/80 shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>{siteConfig.address.box}, {siteConfig.address.city}, Ashanti Region</span>
          </div>
        </div>
      </div>

      {/* ── Desktop Executive Footer (hidden md:grid) ── */}
      <div className="hidden md:grid max-w-7xl mx-auto px-8 py-16 grid-cols-3 gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-3 items-start text-left">
          <Link href="/" aria-label="Prince Asamany Foundation, Home">
            <Image
              src="/media/opt/logo-mark.webp"
              alt="Prince Asamany Foundation"
              width={800}
              height={427}
              sizes="160px"
              className="h-14 w-auto max-w-[12rem] object-contain"
            />
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-editorial bg-white/10 text-white/80 font-body text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Registered NGO · Ejisu, Ghana
          </span>
          <p className="font-body text-sm text-white/75 leading-relaxed max-w-xs">
            Uplifting underprivileged children, families, and communities across Ghana through healthcare, education, and welfare.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-2.5 mt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-editorial border border-white/20 text-white/75 hover:text-brand-gold hover:border-brand-gold hover:scale-110 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="text-left">
          <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-gold mb-5">
            Navigation
          </h3>
          <ul className="flex flex-col gap-1 list-none m-0 p-0 text-left" role="list">
            {footerLinks.map((link) => {
              const isDonate = link.href === '/donate';
              return (
                <li key={link.href} className="flex justify-start">
                  <Link
                    href={link.href}
                    className={`font-body text-sm hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 py-1 ${
                      isDonate
                        ? 'font-bold text-brand-gold hover:text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isDonate && <span aria-hidden="true">→</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="text-left">
          <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-gold mb-5">
            Contact Us
          </h3>

          <address className="not-italic flex flex-col items-start gap-4 text-left">
            {/* Postal Address */}
            <div className="flex items-start gap-3.5 text-left">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="font-body text-sm text-white/80 leading-relaxed text-left">
                {siteConfig.address.box}<br />
                {siteConfig.address.line1}<br />
                {siteConfig.address.line2}
              </span>
            </div>

            {/* Telephone */}
            <div className="flex items-start gap-3.5 text-left">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="font-body text-sm text-white/80 hover:text-brand-gold transition-colors duration-200 inline-block py-1"
              >
                {siteConfig.phone.display}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 text-left">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-body text-sm text-white/80 hover:text-brand-gold transition-colors duration-200 break-all inline-block py-1"
              >
                {siteConfig.email}
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Gold bar bottom strip, mirrors flyer footer */}
      <div className="bg-brand-gold">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-center sm:text-left">
          <span className="font-body text-xs font-semibold text-brand-navy">
            &copy; {new Date().getFullYear()} Prince Asamany Foundation. All rights reserved.
          </span>
          <span className="font-display text-xs italic text-brand-navy hidden sm:inline">
            Hope, Development &amp; Opportunity for All
          </span>
        </div>
      </div>
    </footer>
  );
}
