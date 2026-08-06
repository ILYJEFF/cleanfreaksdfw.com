import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CONTACT, SITE_TAGLINE } from "@/lib/brand";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

export function CtaBand({
  eyebrow = "Ready when you are",
  title = "Get a free commercial cleaning estimate",
  body = "Tell us the property type and we will follow up fast. Walkthroughs and written freak lists for north DFW facilities.",
  showForm = true,
  idPrefix = "cta",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  showForm?: boolean;
  idPrefix?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t-2 border-ink bg-ink text-white">
      <div className="absolute inset-0 bg-lime-beam opacity-80" aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-lime" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          className={`grid gap-10 ${showForm ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-start" : ""}`}
        >
          <div className="animate-rise">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-black tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
              {body}
            </p>
            <p className="mt-3 text-sm font-semibold text-lime/90">{SITE_TAGLINE}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="inline-flex items-center gap-2 border-2 border-lime bg-lime px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
              {!showForm && (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white/30 bg-transparent px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:border-lime hover:text-lime"
                >
                  Free estimate
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </div>
          </div>
          {showForm ? (
            <div className="animate-rise-late">
              <LeadCaptureForm tone="dark" idPrefix={idPrefix} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
