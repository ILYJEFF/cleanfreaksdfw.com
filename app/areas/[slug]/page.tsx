import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import {
  SERVICE_AREAS,
  getArea,
  areaSlugs,
  nearbyAreas,
} from "@/lib/areas";
import { FACILITIES } from "@/lib/facilities";
import { FOCUS_SERVICES, SITE_NAME, CONTACT, SITE_TAGLINE } from "@/lib/brand";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return areaSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const area = getArea(params.slug);
  if (!area) return {};
  const title = `Commercial Cleaning in ${area.name}, TX`;
  const description = `${SITE_NAME} provides commercial cleaning and Airbnb turnovers in ${area.name}. ${area.summary}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/areas/${area.slug}`) },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/areas/${area.slug}`),
    },
  };
}

export default function AreaPage({ params }: Props) {
  const area = getArea(params.slug);
  if (!area) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Areas", href: "/#areas" },
    { name: area.name, href: `/areas/${area.slug}` },
  ];

  const nearby = nearbyAreas(area.slug, 4);

  return (
    <div className="bg-paper">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />

      <div className="relative overflow-hidden border-b-2 border-ink bg-ink pt-28 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-lime-beam" />
        <div className="absolute inset-0 checker-bg opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs tone="dark" items={crumbs} />
          <p className="mt-5 inline-flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {area.name}, TX
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {area.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{area.summary}</p>
          <p className="mt-3 text-sm font-semibold text-lime/90">{SITE_TAGLINE}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch hover:-translate-y-0.5"
            >
              Free estimate
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border-2 border-white/35 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white hover:border-lime hover:text-lime"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-lime" aria-hidden />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">
              What we focus on in {area.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              {area.focus}
            </p>
            <ul className="mt-8 space-y-3">
              {FOCUS_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 font-display text-base font-bold text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
                  >
                    {s.title}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-ink bg-mist p-8 shadow-punch">
            <h2 className="font-display text-xl font-black text-ink">
              Facility types nearby
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {FACILITIES.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/facilities/${f.slug}`}
                    className="block border-2 border-ink/15 bg-paper px-3 py-3 text-sm font-bold text-ink hover:border-ink hover:bg-lime"
                  >
                    {f.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-xl font-black text-ink">
            Nearby service areas
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {nearby.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="inline-block border-2 border-ink bg-paper px-4 py-2.5 text-sm font-extrabold text-ink hover:bg-lime hover:shadow-punch"
                >
                  {a.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#areas"
                className="inline-block border-2 border-ink/30 px-4 py-2.5 text-sm font-extrabold text-ink-mute hover:border-ink hover:text-ink"
              >
                All {SERVICE_AREAS.length} cities
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <CtaBand
        title={`Free cleaning estimate in ${area.name}`}
        body={`Commercial and Airbnb cleaning across ${area.name} and north DFW. Tell us the property type and we will follow up fast.`}
        idPrefix={`area-${area.slug}`}
      />
    </div>
  );
}
