import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Geist } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyDonate } from '@/components/layout/StickyDonate';
import { siteConfig } from '@/lib/site';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Prince Asamany Foundation, Hope, Development & Opportunity for All',
    template: '%s | Prince Asamany Foundation',
  },
  description:
    'Prince Asamany Foundation is a registered NGO located in Akyawkrom, Ejisu Municipal Assembly, Ashanti Region, Ghana. We work for social development, clean water access, environmental care, and skills training for youth and families.',
  keywords: [
    'Prince Asamany Foundation',
    'NGO Ghana',
    'Ejisu',
    'Ashanti Region',
    'clean water Ghana',
    'community development',
    'charity Ghana',
  ],
  authors: [{ name: 'Prince Asamany Foundation' }],
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    siteName: 'Prince Asamany Foundation',
    title: 'Prince Asamany Foundation, Hope, Development & Opportunity for All',
    description:
      'A registered NGO working for social development and integration of underprivileged communities in Ejisu, Ashanti Region, Ghana.',
    images: [{ url: '/media/opt/IMG_6871.webp', width: 1200, height: 630, alt: 'Prince Douglas Asamany and foundation volunteers standing together with community members and children in Ghana' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Asamany Foundation',
    description: 'Hope, Development & Opportunity for All, Ejisu, Ashanti, Ghana',
    images: ['/media/opt/IMG_6871.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={cn(playfair.variable, plusJakarta.variable, "font-sans", geist.variable)}>
<body>
        <MotionConfig reducedMotion="user">
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main-content" className="text-center lg:text-left">
            {children}
          </main>
          <Footer />
          <StickyDonate />
        </MotionConfig>
      </body>
    </html>
  );
}

