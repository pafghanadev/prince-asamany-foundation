import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { DonatePageContent } from '@/components/sections/DonatePageContent';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Prince Asamany Foundation via Paystack, bank transfer, or MTN MoMo. Every gift directly funds clean water access, environmental projects, and skills training for families across Ejisu, Ghana.',
};

export default function DonatePage() {
  return (
    <>
      {/* Hero */}
      <PageHeader
        overline="Support Our Work"
        title="Put your kindness into action."
        description="Support community health, education, and practical relief. Choose Paystack, bank transfer, or MTN MoMo below."
        bgImage="/media/opt/IMG_6863.webp"
        imageCaption="Community relief · Ghana"
      />

      <DonatePageContent />
    </>
  );
}
