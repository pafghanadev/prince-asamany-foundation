'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site';

interface CTABannerProps {
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
}

export function CTABanner({
  primaryAction = { href: '/donate', label: 'Donate Now' },
  secondaryAction = { href: '/get-involved', label: 'Become a Volunteer' },
}: CTABannerProps = {}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper md:py-28" aria-labelledby="cta-heading">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12 md:px-12">
        <div className="relative hidden md:col-span-5 md:block">
          <Image
            src="/media/opt/IMG_6890.webp"
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="rounded-editorial object-cover object-center"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col items-start gap-8 md:col-span-7 md:justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Join Our Action
          </span>
          <h2
            id="cta-heading"
            className="font-display text-5xl leading-[1.05] md:text-6xl"
          >
            Everyone can help.
          </h2>
          <p className="max-w-xl font-body text-lg leading-relaxed text-paper/75">
            The Prince Asamany Foundation stands as a bridge between need and compassion. Whether
            you give, volunteer, or simply share, your contribution restores hope.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex w-full flex-col gap-4 sm:flex-row"
        >
          <Link
            href={primaryAction.href}
            id="cta-donate-btn"
            className="inline-flex w-full items-center justify-center rounded-editorial bg-brand-gold px-8 py-4 font-body text-base font-semibold text-brand-navy hover:bg-brand-gold-light sm:w-auto"
          >
            {primaryAction.label}
          </Link>
          <Link
            href={secondaryAction.href}
            id="cta-volunteer-btn"
            className="inline-flex w-full items-center justify-center rounded-editorial border border-paper px-8 py-4 font-body text-base font-semibold text-paper hover:bg-paper hover:text-ink sm:w-auto"
          >
            {secondaryAction.label}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-sm text-paper/70"
        >
          Contact us: <a href={`tel:${siteConfig.phone.tel}`} className="inline-block py-1.5 text-brand-gold underline underline-offset-4 hover:text-brand-gold-light">{siteConfig.phone.display}</a>
        </motion.div>
      </div>
      </div>
    </section>
  );
}



