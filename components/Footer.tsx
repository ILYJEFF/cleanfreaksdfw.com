import Link from 'next/link';
import { SITE_NAME, CONTACT, SERVICE_CITIES, SITE_TAGLINE } from '@/lib/brand';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/5 bg-ink text-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-tide/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-tide-bright/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="font-display text-3xl font-700 tracking-tight" style={{ fontWeight: 700 }}>
              CleanFreaks
              <span className="text-tide-bright">.</span>
              <span className="ml-1 text-lg font-600 text-white/55">DFW</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
              {SITE_TAGLINE}. Based in {CONTACT.city}, built for properties that need to look ready every day.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide-bright">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="hover:text-white transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/services/airbnb" className="hover:text-white transition-colors">
                  Airbnb turnovers
                </Link>
              </li>
              <li>
                <Link href="/services/residential" className="hover:text-white transition-colors">
                  Residential
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide-bright">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-white transition-colors">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-2 text-white/55">{CONTACT.city}</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/45">
              Serving {SERVICE_CITIES.slice(0, 6).join(', ')}, and nearby.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>Carrollton based · Operating north</p>
        </div>
      </div>
    </footer>
  );
}
