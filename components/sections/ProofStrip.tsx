import { programs } from '@/lib/content';

/**
 * Proof strip directly under the hero. Figures come from verified
 * site content only; no unconfirmed impact totals.
 */
export function ProofStrip() {
  const items = [
    { value: String(programs.length), label: 'Core program areas' },
    { value: '2025', label: 'Social Change Advocate honoree' },
    { value: 'Registered', label: 'NGO in Ejisu, Ghana' },
  ];

  return (
    <section aria-label="Foundation at a glance" className="bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-rule px-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-12">
        {items.map(item => (
          <div key={item.label} className="flex flex-col items-center justify-center gap-1 py-7 text-center md:py-10">
            <span className="font-display text-3xl font-black leading-none text-ink md:text-4xl">{item.value}</span>
            <span className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy/75">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}