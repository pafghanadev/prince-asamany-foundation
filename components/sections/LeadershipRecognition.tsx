'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { AwardGallery } from '@/components/sections/AwardGallery';
import { blurProps } from '@/lib/media';

/* Premium ease - smooth deceleration, no bounce */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];


const VIDEO_POSTER = '/media/opt/award-night-poster.webp';
/* AFLAG honoree card frame extracted at 0:95 - strong representative poster, not frame 0 */

export function LeadershipRecognition() {
  const reducedMotion = useReducedMotion();
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

            <blockquote className="border-t md:border-t-0 md:border-l-4 border-brand-gold pt-5 md:pt-0 md:pl-6 mt-2">
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

            <figure className="overflow-hidden border border-white/10">
              {reducedMotion !== false ? (
                <div className="relative aspect-video">
                  <Image src={VIDEO_POSTER} alt="Prince Asamany receiving the 2025 Social Change Advocate Award" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" {...blurProps(VIDEO_POSTER)} />
                </div>
              ) : (
                <video autoPlay muted playsInline preload="metadata" poster={VIDEO_POSTER} className="w-full aspect-video object-cover" aria-label="Silent award night highlights">
                  <source src="/media/award-night-highlights.mp4" type="video/mp4" />
                  <source src="/media/award-night-highlights.webm" type="video/webm" />
                </video>
              )}
              <figcaption className="bg-paper px-4 py-3 text-center font-body text-xs text-ink lg:text-left">Award night highlights · Marriott Hotel · 15 November 2025</figcaption>
            </figure>
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
