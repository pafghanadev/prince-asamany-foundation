import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { getEvents } from '@/lib/events';
import { EventsClient } from './EventsClient';

export const revalidate = 60; // Revalidate page every 60 seconds

export const metadata: Metadata = {
  title: 'Events & Outreaches',
  description:
    'Stay informed about upcoming community outreaches, free health screenings, relief distributions, and empowerment initiatives by Prince Asamany Foundation.',
};

export default async function EventsPage() {
  const eventsData = await getEvents();

  return (
    <>
      {/* Hero Page Header */}
      <PageHeader
        overline="Community Calendar"
        title="Events & Outreaches"
        description="Discover where we are serving next. Join us on the ground, volunteer your skills, or connect with our health and welfare teams in your district."
        bgImage="/media/opt/IMG-20260727-WA0008.webp"
        tone="navy"
      />

      {/* Main Interactive Events Section */}
      <section className="bg-surface min-h-[60vh]" aria-labelledby="events-list-heading">
        <h2 id="events-list-heading" className="sr-only">
          Foundation Events Listing
        </h2>
        <EventsClient events={eventsData} />
      </section>

      {/* Bottom Partner / Sponsor CTA */}
      <section className="bg-brand-green py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Partner With Us on an Upcoming Outreach
          </h2>
          <p className="font-body text-lg text-white/90 leading-relaxed max-w-xl">
            Are you a healthcare professional, organization, or donor interested in bringing relief and medical care to your community? Let&apos;s collaborate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-gold text-ink px-8 py-4 rounded-editorial hover:bg-brand-gold-light transition-all duration-200 w-full sm:w-auto "
            >
              Contact Our Outreach Team
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center font-body font-semibold text-base bg-transparent text-white px-8 py-4 rounded-editorial border-2 border-white/60 hover:bg-paper/10 transition-all duration-200 w-full sm:w-auto"
            >
              Support an Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
