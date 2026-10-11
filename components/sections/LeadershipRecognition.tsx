'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AwardGallery } from '@/components/sections/AwardGallery';
import { blurProps } from '@/lib/media';

/* Premium ease - smooth deceleration, no bounce */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PlayChipIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" opacity="0.55" />
    <path d="M10 8.5v7l6-3.5Z" />
  </svg>
);

const VIDEO_POSTER = '/media/opt/award-night-poster.webp';
/* AFLAG honoree card frame extracted at 0:95 - strong representative poster, not frame 0 */

export function LeadershipRecognition() {
  const [playing, setPlaying] = useState(false);

  const startVideo = () => {
    /* User gesture - autoplay with sound is permitted here */
    setPlaying(true);
  };

  return (
    <section id="leadership" className="bg-ink text-paper py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Text left · video right (alternates with the founder profile above;
            flows into the full-width gallery below) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* Text column */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <div className="w-full text-center lg:text-left">
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
                Leadership &amp; Recognition
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 leading-tight">
                2025 Social Change Advocate Award
              </h2>
            </div>

            <blockquote className="border-l-4 border-brand-gold pl-6 mt-2">
              <p className="font-display text-xl md:text-2xl italic leading-snug text-white">
                &ldquo;A humble, visionary, and compassionate community leader whose work stands as a model for service-oriented citizenship.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-brand-gold font-semibold uppercase tracking-wider">Rita Ama Nupe Demuyakor, AFLAG Founder</footer>
            </blockquote>

            <div className="space-y-4 font-body text-lg text-white/80 leading-relaxed">
              <p>
                In a night filled with celebration and inspiration, our Founder and President, Prince Douglas Asamany, was honored with the 2025 Social Change Advocate Award at the Philanthropic Awards &amp; Charity Night, organized by the Advocate for Fair Legal Access Ghana (AFLAG).
              </p>
              <p>
                The award recognized Prince Asamany&rsquo;s outstanding dedication to human welfare and sustainable development under the foundation&rsquo;s guiding motto: <strong>&ldquo;Hope, Development, and Opportunity to All.&rdquo;</strong> AFLAG highlighted the transformative impact of our free medical screening initiatives, educational support schemes, job skills training, and livelihood empowerment projects.
              </p>
            </div>
          </motion.div>

          {/* Media column */}
          <motion.div
            initial={{ opacity: 0, x: 96, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-7 relative"
          >
            {/* Soft brand-gold glow behind the panel */}
            <div className="absolute -inset-8 bg-brand-gold/[0.07] blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

            {!playing ? (

              /* ---------- Poster panel → click/tap plays with sound ---------- */
              <button
                type="button"
                data-video-card
                onClick={startVideo}
                aria-label="Watch the award night highlights video"
                className="group relative block w-full overflow-hidden rounded-editorial  border border-white/10 bg-ink text-paper focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2 transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99]"
              >
                <div className="relative aspect-video">
                  <Image
                    src={VIDEO_POSTER}
                    alt="Prince Douglas Asamany honored as AFLAG Social Change Advocate, award night highlights"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                    priority={false}
                    {...blurProps(VIDEO_POSTER)}
                  />

                  {/* Brand scrims */}
                  <span className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-brand-navy/80 via-brand-navy/30 to-transparent pointer-events-none" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-navy/90 via-brand-navy/35 to-transparent pointer-events-none" aria-hidden="true" />

                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                    </span>
                    <span className="font-body text-[10px] sm:text-xs font-semibold text-white tracking-widest uppercase">
                      Event Highlights, 1:45
                    </span>
                  </span>

                  {/* Play chip */}
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-gold/95 text-ink flex items-center justify-center  backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-paper">
                      <PlayChipIcon />
                    </span>
                  </span>

                  {/* Label */}
                  <span className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-left pointer-events-none">
                    <span className="block font-body text-sm md:text-base font-medium text-white/90 drop-">
                      Award Night Highlights, Marriott Hotel, Nov 15, 2025
                    </span>
                  </span>
                </div>
              </button>

            ) : (

              /* ---------- Inline player (user-initiated: controls + sound) ---------- */
              <div>
                <div className="relative overflow-hidden rounded-editorial  bg-black border border-white/10">
                  <video
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    poster={VIDEO_POSTER}
                    className="w-full aspect-video object-cover relative z-10"
                    aria-label="Award night highlights video: Prince Douglas Asamany receiving the 2025 Social Change Advocate Award"
                  >
                    {/* mp4 first: the current webm encode is ~2x larger, so serve the
                        smaller file to every browser that supports it */}
                    <source src="/media/award-night-highlights.mp4" type="video/mp4" />
                    <source src="/media/award-night-highlights.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Supporting copy - balances column height with the text side */}
            <div className="mt-6 lg:mt-8 flex flex-col gap-5">
              <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
                Beyond direct humanitarian outreach, AFLAG also emphasized his rising influence as a promoter of{' '}
                <strong className="text-white">Green Chemistry Education</strong>, acknowledging his advocacy for
                environmentally friendly scientific practices as timely contributions to Africa&rsquo;s developmental future.
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10">
                {[
                  { k: 'Honoree', v: 'Prince Douglas Asamany' },
                  { k: 'Presented by', v: 'AFLAG, Advocate for Fair Legal Access Ghana' },
                  { k: 'Venue & Date', v: 'Marriott Hotel, Nov 15, 2025' },
                ].map((item) => (
                  <div key={item.k} className="flex flex-col gap-1">
                    <dt className="font-body text-[11px] font-semibold uppercase tracking-widest text-brand-gold">
                      {item.k}
                    </dt>
                    <dd className="font-body text-sm text-white/80 leading-snug">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

        </div>

        {/* Extended Image Gallery */}
        <AwardGallery />

      </div>
    </section>
  );
}
