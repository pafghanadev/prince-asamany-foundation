'use client';

import React, { useState } from 'react';
import { pressItems } from '@/lib/content';

const INITIAL_COUNT = 3;

export function PressSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? pressItems : pressItems.slice(0, INITIAL_COUNT);
  const hiddenCount = pressItems.length - INITIAL_COUNT;

  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="press-heading">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
            In the News
          </span>
          <h2
            id="press-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ink mt-2 leading-tight"
          >
            Our work in the media
          </h2>
          <p className="font-body text-lg text-ink/75 leading-relaxed mt-4 text-left lg:text-center">
            Coverage of our programs and impact by Choice News Online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-6 rounded-editorial bg-paper text-ink border border-rule hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2 no-underline"
              aria-label={`${item.title}. Read the full article on ${item.outlet} (opens in a new tab)`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-body font-semibold bg-paper text-ink/75">
                  {item.tag}
                </span>
                <span className="font-body text-xs text-ink/75">{item.date}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-brand-red-dark transition-colors duration-200">
                {item.title}
              </h3>
              <div className="mt-auto pt-2 flex items-center gap-2 font-body text-sm text-ink/75">
                {item.outlet}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-brand-gold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {hiddenCount > 0 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-body font-semibold text-sm bg-ink text-paper border-2 border-brand-navy hover:bg-transparent hover:text-ink transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2"
            >
              {expanded ? 'Show fewer' : `View ${hiddenCount} more article${hiddenCount === 1 ? '' : 's'}`}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
