import Link from 'next/link';
import { FoundationSymbol } from '@/components/ui/FoundationSymbol';

const waysToHelp = [
  { title: 'Give what you can', description: 'Support health outreach, education, and practical relief for families.', label: 'Make a donation', href: '/donate' },
  { title: 'Bring your skills', description: 'Join the people who make community outreach possible.', label: 'Become a volunteer', href: '/get-involved' },
  { title: 'Work alongside us', description: 'Connect your organisation with a community initiative.', label: 'Talk about a partnership', href: '/contact' },
];

export function CommunityAction() {
  return (
    <section className="border-b border-rule bg-paper text-ink" aria-labelledby="community-action-heading">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="font-body text-xs font-semibold uppercase text-brand-red-dark">Take part</p>
            <h2 id="community-action-heading" className="mt-3 font-display text-3xl leading-tight text-balance md:text-4xl">A place for you in this work.</h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink/75 text-pretty">A gift, a few hours, or a shared idea. Start where you can.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {waysToHelp.map((way, index) => (
              <div key={way.href} className="border-t border-rule pt-5 text-center lg:text-left">
                <FoundationSymbol kind={index === 0 ? 'give' : index === 1 ? 'volunteer' : 'partner'} className="mx-auto size-14 text-ink md:mx-0" />
                <h3 className="mt-3 font-display text-xl text-balance">{way.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/75 text-pretty">{way.description}</p>
                <Link href={way.href} className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 border-b border-brand-red-dark font-body text-sm font-semibold text-brand-red-dark lg:justify-start">{way.label}<span aria-hidden="true">↗</span></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
