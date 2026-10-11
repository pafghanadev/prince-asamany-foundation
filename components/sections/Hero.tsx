'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blurProps } from '@/lib/media';
import { useReducedMotion } from 'framer-motion';

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
  const [isInteracting, setIsInteracting] = React.useState(false);
  const reducedMotion = useReducedMotion();
  React.useEffect(() => {
    if (isInteracting || reducedMotion) return;
    const timer = setInterval(() => setCurrentIndex(i => (i + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(timer);
  }, [isInteracting, reducedMotion]);
  return (
    <section className="focus-surface-dark relative isolate overflow-hidden bg-ink text-white"
      aria-label="Prince Asamany Foundation" aria-roledescription="carousel"
      onMouseEnter={() => setIsInteracting(true)} onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setIsInteracting(false); }}>
      <div className="absolute inset-0 -z-20">
        {HERO_SLIDES.map((photo, index) => (
          <div key={photo.src} aria-hidden={index !== currentIndex}
            className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
            <Image src={photo.src} alt={photo.alt} fill className={`object-cover ${photo.position}`}
              priority={index === 0} quality={88} sizes="100vw" {...blurProps(photo.src)} />
          </div>
        ))}
      </div>
      <div className="hero-photo-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto flex min-h-[min(760px,calc(100svh-4.5rem))] max-w-[1440px] flex-col items-center justify-center px-6 pt-24 pb-28 text-center md:px-12 lg:items-start lg:text-left lg:px-16 lg:pt-24 lg:pb-28">
        <p className="mb-6 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold md:text-xs">Community-led change &middot; Ejisu, Ghana</p>
        <h1 className="hero-campaign-title w-full max-w-4xl">
          <span className="block">Hope.</span><span className="block">Development.</span>
          <span className="mt-2 block"><span className="hero-highlight">Opportunity</span></span>
          <span className="mt-2 block">for all.</span>
        </h1>
        <p className="mt-7 max-w-lg font-body text-base leading-relaxed text-white/95 md:text-lg">Standing with children, families, and communities across Ghana through healthcare, education, and opportunity.</p>
        <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-7 lg:justify-start">
          <Link href="/donate" className="inline-flex min-h-12 items-center justify-center gap-4 bg-brand-gold px-6 py-3 font-body text-sm font-bold text-ink transition-colors hover:bg-paper">Help change a life <span aria-hidden="true">&#8599;</span></Link>
          <Link href="/programs" className="inline-flex min-h-12 items-center justify-center gap-3 border-b border-white/60 py-3 font-body text-sm font-semibold text-white transition-colors hover:text-brand-gold">Explore our work <span aria-hidden="true">&#8594;</span></Link>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-2 px-6 text-center lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:text-left">
        <div className="flex items-center justify-center gap-1" role="group" aria-label="Choose community photo">
          {HERO_SLIDES.map((photo, index) => (
            <button key={photo.src} type="button" onClick={() => setCurrentIndex(index)}
              aria-label={`Show photo ${index + 1}: ${photo.caption}`} aria-pressed={index === currentIndex}
              className="flex h-11 w-9 items-center justify-center">
              <span className={`h-2.5 w-2.5 rounded-full border border-white ${index === currentIndex ? 'bg-brand-gold border-brand-gold' : 'bg-white/20'}`} />
            </button>
          ))}
        </div>
        <p className="font-body text-xs text-white/85" aria-live="polite">{HERO_SLIDES[currentIndex].caption}</p>
      </div>
      <div className="hero-paper-edge absolute inset-x-0 bottom-0 h-7 bg-paper md:h-10" aria-hidden="true" />
    </section>
  );
}
