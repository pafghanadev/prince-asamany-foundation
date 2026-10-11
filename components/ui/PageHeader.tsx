import Image from 'next/image';
import Link from 'next/link';
import { blurProps } from '@/lib/media';

interface PageHeaderProps {
  overline: string;
  title: string;
  description: string;
  bgImage?: string;
  imageAlt?: string;
  imageCaption?: string;
  action?: { href: string; label: string };
  tone?: 'navy' | 'green';
  className?: string;
}

export function PageHeader({ overline, title, description, bgImage, imageAlt = '', imageCaption, action, tone = 'navy', className = '' }: PageHeaderProps) {
  return (
    <section className={`pt-18 ${tone === 'green' ? 'bg-brand-green' : 'bg-ink'} text-paper ${className}`}>
      <div className={`mx-auto grid max-w-[1440px] ${bgImage ? 'lg:min-h-[560px] lg:grid-cols-12 lg:items-stretch' : ''}`}>
        <div className={`flex flex-col items-center justify-center px-6 py-12 text-center md:px-12 md:py-16 lg:items-start lg:px-16 lg:py-20 lg:text-left ${bgImage ? 'lg:col-span-5' : ''}`}>
          <p className="font-body text-xs font-semibold uppercase text-brand-gold">{overline}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-5xl xl:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-paper/80 text-pretty md:text-lg">{description}</p>
          {action && <Link href={action.href} className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 bg-brand-gold px-6 py-3 font-body text-sm font-semibold text-ink">{action.label}<span aria-hidden="true">↗</span></Link>}
        </div>
        {bgImage && <figure className="relative lg:col-span-7 lg:min-h-[560px]">
          <div className="relative aspect-[4/3] lg:absolute lg:inset-0 lg:h-full">
            <Image src={bgImage} alt={imageAlt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover object-center" {...blurProps(bgImage)} />
          </div>
          {imageCaption && <figcaption className="absolute inset-x-0 bottom-0 bg-ink/85 px-5 py-3 text-center font-body text-xs text-paper lg:text-left">{imageCaption}</figcaption>}
        </figure>}
      </div>
    </section>
  );
}
