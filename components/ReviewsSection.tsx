import { Star } from "lucide-react";
import { REVIEW_SUMMARY, TESTIMONIALS } from "@/lib/testimonials";

export function ReviewsSection() {
  return (
    <section className="border-b-2 border-ink bg-mist" id="reviews">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
              What north DFW says
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {REVIEW_SUMMARY.label} work. Obsessive follow-through.
            </h2>
          </div>
          <div className="border-2 border-ink bg-paper px-5 py-4 shadow-punch">
            <div className="flex items-center gap-1 text-ink">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-lime text-lime"
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-1 font-display text-sm font-black text-ink">
              {REVIEW_SUMMARY.rating}.0 · {REVIEW_SUMMARY.countLabel}
            </p>
          </div>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li
              key={t.name}
              className="flex flex-col border-2 border-ink bg-paper p-6 shadow-punch"
            >
              <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-lime text-lime"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/85">
                “{t.quote}”
              </blockquote>
              <footer className="mt-5 border-t-2 border-ink/10 pt-4">
                <p className="font-display text-sm font-black text-ink">{t.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">
                  {t.role}
                </p>
              </footer>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-mute">{REVIEW_SUMMARY.note}</p>
      </div>
    </section>
  );
}
