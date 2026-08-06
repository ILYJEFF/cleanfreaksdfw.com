import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { FACILITIES, getFacility, facilitySlugs } from "@/lib/facilities";
import { SITE_NAME, CONTACT } from "@/lib/brand";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return facilitySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const facility = getFacility(params.slug);
  if (!facility) return {};
  return {
    title: facility.title,
    description: facility.summary,
    alternates: { canonical: absoluteUrl(`/facilities/${facility.slug}`) },
    openGraph: {
      title: `${facility.title} | ${SITE_NAME}`,
      description: facility.summary,
      url: absoluteUrl(`/facilities/${facility.slug}`),
    },
  };
}

export default function FacilityPage({ params }: Props) {
  const facility = getFacility(params.slug);
  if (!facility) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Facilities", href: "/#facilities" },
    { name: facility.shortTitle, href: `/facilities/${facility.slug}` },
  ];

  const related = FACILITIES.filter((f) => f.slug !== facility.slug).slice(0, 3);

  return (
    <div className="bg-paper">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />

      <div className="relative overflow-hidden border-b-2 border-ink bg-ink pt-28 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src={facility.image}
            alt=""
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
        <div className="absolute inset-0 bg-lime-beam" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs tone="dark" items={crumbs} />
          <p className="mt-5 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
            Facility cleaning
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {facility.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{facility.summary}</p>
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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">
              The problem
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              {facility.problem}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">
              The freak fix
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              {facility.solution}
            </p>
          </div>
        </div>

        <div className="mt-16 border-2 border-ink bg-mist p-8 sm:p-10">
          <h2 className="font-display text-2xl font-black text-ink">
            What we clean
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {facility.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-lime-deep" aria-hidden />
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-black text-ink">
              Related facilities
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {related.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/facilities/${f.slug}`}
                    className="block border-2 border-ink bg-paper px-4 py-4 font-display text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-lime hover:shadow-punch"
                  >
                    {f.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CtaBand
        title={`Get a ${facility.shortTitle.toLowerCase()} cleaning estimate`}
        body={facility.summary}
        idPrefix={`facility-${facility.slug}`}
      />
    </div>
  );
}
