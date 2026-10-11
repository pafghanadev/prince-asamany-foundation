import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Prince Asamany Foundation. We are based in Akyawkrom, Ejisu Municipal Assembly, Ashanti Region, Ghana. Call us or send a message.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        overline="Reach Out"
        title="Let’s start with a conversation."
        description="If you are seeking support, do not hesitate to call on us. We're here to help."
        bgImage="/media/opt/IMG_6846.webp"
        imageAlt="Prince Asamany speaking with a mother and child during outreach"
        imageCaption="Connecting with families · Ejisu"
      />

      <ContactForm />
    </>
  );
}
