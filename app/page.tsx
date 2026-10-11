import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/Hero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { CommunityAction } from '@/components/sections/CommunityAction';
import { ProgramIconRow } from '@/components/sections/ProgramIconRow';
import { AsymmetricCards } from '@/components/sections/AsymmetricCards';
import { FounderHighlight } from '@/components/sections/FounderHighlight';
import { StoryGrid } from '@/components/sections/StoryGrid';
import { EventsSection } from '@/components/sections/EventsSection';
import { MapImpact } from '@/components/sections/MapImpact';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { CTABanner } from '@/components/sections/CTABanner';
import { getEvents } from '@/lib/events';

export const revalidate = 60; // Auto-sync with Google Sheets every 60 seconds

export const metadata: Metadata = {
  title: 'Home',
  description:
    'A registered NGO based in Akyawkrom, Ejisu Municipal Assembly, Ashanti Region, Ghana. We work for social development, clean water access, environmental projects, and skills training for underprivileged communities.',
};

export default async function HomePage() {
  const eventsData = await getEvents();

  return (
    <>
      <HeroSection />
      <ProofStrip />
      <CommunityAction />
      <ProgramIconRow />
      <AsymmetricCards />
      <FounderHighlight />
      <StoryGrid />
      <EventsSection events={eventsData.upcoming} />
      <MapImpact />
      <TrustStrip />
      <CTABanner />
    </>
  );
}
