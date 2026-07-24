import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { ServiceAreaSection } from '@/components/ServiceAreaSection';
import { ContactSection } from '@/components/ContactSection';
import { SITE_NAME, SITE_URL, CONTACT, SERVICE_CITIES } from '@/lib/brand';

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HouseCleaner',
    name: SITE_NAME,
    description:
      'Commercial property cleaning and Airbnb turnovers based in Carrollton, TX, serving north DFW. Residential cleaning available.',
    url: SITE_URL,
    telephone: CONTACT.phoneTel,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Carrollton',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: SERVICE_CITIES.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: 'Texas' },
    })),
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <ProcessSection />
      <ServiceAreaSection />
      <ContactSection />
    </>
  );
}
