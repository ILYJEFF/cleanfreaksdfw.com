import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { FOCUS_SERVICES, SECONDARY_SERVICE } from '@/lib/brand';

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
            What we freak out over
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-5xl">
            Commercial.
            <br />
            <span className="text-ink/40">Airbnb.</span>
            <br />
            No half measures.
          </h2>
          <p className="mt-4 text-lg text-ink-mute text-pretty">
            Two priorities. One standard. Properties that have to look sharp every open and every check-in.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {FOCUS_SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative min-h-[24rem] overflow-hidden border-2 border-ink bg-ink text-white shadow-punch transition-all hover:-translate-y-1 hover:shadow-none sm:min-h-[28rem]"
            >
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20" />
              <div className="relative flex h-full min-h-[24rem] flex-col justify-between p-6 sm:min-h-[28rem] sm:p-8">
                <span className="w-fit border-2 border-lime bg-lime px-2 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink">
                  Focus 0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-md font-display text-lg font-semibold text-lime">
                    {service.headline}
                  </p>
                  <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">{service.short}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold uppercase tracking-wide text-white">
                    Dive in
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid overflow-hidden border-2 border-ink bg-mist shadow-punch md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-ink-mute">
              Also on the roster
            </p>
            <h3 className="mt-3 font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">
              {SECONDARY_SERVICE.title}
            </h3>
            <p className="mt-2 font-display text-base font-semibold text-ink/70">
              {SECONDARY_SERVICE.headline}
            </p>
            <p className="mt-3 max-w-lg text-ink-mute">{SECONDARY_SERVICE.short}</p>
            <Link
              href={`/services/${SECONDARY_SERVICE.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-extrabold uppercase tracking-wide text-ink underline decoration-lime decoration-4 underline-offset-4 hover:decoration-ink"
            >
              Learn more
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative min-h-[12rem] border-t-2 border-ink md:min-h-full md:border-l-2 md:border-t-0">
            <Image
              src={SECONDARY_SERVICE.image}
              alt="Residential cleaning"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
