import Link from 'next/link';
import { programs } from '@/lib/content';

/**
 * Specific, traceable figures rather than unsupported aggregate impact counts.
 */
export function ProofStrip() {
  const items = [
    { value: '84', label: 'Students reached · July 2026', href: '/stories/free-deworming-exercise' },
    { value: String(programs.length).padStart(2, '0'), label: 'Core programme areas', href: '/programs' },
    { value: '2025', label: 'Social Change Advocate award', href: '/about' },
  ];

  return (
    <section aria-label="Foundation at a glance" className="bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-rule px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-12">
        {items.map(item => (
          <Link key={item.label} href={item.href} className="group flex min-h-28 flex-col items-center justify-center gap-2 py-6 text-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink md:py-9">
            <span className="font-display text-4xl font-bold leading-none text-ink md:text-5xl">{item.value}</span>
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-navy/75">{item.label} <span className="text-brand-red-dark transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
