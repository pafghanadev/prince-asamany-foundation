import React from 'react';
import Link from 'next/link';

interface CtaRowProps {
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}

export function CtaRow({ primary, secondary }: CtaRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Link
        href={primary.href}
        className="inline-flex min-h-12 items-center justify-center rounded-editorial bg-brand-gold px-6 font-semibold text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
      >
        {primary.label}
      </Link>
      {secondary && (
        <Link href={secondary.href} className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
