'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, Filter, HeartHandshake, FileSpreadsheet } from 'lucide-react';
import { EventItem } from '@/lib/events';
import { EventCard } from '@/components/ui/EventCard';

interface EventsClientProps {
  events: {
    upcoming: EventItem[];
    past: EventItem[];
    all: EventItem[];
    source: 'google_sheets' | 'fallback';
  };
}

export function EventsClient({ events }: EventsClientProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique categories present in events
  const categories = useMemo(() => {
    const set = new Set<string>();
    events.all.forEach((e) => {
      if (e.category) set.add(e.category.trim());
    });
    return ['All', ...Array.from(set)];
  }, [events.all]);

  // Determine base list according to tab
  const tabFiltered = useMemo(() => {
    if (activeTab === 'upcoming') return events.upcoming;
    if (activeTab === 'past') return events.past;
    return events.all;
  }, [activeTab, events]);

  // Apply category and search query filters
  const visibleEvents = useMemo(() => {
    return tabFiltered.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [tabFiltered, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
      {/* Controls Bar: Tabs, Categories, and Search */}
      <div className="flex flex-col gap-6 mb-10">
        {/* Main Tab Toggle: Upcoming vs Past */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-editorial w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-editorial font-display text-sm font-bold transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-ink text-paper '
                  : 'text-ink/75 hover:text-ink'
              }`}
            >
              <span>Upcoming</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === 'upcoming'
                    ? 'bg-brand-gold text-ink'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {events.upcoming.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-editorial font-display text-sm font-bold transition-all duration-200 ${
                activeTab === 'past'
                  ? 'bg-ink text-paper '
                  : 'text-ink/75 hover:text-ink'
              }`}
            >
              <span>Past Outreaches</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === 'past'
                    ? 'bg-brand-gold text-ink'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {events.past.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-editorial font-display text-sm font-bold transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-ink text-paper '
                  : 'text-ink/75 hover:text-ink'
              }`}
            >
              <span>All</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === 'all'
                    ? 'bg-brand-gold text-ink'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {events.all.length}
              </span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-editorial border border-slate-200 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 text-sm outline-none bg-paper transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-ink/75"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-editorial text-xs font-semibold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-brand-gold text-ink '
                    : 'bg-paper border border-slate-200 text-ink/75 hover:border-brand-navy/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Events */}
      <AnimatePresence mode="popLayout">
        {visibleEvents.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleEvents.map((evt) => (
              <motion.div
                layout
                key={evt.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <EventCard event={evt} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty Search / Empty Tab State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-editorial border border-slate-200 bg-paper p-12 text-center max-w-xl mx-auto "
          >
            <div className="w-14 h-14 rounded-editorial bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-2">
              {searchQuery
                ? 'No matching events found'
                : activeTab === 'upcoming'
                ? 'No upcoming events scheduled right now'
                : 'No past events in this category'}
            </h3>
            <p className="text-sm text-ink/75 mb-6 leading-relaxed">
              {searchQuery
                ? `We couldn't find any events matching "${searchQuery}". Try a different keyword or clear your filter.`
                : 'Stay tuned! We are currently finalizing schedules for our upcoming healthcare and welfare outreaches.'}
            </p>
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-editorial bg-ink text-paper text-xs font-semibold hover:bg-brand-navy/90 transition-colors"
              >
                Reset Search Filters
              </button>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-editorial bg-ink text-paper text-xs font-semibold hover:bg-brand-navy/90 transition-colors"
              >
                <HeartHandshake className="w-4 h-4 text-brand-gold" />
                <span>Contact Foundation Office</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synchronized Notice Footer */}
      <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/60 font-body">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-brand-green" />
          <span>Events updated live directly from the Prince Asamany Foundation field calendar.</span>
        </div>
        <div>
          <span>Questions regarding community schedules? </span>
          <Link href="/contact" className="text-ink font-semibold underline hover:text-brand-red">
            Reach out to our team
          </Link>
        </div>
      </div>
    </div>
  );
}
