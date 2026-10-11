'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function StickyDonate() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Pages with a Donate Now button near the footer - sticky button is redundant there
  const redundantPaths = ['/', '/about', '/programs', '/get-involved', '/stories'];
  const isRedundant =
    pathname === '/donate' || redundantPaths.some((p) => p === '/' ? pathname === '/' : pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isRedundant) return null;

  return (
    <aside aria-label="Quick donate">
      <Link
        href="/donate"
        aria-label="Donate to Prince Asamany Foundation"
        className={`fixed bottom-5 right-5 z-30 md:hidden flex items-center gap-2 bg-brand-gold text-brand-navy font-body text-sm font-bold px-5 py-3.5 rounded-editorial shadow-xl shadow-brand-navy/30 active:scale-95 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        Donate
      </Link>
    </aside>
  );
}
