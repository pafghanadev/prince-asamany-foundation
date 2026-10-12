'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AshantiMap, MAP_HOTSPOTS } from '@/components/ui/illustrations';
import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export function MapImpact() {
  const [activeId, setActiveId] = useState('akyawkrom');
  const activeLocation = MAP_HOTSPOTS.find((location) => location.id === activeId) ?? MAP_HOTSPOTS[0];
  const activeStory = stories.find((story) => story.id === activeLocation.storyId);

  return (
    <section className="bg-paper py-16 text-ink md:py-24" aria-labelledby="map-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-10 max-w-3xl md:mb-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Where we work</p>
          <h2 id="map-heading" className="mt-3 font-display text-4xl leading-[1.05] md:text-6xl">
            One region. Many ways to show up.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink/75">
            Explore field reports connected to the communities we serve. Select a location to see photographs, programme details and what happened on the ground.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col border border-rule bg-paper-deep/50 p-5 sm:p-7">
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span className="font-body text-xs font-bold uppercase tracking-[0.15em] text-brand-red-dark">Community locations</span>
              <span className="font-body text-xs text-ink/60">Ashanti Region</span>
            </div>
            <AshantiMap activeId={activeId} onSelect={setActiveId} />
            <div className="mt-3 flex flex-wrap gap-2 border-t border-rule pt-5" role="group" aria-label="Choose an outreach location">
              {MAP_HOTSPOTS.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  aria-pressed={activeId === location.id}
                  onClick={() => setActiveId(location.id)}
                  className={`min-h-11 rounded-editorial border px-3.5 py-2 font-body text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    activeId === location.id
                      ? 'border-ink bg-ink text-paper'
                      : 'border-rule bg-paper text-ink hover:border-ink'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
            <p className="mt-4 font-body text-xs leading-relaxed text-ink/60">
              Map markers indicate approximate programme areas and are not GPS coordinates.
            </p>
          </div>

          {activeStory && (
            <article className="flex flex-col overflow-hidden border border-rule bg-paper" aria-live="polite" aria-atomic="true">
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-paper-deep sm:aspect-[3/2]">
                <Image
                  key={activeStory.image}
                  src={activeStory.image}
                  alt={activeStory.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  {...blurProps(activeStory.image)}
                />
                <span className="absolute bottom-4 left-4 bg-ink px-3 py-1.5 font-body text-xs font-semibold text-paper">
                  {activeStory.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-6 py-7 sm:px-9 sm:py-9">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-brand-red-dark">
                  {activeLocation.name} / {activeStory.date ?? 'Community outreach'}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{activeStory.name}</h3>
                <p className="mt-2 font-body text-xs text-ink/65">{activeStory.location}</p>
                <p className="mt-5 font-body text-base leading-relaxed text-ink/80">{activeStory.body[0]}</p>
                <div className="mt-auto flex flex-wrap items-center gap-6 pt-7">
                  <Link
                    href={`/stories/${activeStory.id}`}
                    className="inline-flex min-h-11 items-center gap-2 border-b border-ink font-body text-sm font-semibold text-ink transition-colors hover:text-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    View the field report <span aria-hidden="true">↗</span>
                  </Link>
                  <Link href="/get-involved" className="inline-flex min-h-11 items-center font-body text-sm font-semibold text-brand-red-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                    Get involved
                  </Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
