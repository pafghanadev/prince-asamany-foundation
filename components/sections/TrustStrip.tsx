import { pressItems } from '@/lib/content';

/**
 * Compact trust band shown directly before the closing CTA banner.
 * Three equal-height cards so the credentials read as one set.
 */
export function TrustStrip() {
  const latestPress = pressItems[0];

  const cardBase = 'flex h-full min-h-[11rem] flex-col items-center justify-center gap-3 rounded-editorial border border-rule bg-paper-deep/60 p-5 text-center md:p-6';
  const iconTile = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-editorial bg-ink text-paper';

  return (
    <section aria-label="Recognition and trust" className="bg-paper text-ink border-y border-rule py-8 md:py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {/* Registered NGO */}
          <div className={cardBase}>
            <span className={iconTile} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span className="block font-body text-sm font-bold text-brand-navy">Registered NGO</span>
            <span className="block font-body text-xs leading-relaxed text-brand-navy/80">Ejisu Municipal Assembly, Ghana</span>
          </div>

          {/* Press coverage */}
          <a
            href={latestPress?.href ?? 'https://www.choicenewsonline.com'}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardBase} group transition-colors duration-200 hover:border-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2`}
            aria-label={`Our work has been featured by ${latestPress?.outlet ?? 'Choice News Online'}. Read the latest article (opens in a new tab)`}
          >
            <span className={iconTile} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
              </svg>
            </span>
            <span className="block font-body text-sm font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-red-dark">
              Featured by Choice News Online
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block ml-1 -mt-0.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 17 17 7" /><path d="M7 7h10v10" />
              </svg>
            </span>
            <span className="block font-body text-xs leading-relaxed text-brand-navy/80">Local coverage of our programs</span>
          </a>

          {/* Award */}
          <div className={cardBase}>
            <span className={iconTile} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </span>
            <span className="block font-body text-sm font-bold text-brand-navy">2025 Social Change Advocate</span>
            <span className="block font-body text-xs leading-relaxed text-brand-navy/80">AFLAG Philanthropic Awards</span>
          </div>
        </div>
      </div>
    </section>
  );
}