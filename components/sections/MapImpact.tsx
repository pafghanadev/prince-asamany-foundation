'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AshantiMap, MAP_HOTSPOTS } from '@/components/ui/illustrations';
import { CountUp } from '@/components/ui/CountUp';


// Icons
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
);
const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
);

type ThemeColor = 'red' | 'gold' | 'navy' | 'green';

interface Stat {
  value: string;
  label: string;
  description: string;
  theme: ThemeColor;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { value: '800+', label: 'Lives Touched in 2024', description: 'Street children and vulnerable persons reached during the Joy to the Street campaign', theme: 'red', icon: <HeartIcon /> },
  { value: 'Free', label: 'Health Screenings', description: 'Cervical cancer screening and health education with Mansa Memorial Hospital', theme: 'green', icon: <ShieldIcon /> },
  { value: '2025', label: 'Social Change Advocate', description: 'Founder honored by AFLAG for impact-driven community leadership', theme: 'gold', icon: <AwardIcon /> },
  { value: 'Ejisu', label: 'Our Base', description: 'Akyawkrom, Ejisu Municipal Assembly, Ashanti Region', theme: 'navy', icon: <MapPinIcon /> },
];

export function MapImpact() {
  const [activeId, setActiveId] = useState<string>('akyawkrom');
  const activeHotspot = MAP_HOTSPOTS.find((h) => h.id === activeId) ?? MAP_HOTSPOTS[0];

  return (
    <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="map-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-12 max-w-2xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">
            Where We Work
          </p>
          <h2
            id="map-heading"
            className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl"
          >
            Always where others need help.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Interactive Map & Community Impact Locations */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex flex-col"
          >
            <div className="border border-rule p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-red-dark">
                  Community Focus Areas
                </span>
                <span className="font-body text-xs text-brand-navy/65">
                  Choose a community to view impact
                </span>
              </div>

              <AshantiMap activeId={activeId} onSelect={setActiveId} />

              {/* Location Pill Selector for Ergonomics */}
              <div
                className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-4 border-t border-brand-navy/10"
                role="group"
                aria-label="Regional impact locations"
              >
                {MAP_HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    aria-pressed={activeId === h.id}
                    onClick={() => setActiveId(h.id)}
                    className={`font-body text-xs font-semibold px-3.5 py-1.5 rounded-editorial transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-ink ${
                      activeId === h.id
                        ? 'bg-ink text-paper'
                        : 'border border-rule text-ink/70 hover:text-ink'
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>

              {/* Active Location Information Callout */}
              <div aria-live="polite" className="mt-4 p-4 rounded-editorial bg-paper-deep border border-rule">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="font-display text-base font-bold text-brand-navy flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-red" aria-hidden="true" />
                    {activeHotspot.name}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[11px] font-body font-bold ${activeHotspot.tagColor}`}>
                    {activeHotspot.tag}
                  </span>
                </div>
                <p className="font-body text-xs text-brand-navy/70 font-medium mb-1 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-brand-red-dark shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{activeHotspot.area}</span>
                </p>
                <p className="font-body text-sm text-brand-navy/80 leading-relaxed">
                  {activeHotspot.impact}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats: 2x2 on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {stats.map((stat, i) => {
              const themeClasses = {
                red: 'bg-ink text-paper border-ink',
                gold: 'bg-brand-gold text-brand-navy border-brand-gold',
                navy: 'bg-brand-navy text-white border-brand-navy',
                green: 'bg-ink text-paper border-ink',
              }[stat.theme] || 'bg-paper text-ink border-rule';

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  className={`flex flex-col items-center text-center md:items-start md:text-left p-4 sm:p-6 min-h-[9rem] sm:min-h-[10rem] rounded-editorial border transition-colors duration-300 group focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 ${themeClasses}`}
                >
                  <div className="flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 mb-2 sm:mb-4 bg-white/10 [&>svg]:w-4.5 [&>svg]:h-4.5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                    {stat.icon}
                  </div>
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl font-black leading-none mb-1.5 sm:mb-2">
                    <CountUp value={stat.value} />
                  </div>
                  
                  <div className="w-8 sm:w-10 h-0.5 sm:h-1 my-2 sm:my-3 bg-white/30" aria-hidden="true" />
                  
                  <div className="font-body text-xs sm:text-lg font-bold sm:font-semibold mb-1 leading-tight">{stat.label}</div>
                  <div className={`font-body text-xs sm:text-sm leading-relaxed ${stat.theme === 'gold' ? 'text-brand-navy/90' : 'text-white/90'}`}>
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
