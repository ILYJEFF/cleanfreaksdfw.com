'use client';

import { MANIFESTO } from '@/lib/brand';

export function ManifestoMarquee() {
  const row = [...MANIFESTO, ...MANIFESTO];

  return (
    <section className="overflow-hidden border-b-2 border-ink bg-ink py-4" aria-label="Clean Freaks standards">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
        {row.map((line, i) => (
          <span key={`${line}-${i}`} className="inline-flex items-center gap-10">
            <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-lime sm:text-base">
              {line}
            </span>
            <span className="h-2 w-2 rotate-45 bg-lime" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
