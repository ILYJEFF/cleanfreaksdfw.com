import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FACILITIES } from "@/lib/facilities";

export function FacilitiesGrid({
  limit,
  title = "Facility types we clean",
  eyebrow = "Verticals",
}: {
  limit?: number;
  title?: string;
  eyebrow?: string;
}) {
  const items = limit ? FACILITIES.slice(0, limit) : FACILITIES;

  return (
    <section className="border-b-2 border-ink bg-paper" id="facilities">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-ink-mute">
              Every facility type gets its own freak list. Pick yours.
            </p>
          </div>
          <Link
            href="/facilities/office-buildings"
            className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
          >
            Browse facilities
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/facilities/${f.slug}`}
                className="group flex h-full flex-col overflow-hidden border-2 border-ink bg-ink text-white transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={f.image}
                    alt=""
                    fill
                    className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-black text-lime">
                    {f.shortTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                    {f.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-white">
                    View details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
