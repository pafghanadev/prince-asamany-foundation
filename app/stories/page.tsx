import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { CTABanner } from '@/components/sections/CTABanner';
import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Stories & Impact',
  description: 'Field stories from Prince Asamany Foundation: community healthcare, family relief, and local livelihoods in Ghana.',
};

export default function StoriesPage() {
  return (
    <>
      <PageHeader overline="Impact Stories" title="The people. The places. The work." description="Go behind the outreach. Read what happened, where we went, and the communities at the heart of each initiative."
        bgImage="/media/opt/IMG_6917.webp" imageAlt="Prince Asamany sharing a care package with a child during outreach" imageCaption="Stories from our communities · Ghana" action={{ href: '#latest-story', label: 'Read the latest story' }} />
      <section id="latest-story" className="bg-paper py-16 text-ink md:py-24" aria-labelledby="stories-grid-heading">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-10 border-b border-rule pb-6 text-center lg:text-left">
            <p className="font-body text-xs font-semibold uppercase text-brand-red-dark">From the field</p>
            <h2 id="stories-grid-heading" className="mt-3 font-display text-3xl md:text-4xl">Our outreach journal</h2>
          </div>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {stories.map((story, index) => (
              <article key={story.id} className={`group ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-12' : ''}`}>
                <Link href={`/stories/${story.id}`} aria-label={`Read ${story.name}`} className="relative block aspect-[4/3] overflow-hidden">
                  <Image src={story.image} alt={story.imageAlt} fill className="object-cover" sizes={index === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 45vw, 100vw'} {...blurProps(story.image)} />
                </Link>
                <div className="flex flex-col items-center pt-6 text-center lg:items-start lg:text-left">
                  <p className="font-body text-xs font-semibold text-brand-red-dark">{index === 0 ? 'Latest story · ' : ''}{story.tag}{story.date ? ` · ${story.date}` : ''}</p>
                  <h3 className={`mt-3 font-display leading-tight text-balance ${index === 0 ? 'text-3xl lg:text-5xl' : 'text-3xl'}`}><Link href={`/stories/${story.id}`}>{story.name}</Link></h3>
                  <p className="mt-3 font-body text-xs text-ink/60">{story.location}</p>
                  <p className="mt-5 line-clamp-3 max-w-xl font-body text-base leading-relaxed text-ink/75">{story.body[0]}</p>
                  <Link href={`/stories/${story.id}`} className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 border-b border-brand-red-dark font-body text-sm font-semibold text-brand-red-dark">Read the story <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
