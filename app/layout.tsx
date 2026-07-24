import type { Metadata } from 'next';
import { Unbounded, Manrope } from 'next/font/google';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, CONTACT } from '@/lib/brand';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { JsonLd } from '@/components/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

const display = Unbounded({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
});

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Clean Freaks DFW: commercial cleaning and Airbnb turnovers from Carrollton north through Frisco, Plano, Lewisville, and beyond. A little obsessed. Extremely thorough.',
  keywords: [
    'Clean Freaks DFW',
    'cleanfreaksdfw',
    'commercial cleaning Carrollton',
    'Airbnb cleaning Frisco',
    'office cleaning Lewisville',
    'short term rental cleaning Plano',
    'cleaning company north Dallas',
    'Airbnb turnover DFW',
    'commercial cleaning Frisco TX',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'home and business services',
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Commercial and Airbnb cleaning from Carrollton north. Clean Freaks DFW.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Commercial and Airbnb cleaning from Carrollton north through Frisco, Plano, and Lewisville.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'text/plain': `${SITE_URL}/llms.txt`,
    },
  },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': CONTACT.city,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
