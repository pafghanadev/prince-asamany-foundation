'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { blurProps } from '@/lib/media';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/* Intrinsic dimensions of each source photo so the masonry keeps natural
   aspect ratios - no cropping. */
const IMAGES: GalleryImage[] = [
  { src: '/media/opt/IMG-20251118-WA0038.webp', alt: 'Prince Douglas Asamany on the red carpet holding the 2025 Social Change Advocate Award trophy and citation', caption: 'On the red carpet with the trophy and citation', width: 854, height: 1280 },
  { src: '/media/opt/IMG_6934.webp', alt: 'Foundation volunteers in Prince Asamany Foundation shirts celebrating with raised arms outside the Santasi event centre in Kumasi', caption: 'Team celebration after a street outreach in Santasi', width: 1384, height: 1038 },
  { src: '/media/opt/IMG-20251118-WA0040.webp', alt: 'Prince Douglas Asamany with fellow honorees holding their trophies at the Philanthropic Awards & Charity Night', caption: 'With fellow honorees at the Philanthropic Awards & Charity Night', width: 1280, height: 854 },
  { src: '/media/opt/WhatsApp Image 2026-08-20 at 18.25.51.webp', alt: 'Prince Douglas Asamany holding the Social Change Advocate Award plaque', caption: 'Holding the Social Change Advocate Award plaque', width: 810, height: 1080 },
  { src: '/media/opt/IMG_6846.webp', alt: 'Prince Asamany connecting with the community during the Joy to the Street campaign', caption: 'Connecting with the community during the Joy to the Street campaign', width: 1384, height: 1038 },
  { src: '/media/opt/IMG-20251115-WA0157.webp', alt: 'Prince Douglas Asamany engaging with guests at a foundation event', caption: 'Engaging with guests at a foundation event', width: 1080, height: 810 },
  { src: '/media/opt/IMG_4388.webp', alt: 'Women and children queueing along a fence for food distribution during the Joy to the Street campaign in Kumasi', caption: 'Families queueing for relief supplies during Joy to the Street', width: 1384, height: 1038 },
  { src: '/media/opt/IMG-20251118-WA0042.webp', alt: 'Award ceremony moment featuring Prince Douglas Asamany and AFLAG organisers', caption: 'With AFLAG organisers at the award ceremony', width: 1280, height: 854 },
  { src: '/media/opt/IMG_6876.webp', alt: 'Foundation members actively distributing resources to families', caption: 'Distributing resources to families in need', width: 1384, height: 1038 },
  { src: '/media/opt/IMG_6889.webp', alt: 'Community members receiving support from the foundation', caption: 'Bringing hope and tangible support to the streets', width: 1384, height: 1038 },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AwardGallery() {
const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number) => {
    lastTriggerRef.current = document.activeElement as HTMLElement;
    setActive(index);
  };

  const closeLightbox = () => {
    setActive(null);
    lastTriggerRef.current?.focus();
  };

  const next = useCallback(() => {
    const count = IMAGES.length;
    setActive((cur) => (cur === null ? cur : (cur + 1) % count));
  }, []);

  const prev = useCallback(() => {
    const count = IMAGES.length;
    setActive((cur) => (cur === null ? cur : (cur - 1 + count) % count));
  }, []);

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, next, prev]);

  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !dialog.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    dialog.addEventListener('keydown', handleTab);
    return () => dialog.removeEventListener('keydown', handleTab);
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="text-center mb-10 border-t border-white/10 pt-12">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-white">Impact & Recognition Gallery</h3>
        <p className="font-body text-base text-white/60 mt-3 max-w-2xl mx-auto">
          Moments from the 2025 Philanthropic Awards &amp; our community fieldwork, tap any photo to view it full screen.
        </p>
      </div>

      {/* Mobile: Horizontal scroll snap. Desktop: Editorial masonry */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 sm:block sm:columns-2 lg:columns-3 sm:gap-4 md:gap-6 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {IMAGES.map((img, i) => (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.05, ease: 'easeOut' }}
            key={img.src}
            type="button"
            onClick={() => openLightbox(i)}
            aria-label={`View photo: ${img.caption}`}
            className="group relative shrink-0 snap-center w-[85vw] sm:w-full mb-0 sm:mb-4 md:mb-6 break-inside-avoid block overflow-hidden rounded-editorial border border-white/15  bg-ink text-paper focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2"
          >
            {/* Main Image - natural aspect ratio, never cropped */}
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
              {...blurProps(img.src)}
            />
            
            {/* Gradient Scrim for text visibility */}
            <span
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent transition-all duration-300 group-hover:from-brand-navy/95 group-hover:via-brand-navy/40 pointer-events-none"
              aria-hidden="true"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 text-left transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="font-body text-sm md:text-base font-medium text-white drop-">
                {img.caption}
              </span>
            </div>
            
            {/* Hover Zoom Icon */}
            <div
              className="absolute top-5 right-5 w-10 h-10 z-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 pointer-events-none"
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-navy/95 backdrop-blur-sm p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer, image ${active + 1} of ${IMAGES.length}`}
        >
          <button
            ref={closeBtnRef}
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-paper/10 border border-white/20 text-white hover:bg-brand-gold hover:text-ink flex items-center justify-center transition-colors duration-200 z-10"
            aria-label="Close photo viewer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={prev}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-paper/10 border border-white/20 text-white hover:bg-brand-gold hover:text-ink flex items-center justify-center transition-colors duration-200"
            aria-label="Previous photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={next}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-paper/10 border border-white/20 text-white hover:bg-brand-gold hover:text-ink flex items-center justify-center transition-colors duration-200"
            aria-label="Next photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <figure className="flex flex-col items-center w-full max-w-5xl">
            <div className="relative w-full h-[68vh] md:h-[78vh]">
              <Image
                src={IMAGES[active].src}
                alt={IMAGES[active].alt}
                fill
                sizes="90vw"
                className="object-contain"
                {...blurProps(IMAGES[active].src)}
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="font-body text-xs tracking-widest text-white/70">
                {active + 1} / {IMAGES.length}
              </span>
              <p className="font-display italic text-lg md:text-xl text-white/90 mt-1">
                {IMAGES[active].caption}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </motion.div>
  );
}
