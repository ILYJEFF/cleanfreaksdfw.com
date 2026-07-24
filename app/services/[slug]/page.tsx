import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import {
  FOCUS_SERVICES,
  SECONDARY_SERVICE,
  SITE_NAME,
  CONTACT,
} from '@/lib/brand';

const ALL = [...FOCUS_SERVICES, SECONDARY_SERVICE];

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return ALL.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = ALL.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service' };
  return {
    title: service.title,
    description: `${service.short} ${SITE_NAME} serves Carrollton and north DFW.`,
  };
}

export default function ServicePage({ params }: Props) {
  const service = ALL.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const isSecondary = service.slug === 'residential';
  const others = ALL.filter((s) => s.slug !== service.slug);

  return (
    <div className="bg-sun">
      <div className="relative min-h-[70vh] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-hero-wash" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide-bright">
            {isSecondary ? 'Also available' : 'Primary focus'}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-700 tracking-tight sm:text-5xl lg:text-6xl" style={{ fontWeight: 700 }}>
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">{service.short}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <h2 className="font-display text-2xl font-700 tracking-tight text-ink sm:text-3xl" style={{ fontWeight: 700 }}>
            What is included
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-mute">{service.description}</p>
          <ul className="mt-8 space-y-3">
            {service.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tide-soft text-tide">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-tide px-6 py-3.5 text-base font-semibold text-white hover:bg-tide-deep"
            >
              Get a quote
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-6 py-3.5 text-base font-semibold text-ink hover:bg-mist"
            >
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        <aside className="mt-12 lg:mt-0">
          <div className="rounded-lg border border-ink/8 bg-mist p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
              Other services
            </p>
            <ul className="mt-5 space-y-4">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group block rounded-md bg-sun p-4 transition-colors hover:bg-white"
                  >
                    <p className="font-display text-lg font-600 text-ink group-hover:text-tide" style={{ fontWeight: 600 }}>
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-mute">{s.short}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
