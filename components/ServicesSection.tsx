import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { FOCUS_SERVICES, SECONDARY_SERVICE } from '@/lib/brand';

export function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-sun py-20 sm:py-28">
      <div className="absolute inset-0 bg-section-glow" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide">
            What we clean
          </p>
          <h2 className="mt-3 font-display text-3xl font-700 tracking-tight text-ink sm:text-4xl lg:text-5xl" style={{ fontWeight: 700 }}>
            Built for commercial and short-term stays.
          </h2>
          <p className="mt-4 text-lg text-ink-mute text-pretty">
            Two priorities. One standard. Properties that need to impress every open and every check-in.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {FOCUS_SERVICES.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-lg bg-ink text-white"
            >
              <div className="absolute inset-0">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
              <div className="relative flex min-h-[22rem] flex-col justify-end p-7 sm:min-h-[26rem] sm:p-9">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-tide-bright">
                  Focus {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-3xl font-700 tracking-tight sm:text-4xl" style={{ fontWeight: 700 }}>
                  {service.title}
                </h3>
                <p className="mt-3 max-w-md text-base text-white/75">{service.short}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Explore service
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-ink/8 bg-mist">
          <div className="grid items-stretch md:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-mute">
                Also available
              </p>
              <h3 className="mt-3 font-display text-2xl font-700 tracking-tight text-ink sm:text-3xl" style={{ fontWeight: 700 }}>
                {SECONDARY_SERVICE.title}
              </h3>
              <p className="mt-3 max-w-lg text-ink-mute">{SECONDARY_SERVICE.short}</p>
              <Link
                href={`/services/${SECONDARY_SERVICE.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-tide hover:text-tide-deep"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative min-h-[14rem] md:min-h-full">
              <Image
                src={SECONDARY_SERVICE.image}
                alt="Residential cleaning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-mist via-transparent to-transparent md:from-mist/80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
