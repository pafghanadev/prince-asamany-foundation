'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blurProps } from '@/lib/media';
import { EditorialHeadline, CtaRow } from '@/components/ui/editorial';

interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
  position: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/media/opt/IMG_6871.webp',
    alt: 'Founder Prince Douglas Asamany standing with foundation volunteers, mothers, and smiling children in Ashanti Region',
    caption: 'Community Solidarity, Ashanti Region',
    position: 'object-[center_top] lg:object-[center_24%]',
  },
  {
    src: '/media/opt/IMG_6846.webp',
    alt: 'Prince Douglas Asamany connecting with a mother and child during community outreach in Ejisu',
    caption: 'Direct Family Outreach, Ejisu',
    position: 'object-[center_top] lg:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG_6876.webp',
    alt: 'Foundation team distributing relief packages directly to children in the community',
    caption: 'Joy to the Street Outreach',
    position: 'object-[center_top] lg:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG_6885.webp',
    alt: 'Foundation volunteers and residents gathered during community relief outreach',
    caption: 'Community Relief in Action',
    position: 'object-[center_top] lg:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG-20260727-WA0008.webp',
    alt: 'Students of the Natural Resources Management programme holding health packages during the deworming initiative',
    caption: 'Youth Health & Deworming Outreach',
    position: 'object-[center_top] lg:object-[center_20%]',
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-rotate every 6.5 seconds, pausing while the pointer or touch is on the hero
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="bg-ink text-paper"
      aria-label="Hero, Prince Asamany Foundation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[38%_62%]">
        <div className="flex flex-col justify-center gap-8 px-6 pt-32 pb-16 md:px-12 lg:py-24 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Akyawkrom, Ejisu, Ashanti Region, Ghana
          </p>
          <EditorialHeadline
            level={1}
            tone="ink"
            title="Hope, Development & Opportunity for All."
            lead="Uplifting underprivileged children, families, and communities across Ghana through healthcare, education, and life-changing opportunity."
          />
          <CtaRow
            primary={{ href: '/donate', label: 'Support the Foundation' }}
            secondary={{ href: '/about', label: 'Learn more about us' }}
          />
        </div>

        <div className="relative min-h-[60svh] overflow-hidden lg:min-h-full">
          {HERO_SLIDES.map((s, idx) => (
            <div
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentIndex ? 'z-[1] opacity-100' : 'pointer-events-none z-0 opacity-0'
              }`}
              aria-hidden={idx !== currentIndex}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className={`object-cover ${s.position}`}
                priority={idx === 0}
                quality={88}
                sizes="(min-width: 1024px) 62vw, 100vw"
                {...blurProps(s.src)}
              />
            </div>
          ))}

          <p className="absolute bottom-4 left-4 z-[2] bg-ink/85 px-3 py-2 text-sm text-paper" aria-live="polite">
            {slide.caption}
          </p>

          <div className="absolute bottom-4 right-4 z-[2] flex gap-2" role="group" aria-label="Choose hero photo">
            {HERO_SLIDES.map((s, idx) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Show photo ${idx + 1}: ${s.caption}`}
                aria-current={idx === currentIndex}
                className={`h-3 w-3 rounded-editorial border border-paper ${idx === currentIndex ? 'bg-brand-gold' : 'bg-ink/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

