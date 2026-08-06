import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";
import { CONTACT, SITE_NAME } from "@/lib/brand";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers about ${SITE_NAME} commercial cleaning, Airbnb turnovers, scheduling, background checks, and quality control across north DFW.`,
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: {
    title: `FAQ | ${SITE_NAME}`,
    description: `Commercial cleaning FAQ for north DFW facilities and Airbnb hosts.`,
    url: absoluteUrl("/faq"),
  },
};

export default function FaqPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(FAQS)]} />

      <div className="border-b-2 border-ink bg-ink pt-28 pb-14 text-white sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs tone="dark" items={crumbs} />
          <p className="mt-5 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
            FAQ
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight sm:text-5xl">
            Straight answers before you switch cleaners
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/65">
            Background checks, after-hours, quality drift, consumables, Airbnb
            windows. If it is still unclear, call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border-2 border-lime bg-lime px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/35 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:border-lime hover:text-lime"
            >
              Free estimate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="mt-10 h-3 bg-lime" aria-hidden />
      </div>

      <FaqSection
        items={FAQS}
        title="Everything facilities ask us"
        showAllLink={false}
      />
      <CtaBand idPrefix="faq-cta" />
    </div>
  );
}
