'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { blurProps } from '@/lib/media';

const founderPhotos = [
  {
    src: '/media/opt/FB_IMG_1763729825877.webp',
    alt: 'Prince Douglas Asamany in a tuxedo seated at the Philanthropic Awards & Charity Night gala dinner',
    pos: '50% 25%',
  },
  {
    src: '/media/opt/IMG-20251115-WA0160.webp',
    alt: 'Prince Douglas Asamany speaking with attendees at a foundation event',
    pos: '50% 15%',
  },
  {
    src: '/media/opt/IMG-20251118-WA0044.webp',
    alt: 'Prince Douglas Asamany delivering remarks from the podium at the awards night',
    pos: '50% 8%',
  },
];

export function FounderHighlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useReducedMotion();
  const current = founderPhotos[active];

  /* Auto-rotate every 5s; each change (auto or manual) restarts the countdown.
     Pausable on hover/focus (WCAG 2.2.2) and disabled entirely for reduced motion. */
  useEffect(() => {
    if (prefersReduced || paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % founderPhotos.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active, prefersReduced, paused]);
  return (
    <section id="founder" className="bg-ink text-paper py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Portrait & Moments */}
          <motion.div 
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-4 lg:col-span-7"
          >
            {/* Single auto-rotating frame - portrait ratio suits the source photos. Video lives on the About page. */}
            <div className="relative overflow-hidden rounded-editorial">
              <div
                className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] group"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={() => setPaused(false)}
              >
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    style={{ objectPosition: current.pos }}
                    className="object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    {...blurProps(current.src)}
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />

                {/* Slide indicators - 40px hit areas around the visual dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
                  {founderPhotos.map((photo, i) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show photo ${i + 1} of ${founderPhotos.length}`}
                      aria-current={i === active}
                      className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === active ? 'w-6 bg-brand-gold' : 'w-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Content - stretched to share one height with the imagery */}
          <motion.div 
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center justify-between gap-8 text-center lg:col-span-5 lg:items-start lg:text-left"
          >
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold mb-3 block">
                Meet Our Founder
              </span>
              <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
                Prince Douglas Asamany
              </h2>
            </div>

            <blockquote className="border-l-0 border-brand-gold pl-0 text-center lg:border-l-4 lg:pl-6 lg:text-left">
              <p className="font-display text-2xl italic leading-snug text-white/95">
                &ldquo;Our mission is simple: to stand as a bridge between need and compassion, bringing hope to those who need it most.&rdquo;
              </p>
            </blockquote>

            <p className="font-body text-lg text-white/75 leading-relaxed max-w-xl text-center lg:text-left">
              Awarded the 2025 Social Change Advocate Award, Prince Asamany has dedicated his life to uplifting communities across the Ashanti Region through initiatives like &ldquo;Joy to the Street&rdquo; and preventive healthcare programs.
            </p>

            <div className="border-t border-white/15 pt-6 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5 w-full" role="list">
              <div className="text-center lg:text-left">
                <p className="font-display text-xl font-bold text-brand-gold">2025</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/60 mt-1">Social Change Advocate honoree</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-xl font-bold text-brand-gold">Ashanti Region</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/60 mt-1">Communities uplifted</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-xl font-bold text-brand-gold">Joy to the Street</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/60 mt-1">Signature outreach</p>
              </div>
            </div>

            <Link 
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold bg-brand-gold text-brand-navy px-6 py-3 rounded-editorial hover:bg-white transition-colors duration-300"
            >
              Read Full Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

