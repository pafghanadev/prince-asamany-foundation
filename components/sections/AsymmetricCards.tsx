import React from 'react';
import Link from 'next/link';
import { PhotoCaption } from '@/components/ui/editorial';

export function AsymmetricCards() {
  return (
    <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="impact-cards-heading">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)] md:gap-8 md:px-12 lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:pt-10 lg:text-left">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Our Impact</p>
          <h2 id="impact-cards-heading" className="mt-3 font-display text-4xl leading-[1.08] md:text-6xl">
            Practical care. Personal connections.
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink/75">
            Free health screenings. Support for students. Relief packages shared with families. Our work starts with people and the needs they bring to us.
          </p>
          <Link
            href="/stories"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-editorial bg-brand-gold px-6 font-semibold text-brand-navy"
          >
            Read our outreach stories ↗
          </Link>
        </div>

        <div className="text-center lg:text-left">
          <PhotoCaption
            src="/media/opt/IMG_6848.webp"
            alt="Close-up of a community member's hands during a foundation event"
            caption="Community hands, foundation event"
            aspect="aspect-[4/5]"
          />
        </div>

        <div className="flex flex-col items-center text-center lg:mt-12 lg:items-start lg:text-left">
          <PhotoCaption
            src="/media/opt/IMG_6917.webp"
            alt="Prince Asamany handing a care package to a boy during a street outreach in Ejisu"
            caption="Street outreach, Ejisu"
            aspect="aspect-[4/5]"
          />
          <Link href="/programs" className="mt-4 inline-block border-b border-ink pb-1 text-sm font-semibold">
            See our programs →
          </Link>
        </div>
      </div>
    </section>
  );
}

