'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { blurProps } from '@/lib/media';

interface GalleryPhoto {
  src: string;
  alt: string;
}

interface StoryGalleryProps {
  photos: GalleryPhoto[];
  storyName: string;
}

export function StoryGallery({ photos, storyName }: StoryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;
  const total = photos.length;

  const openAt = (i: number) => setLightboxIndex(i);
  const close = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close, prev, next]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      {/* Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-6 sm:grid sm:grid-cols-3 md:grid-cols-4 md:gap-4 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {photos.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openAt(i)}
            aria-label={`View photo ${i + 1}: ${img.alt}`}
            className={`group relative rounded-editorial overflow-hidden shrink-0 snap-center w-[85vw] sm:w-auto focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2 ${
              i === 0 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes={
                i === 0
                  ? '(max-width: 640px) 100vw, (max-width: 768px) 66vw, 50vw'
                  : '(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
              }
              {...blurProps(img.src)}
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full bg-paper/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo gallery for ${storyName}`}
          onClick={close}
        >
          {/* Inner container stops click propagation */}
          <div
            className="relative w-full max-w-5xl flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar: counter + close */}
            <div className="w-full flex items-center justify-between px-2">
              <span className="font-body text-sm font-semibold text-white/60">
                {lightboxIndex! + 1} / {total}
              </span>
              <button
                type="button"
                onClick={close}
                className="w-10 h-10 rounded-full bg-paper/10 hover:bg-paper/20 border border-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-2 focus-visible:outline-brand-gold"
                aria-label="Close photo viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main image */}
            <div className="relative w-full" style={{ height: 'min(72vh, 700px)' }}>
              <Image
                key={lightboxIndex}
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1024px"
                priority
              />
            </div>

            {/* Caption */}
            <p className="font-body text-sm text-white/70 text-center max-w-2xl px-2 leading-relaxed">
              {current.alt}
            </p>

            {/* Prev / Next buttons */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-12 h-12 rounded-full bg-paper/10 hover:bg-paper/25 border border-white/20 flex items-center justify-center text-white transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand-gold"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-12 h-12 rounded-full bg-paper/10 hover:bg-paper/25 border border-white/20 flex items-center justify-center text-white transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand-gold"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dot strip */}
                <div className="flex items-center gap-1.5 mt-1" role="tablist" aria-label="Gallery navigation">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === lightboxIndex}
                      aria-label={`Go to photo ${i + 1}`}
                      onClick={() => setLightboxIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-gold ${
                        i === lightboxIndex ? 'w-6 bg-brand-gold' : 'w-1.5 bg-paper/40 hover:bg-paper/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
