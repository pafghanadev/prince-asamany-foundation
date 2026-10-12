import Image from 'next/image';
import Link from 'next/link';
import { blurProps } from '@/lib/media';

export function AsymmetricCards() {
  const photo = '/media/opt/IMG-20260727-WA0008.webp';

  return (
    <section className="bg-paper-deep py-16 text-ink md:py-24" aria-labelledby="impact-cards-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-8 flex items-center gap-5 md:mb-10">
          <span className="shrink-0 font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-red-dark">Field report / 01</span>
          <span className="h-px flex-1 bg-rule" aria-hidden="true" />
          <span className="hidden font-body text-xs text-ink/65 sm:block">July 2026 · Student health</span>
        </div>
        <div className="grid items-stretch lg:grid-cols-[1.08fr_0.92fr]">
          <figure className="relative min-h-[18rem] overflow-hidden sm:min-h-[26rem] lg:min-h-[35rem]">
            <Image
              src={photo}
              alt="Students at the Forestry Commission Training Centre holding medication during the free deworming exercise"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 55vw"
              {...blurProps(photo)}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-5 pb-5 pt-16 font-body text-xs text-white sm:px-7">
              Forestry Commission Training Centre · Ashanti Region
            </figcaption>
          </figure>
          <div className="flex flex-col justify-center bg-ink px-7 py-10 text-paper sm:px-12 sm:py-14 lg:px-14">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">The work behind the numbers</p>
            <p className="mt-6 font-display text-7xl leading-none text-brand-gold sm:text-8xl">84</p>
            <h2 id="impact-cards-heading" className="mt-4 font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
              Students reached through preventive care.
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-paper/80">
              In July 2026, students received free deworming medication alongside guidance on hygiene and sanitation. The exercise reached 84 students in the Forestry Commission training programme and Ejisu Akyawkrom community.
            </p>
            <div className="mt-8 border-t border-white/20 pt-6">
              <Link href="/stories/free-deworming-exercise" className="inline-flex min-h-12 items-center gap-3 border-b border-brand-gold pb-1 font-body text-sm font-semibold text-brand-gold transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">
                See the photographs and full report <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

