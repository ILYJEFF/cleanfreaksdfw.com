import Link from "next/link";
import {
  SITE_NAME,
  CONTACT,
  SITE_TAGLINE,
  FOCUS_SERVICES,
  SECONDARY_SERVICE,
} from "@/lib/brand";
import { FACILITIES } from "@/lib/facilities";
import { SERVICE_AREAS } from "@/lib/areas";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-ink bg-ink text-white">
      <div className="pointer-events-none absolute -right-10 top-8 h-40 w-40 rotate-12 bg-lime/20" />
      <div className="pointer-events-none absolute -left-8 bottom-10 h-28 w-28 -rotate-6 bg-lime/10" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandMark tone="light" size="lg" href="/" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE_TAGLINE} Based in {CONTACT.city}. Commercial and Airbnb first
              across north DFW.
            </p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="mt-5 inline-block font-display text-lg font-black text-lime hover:text-lime-hot"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-1 block text-sm text-white/60 hover:text-lime"
            >
              {CONTACT.email}
            </a>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-lime">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-white/75">
              {[...FOCUS_SERVICES, SECONDARY_SERVICE].map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-lime transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/faq" className="hover:text-lime transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-lime transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-lime transition-colors"
                >
                  Free estimate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-lime">
              Facilities
            </p>
            <ul className="mt-4 space-y-2 text-sm font-medium text-white/75">
              {FACILITIES.map((f) => (
                <li key={f.slug}>
                  <Link
                    href={`/facilities/${f.slug}`}
                    className="hover:text-lime transition-colors"
                  >
                    {f.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-lime">
              Areas
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm font-medium text-white/75 sm:grid-cols-2 lg:grid-cols-1">
              {SERVICE_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="hover:text-lime transition-colors"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
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
