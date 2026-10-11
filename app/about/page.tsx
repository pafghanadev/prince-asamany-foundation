import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/ui/PageHeader';
import { LeadershipRecognition } from '@/components/sections/LeadershipRecognition';
import { PressSection } from '@/components/sections/PressSection';
import { CTABanner } from '@/components/sections/CTABanner';
import { blurProps } from '@/lib/media';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Prince Asamany Foundation is a non-governmental organization located at Akyawkrom in Ejisu Municipal Assembly. Learn about our mission, vision, values, and community goals.',
};

const values = [
  { title: 'Service beyond self.', desc: 'We put the needs of our communities before our own comfort, acting always in the interest of the people we serve.' },
  { title: 'Integrity.', desc: 'We are transparent, honest, and accountable in every action and decision we make.' },
  { title: 'Responsibility.', desc: 'We take ownership of our commitments to the communities, families, and partners we serve.' },
];

const objectives = [
  'Skills training and practical workshops for young people.',
  'Hands-on vocational tools and community mentorship.',
  'Local and international partnerships for sustainable community support.',
  'Close collaboration with local chiefs, healthcare workers, and families.',
];

const achievements = [
  {
    title: 'Healthcare Initiatives',
    text: 'Partnered with healthcare providers to deliver annual cervical cancer screenings, ensuring women in underserved communities receive lifesaving care.',
  },
  {
    title: 'Joy to the Street Program',
    text: 'A flagship initiative that restores dignity and provides support to people living on the margins, reminding them they are not forgotten.',
  },
  {
    title: 'Youth Empowerment',
    text: "Invested in youth skills training and educational workshops that equip young people with tools and opportunities to build thriving livelihoods.",
  },
  {
    title: 'Women\u2019s Economic Empowerment',
    text: 'Supported market women to establish businesses, fostering financial independence and stability.',
  },
  {
    title: 'Community Health',
    text: 'Organized regular medical screenings to safeguard the health and well-being of vulnerable populations.',
  },
  {
    title: 'National Recognition',
    text: 'In 2025, honored with the Social Change Advocate Award by the Advocate for Fair Legal Access Ghana (AFLAG), acknowledging our role in championing justice and driving social transformation.',
  },
];

