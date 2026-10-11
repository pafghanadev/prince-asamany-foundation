'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus, X, ZoomIn } from 'lucide-react';
import { EventItem, getGoogleCalendarUrl } from '@/lib/events';

interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Parse date into readable pieces
  const dateObj = new Date(event.date);
  const isValidDate = !isNaN(dateObj.getTime());
  
  const monthName = isValidDate
    ? dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    : 'EVENT';
  const dayNumber = isValidDate
    ? dateObj.toLocaleDateString('en-US', { day: 'numeric' })
    : '';
  const fullDateDisplay = isValidDate
    ? dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : event.date;

  // Category badge colors
  const getCategoryColor = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('health')) return 'bg-brand-red text-white';
    if (lower.includes('welfare') || lower.includes('relief') || lower.includes('joy')) return 'bg-amber-600 text-white';
    if (lower.includes('empower') || lower.includes('farm') || lower.includes('train')) return 'bg-brand-green text-white';
    return 'bg-ink text-paper';
  };

  const calendarUrl = getGoogleCalendarUrl(event);

  return (
    <>
      <article
        className={`group relative flex flex-col overflow-hidden rounded-editorial bg-paper border border-rule  transition-all duration-300 ${
          featured ? 'md:grid md:grid-cols-12 md:gap-6' : ''
        }`}
      >
        {/* Subtle accent border on hover */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold via-brand-red to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Media / Flyer Area */}
        <div
          className={`relative overflow-hidden bg-slate-100 ${
            featured
              ? 'md:col-span-5 h-64 md:h-full min-h-[260px]'
              : 'h-52 w-full shrink-0'
          }`}
        >
          {event.imageUrl ? (
            <>
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes={featured ? '(max-width: 768px) 100vw, 40vw' : '(max-width: 768px) 100vw, 33vw'}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-60" />
              
              {/* Click to expand flyer button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-navy/80 hover:bg-ink text-paper text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={`Enlarge flyer for ${event.title}`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>View Flyer</span>
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy/90 to-brand-navy p-6 text-center text-white">
              <Calendar className="w-12 h-12 text-brand-gold mb-2 opacity-80" />
              <span className="text-xs uppercase tracking-wider text-brand-gold font-semibold">Community Outreach</span>
            </div>
          )}

          {/* Date stamp badge */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center justify-center rounded-editorial bg-paper/95 backdrop-blur-md border border-rule px-3 py-1.5  min-w-[54px] text-center">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-brand-red-dark leading-none">
              {monthName}
            </span>
            <span className="font-display text-2xl font-black text-ink leading-tight">
              {dayNumber}
            </span>
          </div>

          {/* Past status tag if applicable */}
          {event.isPast && (
            <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-xs font-medium backdrop-blur-sm">
              Completed
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className={`flex flex-col flex-grow p-6 md:p-7 ${featured ? 'md:col-span-7' : ''}`}>
          {/* Category & Status */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
            {featured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-gold/20 text-ink border border-brand-gold/30">
                Featured Event
              </span>
            )}
          </div>

          {/* Event Title */}
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink leading-snug mb-3 group-hover:text-brand-red transition-colors duration-200">
            {event.title}
          </h3>

          {/* Date, Time & Venue metadata */}
          <div className="space-y-1.5 mb-4 text-sm text-ink/75 font-body">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Calendar className="w-4 h-4 text-ink/75 shrink-0" />
              <span>{fullDateDisplay}</span>
            </div>
            {event.time && (
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Clock className="w-4 h-4 text-ink/75 shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-start justify-center lg:justify-start gap-2">
              <MapPin className="w-4 h-4 text-ink/75 shrink-0 mt-0.5" />
              <span className="leading-tight">{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-ink/75 text-sm md:text-base leading-relaxed mb-6 font-body flex-grow line-clamp-3">
            {event.description}
          </p>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center md:justify-between gap-3 mt-auto">
            {event.registrationUrl ? (() => {
              const raw = event.registrationUrl.trim();
              const isHttp = raw.startsWith('http');
              const isPhone = /^[+0-9\s()-]{7,}$/.test(raw);
              const isMail = raw.includes('@') && !raw.includes('/');
              const href = isHttp || raw.startsWith('/') ? raw : isMail ? `mailto:${raw}` : isPhone ? `tel:${raw.replace(/\s+/g, '')}` : raw;
              const isExternal = isHttp || isMail || isPhone;
              const buttonText = isPhone ? `Call: ${raw}` : isMail ? 'Email Inquiry' : event.isPast ? 'Event Details' : 'Register / RSVP';

              return (
                <Link
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-editorial bg-ink text-paper hover:bg-brand-navy/90 text-paper text-sm font-semibold  transition-all duration-200"
                >
                  <span>{buttonText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              );
            })() : (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-editorial bg-ink text-paper hover:bg-brand-navy/90 text-paper text-sm font-semibold  transition-all duration-200"
              >
                <span>{event.isPast ? 'Learn More' : 'Inquire / Join'}</span>
              </Link>
            )}

            {!event.isPast && (
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-editorial border border-rule hover:border-ink text-ink hover:text-ink text-xs font-semibold bg-slate-50 hover:bg-slate-100 transition-colors"
                title="Add to Google Calendar"
              >
                <CalendarPlus className="w-4 h-4 text-brand-red" />
                <span>Add to Calendar</span>
              </a>
            )}
          </div>
        </div>
      </article>

      {/* Lightbox Modal for Flyer Enlargement */}
      {lightboxOpen && event.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-paper/10 hover:bg-paper/20 transition-colors"
              aria-label="Close flyer preview"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-[75vh] rounded-editorial overflow-hidden bg-slate-900">
              <Image
                src={event.imageUrl}
                alt={`Flyer for ${event.title}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
            <div className="mt-3 text-center text-white">
              <p className="font-display font-bold text-lg">{event.title}</p>
              <p className="text-sm text-white/70">{event.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
