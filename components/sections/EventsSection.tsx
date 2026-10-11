'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Users, HeartHandshake, Stethoscope, Wheat, Backpack } from 'lucide-react';
import { EventItem } from '@/lib/events';
import { EventCard } from '@/components/ui/EventCard';

interface EventsSectionProps {
  events: EventItem[];
}

export function EventsSection({ events }: EventsSectionProps) {
  const upcomingEvents = events.slice(0, 3);
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];
  const secondaryEvents = upcomingEvents.filter((e) => e.id !== featuredEvent?.id);

  return (
    <section className="relative overflow-hidden bg-paper-deep text-ink py-20 md:py-28" aria-labelledby="events-heading">
      {/* Background ambient accents */}
      <div className="" />
      <div className="" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center md:mb-16 md:mx-0 lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 mb-4">
            <Users className="w-3.5 h-3.5 text-brand-red" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.15em]">
              Upcoming Gatherings & Outreaches
            </span>
          </div>
          <h2
            id="events-heading"
            className="font-display text-4xl md:text-6xl leading-[1.05]"
          >
            Join us on the ground
          </h2>
          <p className="mt-4 font-body text-lg text-ink/75 leading-relaxed max-w-2xl">
            From free community health screenings and deworming initiatives to rural farmer workshops - explore our schedules and community actions.
          </p>
        </div>

        {/* Content */}
        {upcomingEvents.length > 0 ? (
          <div className="space-y-8">
            {/* Featured Event Card */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <EventCard event={featuredEvent} featured={true} />
              </motion.div>
            )}

            {/* Secondary Events Grid */}
            {secondaryEvents.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {secondaryEvents.map((evt, idx) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <EventCard event={evt} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Centered CTA */}
            <div className="mt-12 flex justify-center lg:justify-start">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-editorial border border-ink px-6 py-3.5 font-body text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
              >
                <span>View All Events & Archives</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ) : (
          /* Rich, Balanced Outreach Spotlight */
          <div className="relative mx-auto border-t-4 border-ink bg-paper p-8 text-center sm:p-12 md:mx-0 md:p-14 lg:text-left max-w-3xl">
            {/* Tricolor top border accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-gold to-brand-green" />

            {/* Active status badge */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Field Preparation & Planning</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-brand-gold/15 text-brand-navy flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Calendar className="w-8 h-8 text-brand-navy" />
            </div>

            <h3 className="font-display text-3xl md:text-4xl mb-3">
              New Outreaches Currently in Planning
            </h3>
            <p className="font-body text-ink/75 mb-8 max-w-lg text-base md:text-lg leading-relaxed">
              Our medical teams and welfare coordinators are actively organizing our next round of healthcare screenings and rural community assistance in the Ejisu Municipality.
            </p>

            {/* Active focus chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-xl mx-auto text-center lg:text-left">
              <div className="p-3.5 border-t border-rule flex flex-col items-center md:flex-row gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4 text-brand-red" />
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-brand-navy">Health Screenings</p>
                  <p className="text-[11px] text-ink/60">Ejisu & rural clinics</p>
                </div>
              </div>
              <div className="p-3.5 border-t border-rule flex flex-col items-center md:flex-row gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Wheat className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-brand-navy">Farmer Support</p>
                  <p className="text-[11px] text-ink/60">Equipment & training</p>
                </div>
              </div>
              <div className="p-3.5 border-t border-rule flex flex-col items-center md:flex-row gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Backpack className="w-4 h-4 text-brand-navy" />
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-brand-navy">Youth Welfare</p>
                  <p className="text-[11px] text-ink/60">Relief distribution</p>
                </div>
              </div>
            </div>

            {/* Balanced CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-editorial bg-ink px-6 py-3 font-body text-sm font-semibold text-paper hover:bg-ink-deep"
              >
                <HeartHandshake className="w-4 h-4 text-brand-gold" />
                <span>Partner or Volunteer</span>
              </Link>
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-editorial border border-ink px-6 py-3 font-body text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
              >
                <span>Explore All Past Outreaches</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
