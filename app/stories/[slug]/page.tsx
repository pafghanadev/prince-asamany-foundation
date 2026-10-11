import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';
import { StoryGallery } from '@/components/ui/StoryGallery';
import { PageHeader } from '@/components/ui/PageHeader';

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.id === slug);
  if (!story) notFound();
  return {
    title: `Story: ${story.name}`,
    description: story.quote,
    openGraph: {
      title: story.name,
      description: story.quote,
      images: [{ url: story.image, alt: story.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.name,
      description: story.quote,
      images: [story.image],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = stories.find((s) => s.id === slug);
  if (!story) notFound();

  const currentIndex = stories.findIndex((s) => s.id === slug);
  const prevStory = stories[(currentIndex - 1 + stories.length) % stories.length];
  const nextStory = stories[(currentIndex + 1) % stories.length];

  /* "About this story" metadata - rendered in the sticky sidebar on desktop
     and as a card above the article on mobile. */
  const aboutMeta = (
    <>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-brand-red-dark mb-4">About this story</p>
      <dl className="flex flex-col gap-4">
        <div>
          <dt className="font-body text-xs text-brand-navy/70 mb-0.5">Initiative</dt>
          <dd className="font-body text-sm font-semibold text-brand-navy">{story.name}</dd>
        </div>
        <div>
          <dt className="font-body text-xs text-brand-navy/70 mb-0.5">Category</dt>
          <dd>
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-body font-bold ${story.tagColor}`}>
              {story.tag}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-body text-xs text-brand-navy/70 mb-0.5">Location</dt>
          <dd className="font-body text-sm text-brand-navy/80">{story.location}</dd>
        </div>
        {story.date && (
          <div>
            <dt className="font-body text-xs text-brand-navy/70 mb-0.5">Date</dt>
            <dd className="font-body text-sm font-semibold text-brand-red-dark">{story.date}</dd>
          </div>
        )}
      </dl>
    </>
  );

  return (
    <>
      <PageHeader overline={story.tag} title={story.name} description={`${story.role} · ${story.location}`}
        bgImage={story.image} imageAlt={story.imageAlt} imageCaption={story.date ? `${story.location} · ${story.date}` : story.location}
        action={{ href: '/stories', label: 'All impact stories' }} />
      {/* ── Article body ── */}
      <article className="bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">

          {/* Two-column layout on desktop: article prose (left) + sidebar (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-12 xl:gap-20">

            {/* ── Left: Article prose ── */}
            <div className="min-w-0 max-w-3xl mx-auto lg:mx-0">
              {/* About this story - mobile only (desktop uses the sticky sidebar) */}
              <div className="lg:hidden bg-white rounded-card-lg border border-brand-navy/10 p-6 mb-10">
                {aboutMeta}
              </div>

              {/* Pull quote */}
              <blockquote className="border-y border-rule py-8 mb-10">
                <p className="font-display italic text-xl md:text-2xl text-brand-navy leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </blockquote>

              {/* Body paragraphs */}
              <div className="flex flex-col gap-6">
                {story.body.map((para, i) => (
                  <p key={i} className="font-body text-lg text-brand-navy/75 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-14 pt-8 border-t border-brand-navy/15 flex flex-col md:flex-row items-center justify-between gap-5">
                <Link
                  href="/stories"
                  className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-gold pb-1 py-1 hover:text-brand-red-dark transition-colors duration-200"
                >
                  ← All stories
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center font-body font-semibold text-sm bg-brand-red text-white px-6 py-3 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200"
                >
                  Support the Foundation
                </Link>
              </div>
            </div>

            {/* ── Right: Sticky sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                {/* About this story card */}
                <div className="bg-white rounded-card-lg border border-brand-navy/10 p-7">
                  {aboutMeta}
                </div>

                {/* Support CTA card */}
                <div className="bg-brand-navy rounded-card-lg p-7">
                  <p className="font-display text-xl font-bold text-white leading-snug mb-3">
                    Help us do more work like this.
                  </p>
                  <p className="font-body text-sm text-white/70 leading-relaxed mb-5">
                    Your support makes programs like this possible for communities across Ghana.
                  </p>
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center w-full font-body font-semibold text-sm bg-brand-red text-white px-5 py-3 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200"
                  >
                    Donate Now
                  </Link>
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center justify-center w-full mt-3 font-body font-semibold text-sm text-white px-5 py-3 rounded-btn border-2 border-white/30 hover:bg-white/10 transition-all duration-200"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Photo gallery - full width ── */}
        {story.gallery && story.gallery.length > 0 && (
          <section className="pb-20 max-w-7xl mx-auto px-5 md:px-8" aria-label={`Photo gallery from ${story.name}`}>
            <div className="border-t border-brand-navy/10 pt-14 mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <div>
                <span className="font-body text-sm font-semibold uppercase tracking-[0.12em] text-brand-red-dark">Gallery</span>
                <h2 className="font-display text-3xl font-bold text-brand-navy mt-1">From the field</h2>
              </div>
              <span className="font-body text-sm text-brand-navy/70">{story.gallery.length} photos</span>
            </div>
            <StoryGallery photos={story.gallery} storyName={story.name} />
          </section>
        )}

        {/* ── Next / Previous Story Navigation ── */}
        <nav aria-label="Story pagination" className="border-t border-brand-navy/10 py-16 max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
              Continue Reading
            </span>
            <Link
              href="/stories"
              className="font-body text-sm font-semibold text-brand-navy hover:text-brand-red-dark transition-colors inline-flex items-center gap-1.5"
            >
              All stories
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Story */}
            <Link
              href={`/stories/${prevStory.id}`}
              className="group relative flex flex-col md:flex-row items-center gap-5 p-5 bg-white rounded-card-lg border border-brand-navy/10 hover:border-brand-gold/60 shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-navy"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-card overflow-hidden shrink-0">
                <Image
                  src={prevStory.image}
                  alt={prevStory.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 80px, 96px"
                  {...blurProps(prevStory.image)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider text-brand-navy/60 group-hover:text-brand-red-dark transition-colors">
                  <span aria-hidden="true">←</span> Previous Story
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-brand-navy mt-1 group-hover:text-brand-red-dark transition-colors truncate">
                  {prevStory.name}
                </h3>
                <span className={`inline-block px-2 py-0.5 mt-2 rounded-full text-[11px] font-body font-semibold ${prevStory.tagColor}`}>
                  {prevStory.tag}
                </span>
              </div>
            </Link>

            {/* Next Story */}
            <Link
              href={`/stories/${nextStory.id}`}
              className="group relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-5 p-5 bg-white rounded-card-lg border border-brand-navy/10 hover:border-brand-gold/60 shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-navy text-center md:text-right"
            >
              <div className="min-w-0 flex-1 order-2 md:order-1 text-center md:text-right">
                <span className="inline-flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider text-brand-navy/60 group-hover:text-brand-red-dark transition-colors">
                  Next Story <span aria-hidden="true">→</span>
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-brand-navy mt-1 group-hover:text-brand-red-dark transition-colors truncate">
                  {nextStory.name}
                </h3>
                <span className={`inline-block px-2 py-0.5 mt-2 rounded-full text-[11px] font-body font-semibold ${nextStory.tagColor}`}>
                  {nextStory.tag}
                </span>
              </div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-card overflow-hidden shrink-0 order-1 sm:order-2">
                <Image
                  src={nextStory.image}
                  alt={nextStory.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 80px, 96px"
                  {...blurProps(nextStory.image)}
                />
              </div>
            </Link>
          </div>
        </nav>
      </article>
    </>
  );
}
