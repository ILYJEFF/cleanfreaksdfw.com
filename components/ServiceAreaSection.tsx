import Link from "next/link";
import { CONTACT } from "@/lib/brand";
import { SERVICE_AREAS } from "@/lib/areas";
import { MapPin } from "lucide-react";

export function ServiceAreaSection() {
  return (
    <section id="areas" className="scroll-mt-24 checker-bg py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
              Service area
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-5xl">
              Carrollton base.
              <br />
              Northbound routes.
            </h2>
            <p className="mt-4 text-lg text-ink-mute text-pretty">
              We keep commercial schedules and Airbnb turnovers tight across the
              northern DFW corridor. Every city below has its own page.
            </p>
            <div className="mt-8 inline-flex items-start gap-3 border-2 border-ink bg-paper px-4 py-3 text-sm font-medium text-ink shadow-punch">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink" aria-hidden />
              <span>
                Home base:{" "}
                <strong className="font-extrabold">{CONTACT.city}</strong>
              </span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="block border-2 border-ink bg-paper px-4 py-3.5 text-sm font-extrabold text-ink transition-all hover:-translate-y-0.5 hover:bg-lime hover:shadow-punch"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
