'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blurProps } from '@/lib/media';

export function PhotoCollage() {
  return (
    <section
      className="bg-white section-padding overflow-hidden"
      aria-labelledby="collage-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            {/* Collage: stacked on mobile, overlapping on desktop */}
            <div className="relative z-10">
              {/* Primary photo, full width */}
              <div className="relative rounded-card-lg overflow-hidden aspect-[4/3] shadow-xl">
                <Image
                  src="/media/opt/IMG_6917.webp"
                  alt="Prince Asamany handing a care package to a boy during a street outreach in Ejisu"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  {...blurProps('/media/opt/IMG_6917.webp')}
                />
              </div>

              {/* Secondary photo - stacked below on mobile/tablet, overlapped bottom-right at lg+ */}
              <div
                className="relative mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-right-8 lg:w-56 lg:h-44 rounded-card-lg overflow-hidden border-4 border-white shadow-lg z-20"
              >
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
                  <Image
                    src="/media/opt/IMG_4479.webp"
                    alt="A black and white portrait of children from the community"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 224px"
                    {...blurProps('/media/opt/IMG_4479.webp')}
                  />
                </div>
              </div>

              {/* Third photo - overlapped top-left at lg+ */}
              <div
                className="hidden lg:block lg:absolute lg:-top-10 lg:-left-8 lg:w-48 lg:h-48 rounded-card-lg overflow-hidden border-4 border-white shadow-lg z-20"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/media/opt/IMG_6877.webp"
                    alt="Prince Asamany engaging with a community member"
                    fill
                    className="object-cover object-top"
                    sizes="192px"
                    {...blurProps('/media/opt/IMG_6877.webp')}
                  />
                </div>
              </div>
            </div>
            {/* Spacer so the overlapping photo doesn't clip into the text below */}
            <div className="hidden lg:block h-12" aria-hidden="true" />
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6"
          >
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
                Our Work
              </span>
              <h2
                id="collage-heading"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mt-2 leading-[1.12]"
              >
                What your support has made possible
              </h2>
            </div>

            <p className="font-body text-lg text-brand-navy/70 leading-relaxed text-center lg:text-left">
              The Prince Asamany Foundation stands as a bridge between need and compassion. If you
              are seeking support, do not hesitate to call on us. If you have a heart to uplift the
              less privileged, join hands with us, together we can restore hope and change lives.
            </p>

            <ul className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 list-none m-0 p-0" role="list">
{[
  'Free health screenings and preventive care in partnership with local hospitals',
  'Annual "Joy to the Street" relief for vulnerable families and street children',
  'Skills training and economic empowerment for sustainable local livelihoods',
  'Environmental projects and reforestation in the Ashanti Region',
].map((item) => (
                <li key={item} className="flex flex-col items-center md:flex-row lg:items-start gap-3">
                  <span
                    className="mt-1 w-5 h-5 rounded-full bg-brand-gold shrink-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" className="stroke-brand-navy" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="font-body text-lg text-brand-navy/75 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-4">
              <Link
                href="/about"
                className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-navy pt-[6px] pb-1 hover:text-brand-red-dark transition-colors duration-200"
              >
                About us →
              </Link>
              <Link
                href="/donate"
                className="font-body text-sm font-semibold bg-brand-navy text-white px-5 py-2.5 rounded-btn border-2 border-brand-navy hover:bg-brand-navy-light hover:border-brand-navy-light transition-all duration-200"
              >
                Donate
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}