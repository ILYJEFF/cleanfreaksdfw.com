import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, SITE_NAME } from '@/lib/brand';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Request a commercial or Airbnb cleaning quote from ${SITE_NAME} in Carrollton and north DFW.`,
};

export default function ContactPage() {
  return (
    <div className="bg-sun">
      <div className="relative overflow-hidden bg-ink pt-28 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-section-glow opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide-bright">
            Contact
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-700 tracking-tight sm:text-5xl" style={{ fontWeight: 700 }}>
            Tell us about the property.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Commercial schedules and Airbnb turnovers are our priority. Residential requests welcome when capacity allows.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-20">
        <aside className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">Call</p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="mt-2 block font-display text-2xl font-700 text-ink hover:text-tide"
              style={{ fontWeight: 700 }}
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">Email</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-2 block text-lg font-medium text-ink hover:text-tide"
            >
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">Base</p>
            <p className="mt-2 text-lg text-ink">{CONTACT.city}</p>
            <p className="mt-1 text-sm text-ink-mute">Operating north through Frisco, Plano, Lewisville, and nearby.</p>
          </div>
          <Link href="/#services" className="inline-block text-sm font-semibold text-tide hover:text-tide-deep">
            ← Back to services
          </Link>
        </aside>

        <div className="rounded-lg border border-ink/8 bg-mist p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
