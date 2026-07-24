import type { Metadata } from 'next';
import { Unbounded, Manrope } from 'next/font/google';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, CONTACT } from '@/lib/brand';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
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
  ],
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Commercial and Airbnb cleaning from Carrollton north. Clean Freaks DFW.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  robots: 'index, follow',
  alternates: { canonical: SITE_URL },
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
