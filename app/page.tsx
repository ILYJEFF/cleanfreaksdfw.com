import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ManifestoMarquee } from "@/components/ManifestoMarquee";
import { PainSection } from "@/components/PainSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FacilitiesGrid } from "@/components/FacilitiesGrid";
import { ProcessSection } from "@/components/ProcessSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/brand";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { HOME_FAQ_TEASER } from "@/lib/faqs";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | Commercial Cleaning North DFW`,
  },
  description: `${SITE_NAME}: commercial cleaning and Airbnb turnovers across Carrollton and north DFW. Free estimate. ${SITE_TAGLINE}`,
  alternates: { canonical: SITE_URL },
  openGraph: {
    url: SITE_URL,
    title: `${SITE_NAME} | Commercial Cleaning North DFW`,
    description:
      "Commercial and Airbnb cleaning from Carrollton north. Free estimate. Fast follow-up.",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), faqJsonLd(HOME_FAQ_TEASER)]} />
      <Hero />
      <TrustStrip />
      <ManifestoMarquee />
      <PainSection />
      <ServicesSection />
      <FacilitiesGrid />
      <ProcessSection />
      <ReviewsSection />
      <ServiceAreaSection />
      <FaqSection items={HOME_FAQ_TEASER} />
      <CtaBand idPrefix="home-cta" />
    </>
  );
}
