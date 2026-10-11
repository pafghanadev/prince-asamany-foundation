'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export function StoryGrid() {
  const [showAllMobile, setShowAllMobile] = useState(false);
  return (
    <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">
            Impact Stories
          </p>
          <h2 id="stories-heading" className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">
            Stories that show our impact
          </h2>
        </div>

        {/* Three-card grid on desktop, progressive disclosure on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.slice(0, 3).map((story, i) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className={`group relative flex flex-col overflow-hidden rounded-editorial border-t border-rule bg-paper focus-within:outline-2 focus-within:outline-ink focus-within:outline-offset-4 ${
                i > 0 ? (showAllMobile ? 'flex' : 'hidden sm:flex') : 'flex'
              }`}
            >
              <div className="relative h-64 overflow-hidden shrink-0 rounded-editorial">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  {...blurProps(story.image)}
                />
                <div className="absolute top-4 left-4 bg-ink px-3 py-1 font-body text-xs font-semibold text-paper">
                  {story.tag}
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6 text-left">
                <h3 className="font-display text-2xl leading-snug text-ink">
                  {story.name}
                </h3>
                <div className="mt-1 font-body text-xs text-ink/70">
                  {story.role}
                </div>
                {story.date && (
                  <div className="mt-1 font-body text-xs font-semibold text-brand-red-dark">{story.date}</div>
                )}

                {story.location && (
                  <div className="font-body text-xs text-brand-navy/50 mt-1 flex items-center justify-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {story.location}
                  </div>
                )}
                <blockquote className="mt-4 font-display text-base italic leading-relaxed text-ink/80">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <Link
                  href={`/stories/${story.id}`}
                  className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-red-dark after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  aria-label={`Read ${story.name}'s full story`}
                >
                  <span>Read full story</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Actions / CTA: Exactly one button on mobile */}
        <div className="mt-6 sm:mt-12 flex justify-center">
          {!showAllMobile ? (
            <>
              {/* Mobile-only single button when collapsed */}
              <button
                type="button"
                onClick={() => setShowAllMobile(true)}
                className="sm:hidden inline-flex w-full max-w-xs items-center justify-center gap-2 border border-ink px-6 py-3 font-body text-sm font-semibold text-ink"
              >
                <span>View more stories</span>
                <ChevronDown className="h-4 w-4 text-brand-red-dark" />
              </button>

              {/* Desktop button */}
              <Link
                href="/stories"
                className="hidden sm:inline-flex items-center justify-center rounded-editorial border border-ink px-6 py-3 font-body text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
              >
                View all stories
              </Link>
            </>
          ) : (
            /* Follow-up button shown after expanding on mobile (and on desktop) */
            <Link
              href="/stories"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-editorial border border-ink px-6 py-3 font-body text-sm font-semibold text-ink hover:bg-ink hover:text-paper sm:w-auto"
            >
              View all stories
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}



