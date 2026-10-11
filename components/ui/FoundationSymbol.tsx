import type { SVGProps } from 'react';

type SymbolKind = 'care' | 'relief' | 'growth' | 'give' | 'volunteer' | 'partner';

// Original illustrations share a 64-unit grid, open outlines, and one gold accent.
export function FoundationSymbol({ kind, ...props }: SVGProps<SVGSVGElement> & { kind: SymbolKind }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      {kind === 'care' && <>
        <path d="M20 11h24v39H20zM14 50h36M27 31h10M32 26v10M25 50V40h14v10" />
        <path d="M27 18h10" className="stroke-brand-gold" strokeWidth="4" />
        <path d="M8 24h8M12 20v8M48 22h8M52 18v8" />
      </>}
      {(kind === 'relief' || kind === 'give') && <>
        <path d="M7 43h9l9 9h20l12-15c2-3-2-6-5-3l-9 8H30m-14 1 10-9h13c5 0 5 8 0 8H28M7 39v17h9V39z" />
        <path d="M33 28s-12-7-12-14c0-7 9-9 12-3 3-6 12-4 12 3 0 7-12 14-12 14Z" className="stroke-brand-gold" />
      </>}
      {kind === 'growth' && <>
        <path d="M8 53c10-6 18-6 25 0 8-6 16-6 23 0M32 46V22M32 34C18 34 14 26 14 18c12 0 18 7 18 16ZM32 27c0-13 8-19 19-19 0 12-6 19-19 19Z" />
        <path d="M8 59h48M23 42l9 4 9-4" className="stroke-brand-gold" />
      </>}
      {kind === 'volunteer' && <>
        <circle cx="32" cy="19" r="7" /><circle cx="12" cy="27" r="5" /><circle cx="52" cy="27" r="5" />
        <path d="M20 53V42c0-16 24-16 24 0v11M4 52V43c0-11 13-12 16-5M60 52V43c0-11-13-12-16-5M27 53V43M37 53V43" />
        <path d="m28 7 4-4 4 4" className="stroke-brand-gold" />
      </>}
      {kind === 'partner' && <>
        <path d="m4 24 10-9 12 7M60 24l-10-9-14 6H26l-8 8c-4 4 1 9 5 6l8-6 17 15M10 29l19 21c3 3 6 0 5-3M19 39l13 13c3 3 6 0 5-3M35 32l13 12c4 4 8-1 5-4L43 30M43 45l-5 5M54 28l-6 7" />
        <path d="M26 9h12M32 3v12" className="stroke-brand-gold" />
      </>}
    </svg>
  );
}
