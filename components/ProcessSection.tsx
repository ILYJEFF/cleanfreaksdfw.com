import { PROCESS_STEPS } from '@/lib/brand';

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide-bright">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-700 tracking-tight sm:text-4xl lg:text-5xl" style={{ fontWeight: 700 }}>
            Simple start. Consistent finish.
          </h2>
          <p className="mt-4 text-lg text-white/65">
            Whether it is a nightly office route or a same-day Airbnb turnover, the path is the same.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {PROCESS_STEPS.map((item, index) => (
            <li key={item.step} className="relative">
              {index < PROCESS_STEPS.length - 1 && (
                <div
                  className="pointer-events-none absolute left-[calc(100%-0.5rem)] top-6 hidden h-px w-[calc(100%-2rem)] origin-left bg-gradient-to-r from-tide-bright/60 to-transparent sm:block animate-line"
                  aria-hidden
                />
              )}
              <span className="font-display text-4xl font-700 text-tide-bright/90" style={{ fontWeight: 700 }}>
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-xl font-600 tracking-tight" style={{ fontWeight: 600 }}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
