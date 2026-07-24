import Link from 'next/link';
import { CONTACT } from '@/lib/brand';
import { ContactForm } from '@/components/ContactForm';

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 bg-sun py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide">
              Get a quote
            </p>
            <h2 className="mt-3 font-display text-3xl font-700 tracking-tight text-ink sm:text-4xl lg:text-5xl" style={{ fontWeight: 700 }}>
              Ready when your property is.
            </h2>
            <p className="mt-4 text-lg text-ink-mute text-pretty">
              Tell us what you need cleaned and where. Commercial schedules and Airbnb turnovers get priority routing from Carrollton north.
            </p>
            <div className="mt-8 space-y-3 text-sm text-ink-mute">
              <p>
                Call{' '}
                <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold text-ink hover:text-tide">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                Email{' '}
                <a href={`mailto:${CONTACT.email}`} className="font-semibold text-ink hover:text-tide">
                  {CONTACT.email}
                </a>
              </p>
              <p className="pt-2">
                Prefer a full page?{' '}
                <Link href="/contact" className="font-semibold text-tide hover:text-tide-deep">
                  Open contact
                </Link>
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-ink/8 bg-mist p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
