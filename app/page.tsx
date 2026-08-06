import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { ManifestoMarquee } from '@/components/ManifestoMarquee';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { ServiceAreaSection } from '@/components/ServiceAreaSection';
import { ContactSection } from '@/components/ContactSection';
import { JsonLd } from '@/components/JsonLd';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/brand';
import { faqJsonLd, localBusinessJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | ${SITE_TAGLINE}`,
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      'Commercial and Airbnb cleaning from Carrollton north. Clean Freaks DFW.',
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), faqJsonLd()]} />
      <Hero />
      <TrustStrip />
      <ManifestoMarquee />
      <ServicesSection />
      <ProcessSection />
      <ServiceAreaSection />
      <ContactSection />
    </>
  );
}
