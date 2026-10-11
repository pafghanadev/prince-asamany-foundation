import React from 'react';
import Link from 'next/link';
import { PhotoCaption } from '@/components/ui/editorial';

export function AsymmetricCards() {
  return (
    <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="impact-cards-heading">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-12">
        <div className="md:col-span-5 md:pt-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Our Impact</p>
          <h2 id="impact-cards-heading" className="mt-3 font-display text-4xl leading-[1.08] md:text-6xl">
            Building futures, one community at a time.
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink/75">
            Uplifting lives, strengthening our communities.
          </p>
          <Link
            href="/get-involved"
            className="mt-8 inline-flex min-h-12 items-center rounded-editorial bg-brand-gold px-6 font-semibold text-brand-navy"
          >
            Get Involved
          </Link>
        </div>

        <div className="md:col-span-3">
          <PhotoCaption
            src="/media/opt/IMG_6848.webp"
            alt="Close-up of a community member's hands during a foundation event"
            caption="Community hands, foundation event"
            aspect="aspect-[3/4]"
          />
        </div>

        <div className="md:col-span-4 md:mt-24">
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

