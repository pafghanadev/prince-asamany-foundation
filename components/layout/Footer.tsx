import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const groups = [
  { title: 'Explore our work', links: [
    ['About the foundation', '/about'], ['Our programs', '/programs'],
    ['Impact stories', '/stories'], ['Events & outreach', '/events'],
  ] },
  { title: 'Take part', links: [
    ['Make a donation', '/donate'], ['Become a volunteer', '/get-involved#form-heading'],
    ['Partner with us', '/contact'], ['Get involved', '/get-involved'],
  ] },
];
const linkStyle = 'inline-flex min-h-11 items-center justify-center py-2 font-body text-sm text-paper/80 underline-offset-4 transition-colors hover:text-brand-gold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold';

export function Footer() {
  return (
    <footer className="bg-ink text-paper" aria-label="Foundation footer">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8 md:px-8 md:pt-16">
        <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-10 text-center md:gap-10 md:grid-cols-2 lg:text-left lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:gap-12">
          <div className="col-span-2 flex flex-col items-center md:col-span-1 lg:items-start">
            <Link href="/" aria-label="Prince Asamany Foundation, Home">
              <Image src="/media/opt/logo-mark.webp" alt="Prince Asamany Foundation" width={800} height={427} sizes="180px" className="h-auto w-44 object-contain" />
            </Link>
            <p className="mt-4 max-w-xs font-display text-xl leading-snug">Hope, development &amp; opportunity for all.</p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/75">Community care, practical relief, and opportunities for families across Ghana.</p>
            <p className="mt-4 font-body text-xs text-brand-gold">Registered NGO &middot; Ejisu, Ghana</p>
          </div>
          {groups.map(group => (
            <nav key={group.title} aria-label={group.title} className="flex h-full flex-col border-t border-paper/15 pt-6 md:border-0 md:pt-0">
              <h2 className="mb-3 font-display text-xl">{group.title}</h2>
              <ul className="col-span-2 flex flex-1 flex-col items-center md:col-span-1 lg:items-start">
                {group.links.map(([label, href]) => <li key={href}><Link href={href} className={linkStyle}>{label}</Link></li>)}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 border-t border-paper/15 pt-6 md:col-span-1 md:border-0 md:pt-0">
            <h2 className="mb-3 font-display text-xl">Stay connected</h2>
            <address className="flex flex-col items-center font-body text-sm not-italic lg:items-start">
              <a href={`tel:${siteConfig.phone.tel}`} className={linkStyle}>{siteConfig.phone.display}</a>
              <a href={`mailto:${siteConfig.email}`} className={`${linkStyle} max-w-full break-all`}>{siteConfig.email}</a>
              <p className="mt-4 leading-relaxed text-paper/65">{siteConfig.address.box}<br />{siteConfig.address.line1}<br />{siteConfig.address.line2}</p>
            </address>
            <div className="mt-5 flex flex-wrap justify-center gap-5 lg:justify-start">
              {Object.entries(siteConfig.social).filter(([, href]) => href).map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className={`${linkStyle} gap-2 border-b border-paper/25 capitalize`}>
                  {label}<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-6 text-center md:flex-row lg:text-left">
          <p className="font-body text-xs leading-relaxed text-paper/60">&copy; {new Date().getFullYear()} Prince Asamany Foundation. All rights reserved.</p>
          <Link href="/contact" className={`${linkStyle} gap-2 text-brand-gold`}>Have a question? Contact us <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12 12 4M4 4h8v8" /></svg></Link>
        </div>
      </div>
    </footer>
  );
}
