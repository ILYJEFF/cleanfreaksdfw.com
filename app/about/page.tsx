import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SITE_NAME, CONTACT, SERVICE_CITIES } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE_NAME} is a Carrollton-based cleaning company focused on commercial properties and Airbnb turnovers across north DFW.`,
};

export default function AboutPage() {
  return (
    <div className="bg-sun">
      <div className="relative overflow-hidden bg-ink pt-28 pb-16 text-white sm:pt-36 sm:pb-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide-bright">
            About {SITE_NAME.split(' ')[0]}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-700 tracking-tight text-balance sm:text-5xl lg:text-6xl" style={{ fontWeight: 700 }}>
            Cleaning that keeps pace with how north DFW works and hosts.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-2xl font-700 tracking-tight text-ink sm:text-3xl" style={{ fontWeight: 700 }}>
              Why we lead with commercial and Airbnbs
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              Offices need consistency. Short-term stays need speed. Those two pressures shaped how we built {SITE_NAME}: reliable routes from Carrollton north, clear checklists, and crews that treat every open and every check-in like a first impression.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-mute">
              Residential cleaning is available, especially for clients who already trust us with their rentals or workplaces. It is part of the business, not the center of it.
            </p>
          </div>
          <div className="rounded-lg bg-mist p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
              At a glance
            </p>
            <ul className="mt-6 space-y-5">
              {[
                ['Home base', CONTACT.city],
                ['Focus', 'Commercial + Airbnb turnovers'],
                ['Also available', 'Residential'],
                ['Coverage', SERVICE_CITIES.slice(0, 4).join(', ') + ', and north'],
              ].map(([label, value]) => (
                <li key={label} className="border-b border-ink/8 pb-4 last:border-0 last:pb-0">
                  <p className="text-xs uppercase tracking-wider text-ink-mute">{label}</p>
                  <p className="mt-1 font-medium text-ink">{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-tide px-6 py-3.5 text-base font-semibold text-white hover:bg-tide-deep"
          >
            Request a quote
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-md border border-ink/15 bg-white px-6 py-3.5 text-base font-semibold text-ink hover:bg-mist"
          >
            View services
          </Link>
        </div>
      </div>
    </div>
  );
}