const futurePlans = [
  {
    title: 'Expanding Reach',
    text: 'Extending programs to more rural and underserved communities across Ghana.',
  },
  {
    title: 'Building Bridges of Opportunity',
    text: 'Creating pathways for youth to embrace entrepreneurship, digital skills, and leadership.',
  },
  {
    title: 'Strengthening Partnerships',
    text: 'Collaborating with NGOs, policymakers, and international organizations to amplify impact.',
  },
  {
    title: 'Inspiring Service',
    text: 'Encouraging more young people to embrace the spirit of giving, ensuring kindness continues to ripple through society.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Our Foundation"
        title="From our community. For our community."
        description="Based in Akyawkrom, Ejisu, we bring people together around practical care, education, and opportunities for families across Ghana."
        bgImage="/media/opt/IMG_6885.webp"
        imageAlt="Foundation volunteers and residents gathered during community outreach"
        imageCaption="Community outreach · Ashanti Region, Ghana"
        action={{ href: '#founder-heading', label: 'Meet our founder' }}
      />

      {/* About intro */}
      <section className="bg-paper text-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Our Story</span>
            <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">
              Who we are
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="font-body text-lg text-ink/75 leading-relaxed mb-5">
                The Prince Asamany Foundation was born out of a moment of compassion. While driving
                with his daughter, Prince Douglas Asamany encountered a beggar asking for food. His
                daughter&rsquo;s innocent plea, &ldquo;Daddy, why are they begging for food?
                Let&rsquo;s take them home and give them something to eat,&rdquo; sparked the vision
                to create a foundation where kindness meets action.
              </p>
              <blockquote className="border-t md:border-t-0 md:border-l-4 border-brand-gold pt-5 md:pt-0 md:pl-6 mb-5">
                <p className="font-display text-2xl text-ink italic leading-snug">
                  We stand for hope, development and opportunity for all.
                </p>
              </blockquote>
              <p className="font-body text-lg text-ink/75 leading-relaxed mb-5">
                Our purpose is to walk beside underprivileged individuals and families, restoring
                dignity, hope, and real opportunity.
              </p>
              <p className="font-body text-lg text-ink/75 leading-relaxed">
                Registered as an official non-profit organization with the Government of Ghana, the
                Foundation operates with transparency, accountability, and a deep commitment to the
                dignity of every person we serve.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {/* Vision */}
              <div className="border-t md:border-t-0 md:border-l-4 border-brand-gold pt-5 md:pt-0 md:pl-6">
                <h3 className="font-display text-xl font-bold text-brand-red-dark mb-2">Vision</h3>
                <p className="font-body text-lg text-ink/75 leading-relaxed italic">
                  Our work aims to break the cycle of poverty and isolation, restoring hope and
                  opportunity for a brighter future.
                </p>
              </div>

              {/* Mission */}
              <div className="border-t md:border-t-0 md:border-l-4 border-brand-navy pt-5 md:pt-0 md:pl-6">
                <h3 className="font-display text-xl font-bold text-brand-red-dark mb-2">Mission</h3>
                <p className="font-body text-lg text-ink/75 leading-relaxed italic">
                  Promote community well-being, uplift underprivileged families, and build lasting
                  opportunities for every child and mother across Ghana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-paper text-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">
              Milestones
            </span>
            <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">
              Achievements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div key={item.title} className="border-t border-rule p-8">
                <h3 className="font-display text-2xl text-ink mb-3">{item.title}</h3>
                <p className="font-body text-ink/75 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="bg-paper text-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">
              What&rsquo;s next
            </span>
            <h2 className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">
              Future Plans
            </h2>
            <p className="font-body text-lg text-brand-navy/70 mt-4">
              Looking ahead, the Prince Asamany Foundation envisions:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futurePlans.map((item) => (
              <div key={item.title} className="border-t border-rule p-8">
                <h3 className="font-display text-2xl text-ink mb-3">{item.title}</h3>
                <p className="font-body text-ink/75 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder - editorial profile */}
      <section className="bg-paper text-ink py-14 md:py-20 overflow-hidden" aria-labelledby="founder-heading">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Leadership</span>
            <h2 id="founder-heading" className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">
              Meet our founder
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Photo stack: portrait + field shot */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-editorial aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                <Image
                  src="/media/opt/IMG_6965.webp"
                  alt="Portrait of Prince Douglas Asamany, Founder and President of the Prince Asamany Foundation, seated outdoors in a foundation T-shirt"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  {...blurProps('/media/opt/IMG_6965.webp')}
                />
              </div>
              <div className="relative mt-6 max-w-xs mx-auto lg:max-w-none lg:mt-0 lg:absolute lg:-bottom-10 lg:-right-4 xl:-right-10 lg:w-56 xl:w-64 overflow-hidden border-4 border-paper z-10">
                <div className="relative aspect-[5/6]">
                  <Image
                    src="/media/opt/IMG_6899_1.webp"
                    alt="Prince Asamany bending to greet an elderly woman during a community relief visit in Kumasi"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 320px, 256px"
                    {...blurProps('/media/opt/IMG_6899_1.webp')}
                  />
                </div>
              </div>
              <div className="hidden lg:block h-28" aria-hidden="true" />
            </div>

            {/* Narrative */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 mt-8 lg:mt-0">
              <p className="font-display text-2xl md:text-3xl text-ink">
                Prince Douglas Asamany
              </p>
              <p className="font-body text-lg text-ink/75 leading-relaxed max-w-xl">
                A chemist by training and an advocate by calling, Prince founded the Prince Asamany
                Foundation to stand in the gap for underprivileged communities across the Ejisu
                Municipal Assembly, from street children in Kumasi to women in need of preventive
                healthcare.
              </p>
              <p className="font-body text-lg text-ink/75 leading-relaxed max-w-xl">
                Whether he is handing relief packages at the annual &ldquo;Joy to the Street&rdquo; campaign or
                championing Green Chemistry education, his approach is the same: show up in person,
                listen first, and build solutions the community owns. In recognition of that work, he
                was named the 2025 Social Change Advocate by AFLAG.
              </p>
            </div>

          </div>
        </div>
      </section>

      <LeadershipRecognition />

      <PressSection />

      {/* Strategic Objectives & Core Values */}
      <section className="bg-paper text-ink py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Key Goals for Our Communities */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Our Purpose</span>
                <h2 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                  Key Goals for Our Communities
                </h2>
              </div>
              <ul className="flex flex-col gap-4 list-none m-0 p-0" role="list">
                {objectives.map((obj) => (
                  <li key={obj} className="flex flex-col items-center md:flex-row lg:items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-brand-red shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="font-body text-base text-ink/75 leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Values */}
            <div>
              <div className="text-center lg:text-left mb-8">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-red-dark">Our Values</span>
                <h2 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-[1.05]">
                  Core Values
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                {values.map((v, i) => (
                  <div key={v.title} className="flex gap-5">
                    {/* Decorative numeral - hidden from assistive tech; navy/60 is the
                        faintest shade that still passes WCAG large-text contrast on cream */}
                    <div className="font-display text-4xl text-ink/40 leading-none shrink-0 w-8" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-ink">{v.title}</h3>
                      <p className="font-body text-sm text-ink/75 mt-1 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

