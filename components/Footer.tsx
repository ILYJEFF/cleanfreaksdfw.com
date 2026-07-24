import Link from 'next/link';
import { SITE_NAME, CONTACT, SERVICE_CITIES, SITE_TAGLINE } from '@/lib/brand';
import { BrandMark } from '@/components/BrandMark';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-ink bg-ink text-white">
      <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rotate-12 bg-lime/20" />
      <div className="pointer-events-none absolute -left-8 bottom-10 h-28 w-28 -rotate-6 bg-lime/10" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <BrandMark tone="light" size="lg" href="/" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE_TAGLINE} Based in {CONTACT.city}. Operating north.
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-lime">
              Explore
            </p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-white/75">
              <li>
                <Link href="/#services" className="hover:text-lime transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="hover:text-lime transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/services/airbnb" className="hover:text-lime transition-colors">
                  Airbnb turnovers
                </Link>
              </li>
              <li>
                <Link href="/services/residential" className="hover:text-lime transition-colors">
                  Residential
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-lime transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-lime transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-lime">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li>
                <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold hover:text-lime transition-colors">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-lime transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-2 text-white/45">{CONTACT.city}</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/40">
              {SERVICE_CITIES.slice(0, 6).join(' · ')} · and north
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t-2 border-white/10 pt-6 text-xs font-medium uppercase tracking-wider text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p>cleanfreaksdfw.com</p>
        </div>
      </div>
    </footer>
  );
}
