import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SITE_NAME, CONTACT, SERVICE_CITIES, MANIFESTO, SITE_TAGLINE } from '@/lib/brand';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE_NAME} is a Carrollton-based cleaning company obsessed with commercial properties and Airbnb turnovers across north DFW.`,
  alternates: { canonical: absoluteUrl('/about') },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description: `${SITE_NAME} is a Carrollton-based cleaning company obsessed with commercial properties and Airbnb turnovers across north DFW.`,
    url: absoluteUrl('/about'),
  },
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <div className="relative overflow-hidden border-b-2 border-ink bg-ink pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
        <div className="absolute inset-0 bg-lime-beam" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
            ]}
          />
          <p className="mt-5 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
            About the freaks
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight text-balance sm:text-6xl">
            {SITE_TAGLINE}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">
            We built {SITE_NAME} for properties that cannot look “pretty good.” Commercial opens and guest check-ins deserve freaks.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-lime" aria-hidden />
      </div>


      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
              Why commercial and Airbnbs lead
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              Offices need consistency. Short-term stays need speed. Those two pressures shaped everything: routes from Carrollton north, written checklists, and crews who treat every open and every check-in like a first impression.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              Residential is available, especially if you already trust us with rentals or workplaces. Part of the business. Not the center of it.
            </p>
          </div>
          <div className="border-2 border-ink bg-mist p-8 shadow-punch sm:p-10">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-mute">
              At a glance
            </p>
            <ul className="mt-6 space-y-5">
              {[
                ['Home base', CONTACT.city],
                ['Focus', 'Commercial + Airbnb turnovers'],
                ['Also available', 'Residential'],
                ['Coverage', SERVICE_CITIES.slice(0, 4).join(', ') + ', and north'],
              ].map(([label, value]) => (
                <li key={label} className="border-b-2 border-ink/10 pb-4 last:border-0 last:pb-0">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-ink-mute">{label}</p>
                  <p className="mt-1 font-display text-lg font-bold text-ink">{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-2 border-ink bg-ink p-8 text-white sm:p-10">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-lime">
            House rules
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {MANIFESTO.map((line) => (
              <li key={line} className="flex gap-3 font-display text-base font-semibold sm:text-lg">
                <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-lime" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch hover:-translate-y-0.5 hover:bg-lime-hot"
          >
            Request a quote
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink hover:bg-mist"
          >
            View services
          </Link>
        </div>
      </div>
    </div>
  );
}
