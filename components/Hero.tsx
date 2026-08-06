import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { CONTACT, SITE_REGION, SITE_TAGLINE } from '@/lib/brand';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Immaculate modern interior ready for guests"
          fill
          priority
          className="object-cover object-center animate-drift will-change-transform"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-hero-wash" />
      <div className="absolute inset-0 bg-lime-beam" />
      <div className="absolute inset-0 bg-grain opacity-70 mix-blend-overlay" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <p className="mb-4 inline-flex w-fit items-center gap-2 border-2 border-lime bg-lime px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink animate-pop opacity-0 [animation-fill-mode:forwards]">
          {SITE_REGION}
        </p>

        <h1 className="animate-rise opacity-0 [animation-fill-mode:forwards]">
          <span className="block font-display text-[clamp(2.8rem,11vw,7.5rem)] font-black leading-[0.88] tracking-[-0.03em]">
            Clean
          </span>
          <span className="block font-display text-[clamp(2.8rem,11vw,7.5rem)] font-black leading-[0.88] tracking-[-0.03em] text-lime">
            Freaks
            <span className="ml-2 inline-block align-middle border-2 border-lime bg-ink px-2 py-1 font-display text-[0.22em] font-extrabold uppercase tracking-[0.18em] text-lime sm:ml-3 sm:px-3 sm:py-1.5">
              DFW
            </span>
          </span>
        </h1>

        <p className="mt-5 max-w-xl font-display text-xl font-semibold leading-snug text-white sm:mt-6 sm:text-2xl animate-rise opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          {SITE_TAGLINE}
        </p>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg animate-rise opacity-0 [animation-delay:160ms] [animation-fill-mode:forwards]">
          Commercial spaces and Airbnbs from Carrollton north. Homes when you ask. We clean like it is a personality trait.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3 animate-rise opacity-0 [animation-delay:240ms] [animation-fill-mode:forwards]">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border-2 border-ink bg-lime px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot"
          >
            Book a freak clean
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-flex items-center gap-2 border-2 border-white/40 bg-white/5 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-lime hover:text-lime"
          >
            <Phone className="h-5 w-5" aria-hidden />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-3 bg-lime" aria-hidden />
    </section>
  );
}
