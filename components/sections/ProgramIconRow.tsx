import React from 'react';
import Link from 'next/link';

import { programs } from '@/lib/content';

export function ProgramIconRow() {
  return (
    <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="programs-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">What We Do</p>
            <h2 id="programs-heading" className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">
              Our Key Program Areas
            </h2>
          </div>
          <Link
            href="/programs"
            className="self-start border-b-2 border-brand-gold pb-1 font-body text-sm font-semibold text-ink hover:text-brand-red-dark md:self-auto"
          >
            All programs →
          </Link>
        </div>

        <ol className="list-none border-t border-rule m-0 p-0">
          {programs.map((program, i) => (
            <li key={program.title} className="border-b border-rule">
              <Link
                href={program.href}
                aria-label={`${program.title}: view all programs`}
                className="group grid grid-cols-[3rem_1fr] gap-4 py-8 md:grid-cols-[5rem_1fr_auto] md:items-center md:gap-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                <span className="font-display text-2xl text-brand-red-dark md:text-3xl" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-display text-2xl leading-tight text-ink group-hover:text-brand-red-dark md:text-3xl">
                    {program.title}
                  </span>
                  <span className="mt-2 block max-w-2xl font-body text-base leading-relaxed text-ink/75">
                    {program.description}
                  </span>
                </span>
                <span className="hidden font-body text-sm font-semibold text-ink md:inline">Learn more →</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

