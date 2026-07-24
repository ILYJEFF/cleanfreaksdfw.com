import Link from 'next/link';
import { CONTACT } from '@/lib/brand';
import { ContactForm } from '@/components/ContactForm';

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 border-t-2 border-ink bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
              Get a quote
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-5xl">
              Ready when your property is.
            </h2>
            <p className="mt-4 text-lg text-ink-mute text-pretty">
              Pick the property type, answer a few focused questions, and sales gets everything needed to quote fast.
            </p>
            <div className="mt-8 space-y-3 text-sm text-ink-mute">
              <p>
                Call{' '}
                <a href={`tel:${CONTACT.phoneTel}`} className="font-extrabold text-ink underline decoration-lime decoration-2 underline-offset-2 hover:decoration-ink">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                Email{' '}
                <a href={`mailto:${CONTACT.email}`} className="font-extrabold text-ink underline decoration-lime decoration-2 underline-offset-2 hover:decoration-ink">
                  {CONTACT.email}
                </a>
              </p>
              <p className="pt-2">
                Prefer the full page?{' '}
                <Link href="/contact" className="font-extrabold text-ink underline decoration-lime decoration-2 underline-offset-2">
                  Open contact
                </Link>
              </p>
            </div>
          </div>
          <div className="border-2 border-ink bg-mist p-6 shadow-punch sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
