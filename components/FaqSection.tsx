import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FaqItem } from "@/lib/faqs";

export function FaqSection({
  items,
  title = "Questions facilities ask before they switch",
  eyebrow = "FAQ",
  showAllLink = true,
}: {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  return (
    <section className="border-b-2 border-ink bg-paper" id="faq">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
          </div>
          {showAllLink ? (
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink"
            >
              All FAQs
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        <div className="mt-10 divide-y-2 divide-ink border-2 border-ink bg-mist">
          {items.map((item) => (
            <details
              key={item.question}
              className="group bg-paper open:bg-mist"
            >
              <summary className="cursor-pointer list-none px-5 py-5 font-display text-base font-bold text-ink marker:content-none sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {item.question}
                  <span
                    className="mt-1 shrink-0 text-lime transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-mute sm:px-6 sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
