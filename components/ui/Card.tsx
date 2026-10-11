'use client';

import React, { useId } from 'react';
import Link from 'next/link';

// ── Stat Card ─────────────────────────────────────────────────
interface StatCardProps {
  stat: string;
  label: string;
  sublabel?: string;
  variant?: 'navy' | 'red' | 'green' | 'gold' | 'cream';
  className?: string;
}

const statBgMap = {
  navy: 'bg-brand-navy text-white',
  red: 'bg-brand-red text-white',
  green: 'bg-brand-green text-white',
  gold: 'bg-brand-gold text-brand-navy',
  cream: 'bg-brand-cream text-brand-navy border border-brand-navy/10',
};

export function StatCard({ stat, label, sublabel, variant = 'navy', className = '' }: StatCardProps) {
  const isLight = variant === 'gold' || variant === 'cream';
  const accentColor = isLight ? 'text-brand-navy' : 'text-brand-gold';
  const textColor = isLight ? 'text-brand-navy' : 'text-white';
  const subtextColor = isLight ? 'text-brand-navy/70' : 'text-white/65';
  const patternId = useId().replace(/:/g, '');
  
  return (
    <div
      className={`relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${statBgMap[variant]} rounded-card-lg p-8 flex flex-col justify-between ${className} border ${isLight ? 'border-brand-navy/10' : 'border-white/10'}`}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={patternId} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" className={isLight ? 'fill-brand-navy' : 'fill-white'} />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>

      {/* Massive Faded Watermark */}
      <div className={`absolute -right-4 -bottom-6 font-display text-[160px] font-black leading-none select-none opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none ${isLight ? 'text-brand-navy' : 'text-white'}`} aria-hidden="true">
        {stat}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left h-full">
        <div className={`font-display text-5xl lg:text-6xl font-black leading-none ${accentColor}`}>
          {stat}
        </div>
        
        {/* Decorative Accent Line */}
        <div className={`w-12 h-1 mx-auto md:mx-0 mt-6 mb-4 rounded-full opacity-60 ${isLight ? 'bg-brand-navy/20' : 'bg-brand-gold/60'}`} aria-hidden="true" />
        
        <div className={`font-display text-2xl font-bold leading-tight mt-auto ${textColor}`}>
          {label}
        </div>
        
        {sublabel && (
          <div className={`font-body text-base mt-3 ${subtextColor} leading-relaxed`}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

// ── CTA Card ──────────────────────────────────────────────────
interface CTACardProps {
  title: string;
  description?: string;
  linkLabel: string;
  linkHref: string;
  className?: string;
}

export function CTACard({ title, description, linkLabel, linkHref, className = '' }: CTACardProps) {
  return (
    <div
      className={`bg-brand-cream border border-brand-navy/10 shadow-lg hover:shadow-xl rounded-card-lg p-8 flex flex-col items-center text-center lg:items-start lg:text-left justify-between transition-all duration-300 ${className}`}
    >
      <div>
        <h3 className="font-display text-2xl font-bold text-brand-navy leading-tight">{title}</h3>
        {description && (
          <p className="font-body text-brand-navy/70 mt-3 text-sm leading-relaxed">{description}</p>
        )}
      </div>
      <Link
        href={linkHref}
        className="mt-6 inline-flex items-center justify-center lg:justify-start gap-2 font-body text-brand-red-dark font-semibold text-sm hover:gap-3 transition-all duration-200 py-1"
      >
        {linkLabel}
        <span className="text-brand-gold" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

