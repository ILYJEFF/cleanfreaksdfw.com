import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, SITE_NAME } from '@/lib/brand';
import { ContactForm } from '@/components/ContactForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Request a commercial or Airbnb cleaning quote from ${SITE_NAME} in Carrollton and north DFW.`,
  alternates: { canonical: absoluteUrl('/contact') },
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: `Request a commercial or Airbnb cleaning quote from ${SITE_NAME} in Carrollton and north DFW.`,
    url: absoluteUrl('/contact'),
  },
};

export default function ContactPage() {
  return (
    <div className="bg-paper">
      <div className="relative overflow-hidden border-b-2 border-ink bg-ink pt-28 pb-16 text-white sm:pt-36 sm:pb-20">
        <div className="absolute inset-0 bg-lime-beam" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: 'Home', href: '/' },
              { name: 'Contact', href: '/contact' },
            ]}
          />
          <p className="mt-5 font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
            Contact
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-5xl">
            Get your free cleaning estimate
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Choose commercial, Airbnb, or residential. Call {CONTACT.phoneDisplay} or send the form. We follow up fast.
          </p>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-6 inline-flex items-center gap-2 border-2 border-lime bg-lime px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink"
          >
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-lime" aria-hidden />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-20">
        <aside className="space-y-8">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-mute">Call</p>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="mt-2 block font-display text-2xl font-black text-ink hover:underline hover:decoration-lime hover:decoration-4"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-mute">Email</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-2 block text-lg font-bold text-ink hover:underline hover:decoration-lime hover:decoration-4"
            >
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-mute">Base</p>
            <p className="mt-2 font-display text-lg font-bold text-ink">{CONTACT.city}</p>
            <p className="mt-1 text-sm text-ink-mute">Operating north through Frisco, Plano, Lewisville, and nearby.</p>
          </div>
          <Link href="/#services" className="inline-block text-sm font-extrabold uppercase tracking-wide text-ink underline decoration-lime decoration-4 underline-offset-4">
            ← Back to services
          </Link>
        </aside>

        <div className="border-2 border-ink bg-mist p-6 shadow-punch sm:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
