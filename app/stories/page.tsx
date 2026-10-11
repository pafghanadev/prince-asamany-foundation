import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Stories & Impact',
  description:
    'Read stories of transformation from the communities Prince Asamany Foundation serves in Ejisu, Ashanti Region, Ghana.',
};

export default function StoriesPage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Impact Stories"
        title="Stories of those we've helped"
        description="Every number is a person. Every project is a life changed. Here are some of the people whose lives have been touched by the work of the Foundation."
      />

      {/* Story grid */}
      <section className="bg-paper text-ink py-20 md:py-28" aria-labelledby="stories-grid-heading">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <h2 id="stories-grid-heading" className="sr-only">Story grid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stories.map((story) => (
              <article key={story.id} className="spotlight-card group relative flex flex-col overflow-hidden rounded-editorial bg-paper border border-rule hover:border-brand-gold/40  hover:-translate-y-1.5 transition-all duration-300 focus-within:outline-2 focus-within:outline-brand-navy focus-within:outline-offset-4">
                {/* Top specular highlight */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" aria-hidden="true" />
                {/* Photo */}
                <div className="relative h-56 overflow-hidden shrink-0">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    {...blurProps(story.image)}
                  />
                  <span className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-body font-semibold backdrop-blur-sm  ${story.tagColor}`}>
                    {story.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow gap-3 text-center">
                  <blockquote className="font-display italic text-base text-ink/75 leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-2">
                    <div className="font-body text-sm font-bold text-ink">{story.name}</div>
                    <div className="font-body text-xs text-ink/75 mt-0.5">{story.role}</div>
                    {story.date && (
                      <div className="font-body text-xs font-semibold text-brand-red-dark mt-1">{story.date}</div>
                    )}
                  </footer>
                  <Link
                    href={`/stories/${story.id}`}
                    className="font-body text-sm font-semibold text-brand-red-dark transition-colors duration-200 mt-2 inline-block py-1 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    aria-label={`Read ${story.name}'s full story`}
                  >
                    <span>Read full story</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-green py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Be part of the next story.
          </h2>
          <p className="font-body text-lg text-white/90 leading-relaxed">
            Together we can restore hope and change lives. Support the Foundation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/donate" className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-editorial border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200 w-full sm:w-auto sm:px-10">
              Donate Now
            </Link>
            <Link href="/get-involved" className="inline-flex items-center justify-center font-body font-semibold text-base bg-transparent text-white px-8 py-4 rounded-editorial border-2 border-white/50 hover:bg-paper/10 transition-all duration-200 w-full sm:w-auto">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

