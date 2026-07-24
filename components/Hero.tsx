import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { SITE_NAME_SHORT, CONTACT, SITE_REGION } from '@/lib/brand';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Bright, meticulously kept modern interior"
          fill
          priority
          className="object-cover object-center animate-drift will-change-transform"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-hero-wash" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="absolute inset-0 bg-grain opacity-60 mix-blend-overlay" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <p
          className="font-display text-[clamp(2.75rem,12vw,8rem)] font-800 leading-[0.9] tracking-tight text-white animate-rise"
          style={{ fontWeight: 800 }}
        >
          {SITE_NAME_SHORT}
          <span className="text-tide-bright">.</span>
        </p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-tide-bright animate-rise [animation-delay:80ms] opacity-0 [animation-fill-mode:forwards]">
          DFW
        </p>

        <div className="mt-6 grid max-w-3xl gap-6 animate-rise [animation-delay:120ms] opacity-0 [animation-fill-mode:forwards] sm:mt-8">
          <h1 className="font-display text-2xl font-600 leading-snug tracking-tight text-balance sm:text-3xl lg:text-4xl" style={{ fontWeight: 600 }}>
            Commercial spaces and Airbnbs, kept guest-ready from Carrollton north.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            We clean the properties that need to look sharp every day. Offices, retail, and short-term stays first. Homes when you ask.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 animate-rise [animation-delay:240ms] opacity-0 [animation-fill-mode:forwards]">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-tide px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-tide-bright hover:shadow-lg hover:shadow-tide/30"
          >
            Request a quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <p className="mt-10 text-xs font-medium uppercase tracking-[0.22em] text-white/45 animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
          {SITE_REGION}
        </p>
      </div>
    </section>
  );
}
