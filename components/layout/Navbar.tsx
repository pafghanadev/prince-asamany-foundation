'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Focus trap for mobile menu - includes the header hamburger so keyboard
  // users can always Tab back to the close control
  useEffect(() => {
    if (!menuOpen) return;
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!menu || !toggle) return;

    const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = [toggle as HTMLElement, ...Array.from(menu.querySelectorAll<HTMLElement>(focusableSelectors))];

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  const navBg = 'bg-ink border-b border-white/10';

  return (
    <>
      <header
        className={`focus-surface-dark fixed top-0 left-0 right-0 z-50 transition-all duration-300 ` + navBg}>
        <nav
          className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-18"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 shrink-0" aria-label="Prince Asamany Foundation, Home">
            <Image
              src="/media/opt/logo-mark.webp"
              alt="Prince Asamany Foundation"
              width={800}
              height={427}
              sizes="160px"
              className="h-10 w-auto max-w-[10rem] object-contain"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={'micro-link-glow font-body text-sm font-medium transition-colors duration-200 py-2 border-b-2 ' + (active ? 'text-brand-gold border-brand-gold' : 'text-white/85 border-transparent hover:text-brand-gold hover:border-brand-gold')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop donate CTA */}
          <div className="ml-auto mr-2 lg:ml-0 lg:mr-0">
            <Link
              href="/donate"
              id="nav-donate-cta"
              tabIndex={menuOpen ? -1 : undefined}
              className="inline-block micro-press font-body text-sm font-semibold bg-brand-gold text-brand-navy px-5 py-2.5 rounded-editorial hover:bg-brand-gold-light"
            >
              Donate
            </Link>
          </div>

          {/* Mobile hamburger, 44px tap target */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-editorial text-white z-[60]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ` + (menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6')}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ` + (menuOpen ? 'opacity-0 w-0' : 'w-6')}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ` + (menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6')}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!menuOpen || undefined}
        className={`fixed inset-0 z-40 bg-paper text-ink flex flex-col overflow-y-auto transition-opacity duration-200 lg:hidden ` + (menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}
      >
        {/* Gold accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" />

        <nav className="flex-1 flex flex-col items-center px-6 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] text-center" aria-label="Mobile navigation">
          <p className="mb-5 font-body text-xs font-semibold uppercase text-brand-red-dark">Explore the foundation</p>
          <ul className="flex w-full max-w-sm flex-col list-none m-0 p-0 divide-y divide-rule border-y border-rule">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="flex flex-col items-center justify-center">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-flex min-h-12 w-full flex-col items-center justify-center font-display text-2xl font-medium py-2.5 transition-colors duration-200 ${
                      active ? 'text-brand-red-dark' : 'text-ink hover:text-brand-red-dark'
                    }`}
                    style={{
                      transitionDelay: menuOpen ? `${i * 45}ms` : '0ms',
                      transform: menuOpen ? 'translateY(0)' : 'translateY(14px)',
                      opacity: menuOpen ? 1 : 0,
                    }}
                  >
                    <span>{link.label}</span>
                    {/* Centered active underline indicator */}
                    {active && (
                      <span
                        className="w-6 h-0.5 rounded-full bg-brand-gold mt-1"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Donate CTA + Contact Info */}
          <div
            className="mt-6 flex w-full max-w-sm flex-col items-center text-center gap-3.5"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 45}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(14px)',
            }}
          >
            <Link
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="micro-press inline-flex items-center justify-center w-full max-w-xs font-body font-semibold text-base bg-brand-gold text-brand-navy py-3.5 px-6 rounded-editorial hover:bg-brand-gold-light active:scale-[0.98] transition-all"
            >
              Donate Now
            </Link>

            {/* Compact contact info */}
            <div className="pt-3 border-t border-rule flex flex-col items-center gap-1 w-full max-w-xs text-center">
              <span className="font-body text-[11px] text-ink/70">
                {siteConfig.address.box}, {siteConfig.address.city}, Ashanti Region
              </span>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="inline-flex min-h-11 items-center gap-1.5 font-body text-xs font-bold text-brand-red-dark hover:text-ink transition-colors py-0.5"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{siteConfig.phone.display}</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
