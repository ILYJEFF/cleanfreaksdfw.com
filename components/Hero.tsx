import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { CONTACT, SITE_NAME, SITE_REGION, SITE_TAGLINE } from "@/lib/brand";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center animate-drift will-change-transform opacity-50"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-hero-wash" />
      <div className="absolute inset-0 bg-lime-beam" />
      <div className="absolute inset-0 bg-grain opacity-60 mix-blend-overlay" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12 lg:px-8 lg:pb-20 lg:pt-36">
        <div className="animate-rise opacity-0 [animation-fill-mode:forwards]">
          <p className="mb-4 inline-flex w-fit items-center gap-2 border-2 border-lime bg-lime px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink">
            {SITE_REGION}
          </p>

          <p className="font-display text-[clamp(2.4rem,8vw,4.75rem)] font-black leading-[0.9] tracking-[-0.03em]">
            <span className="text-white">Clean</span>
            <span className="text-lime">Freaks</span>
            <span className="ml-2 inline-block align-middle border-2 border-lime bg-ink px-2 py-1 text-[0.28em] font-extrabold uppercase tracking-[0.18em] text-lime sm:ml-3">
              DFW
            </span>
          </p>

          <h1 className="mt-5 max-w-xl font-display text-2xl font-bold leading-snug text-white sm:text-3xl lg:text-4xl">
            Commercial cleaning across north DFW. Done right, every time.
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            {SITE_TAGLINE} Offices, medical suites, retail, and Airbnb turnovers
            from Carrollton north. Free estimate. Fast follow-up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="inline-flex items-center gap-2 border-2 border-lime bg-lime px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch transition-transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call {CONTACT.phoneDisplay}
            </a>
            <Link
              href="#estimate"
              className="inline-flex items-center gap-2 border-2 border-white/35 bg-white/5 px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-lime hover:text-lime"
            >
              Jump to form
            </Link>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
            {SITE_NAME} · Bonded & insured · After-hours ready
          </p>
        </div>

        <div
          id="estimate"
          className="scroll-mt-28 animate-rise-late opacity-0 [animation-fill-mode:forwards]"
        >
          <LeadCaptureForm tone="dark" idPrefix="hero" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-3 bg-lime" aria-hidden />
    </section>
  );
}
