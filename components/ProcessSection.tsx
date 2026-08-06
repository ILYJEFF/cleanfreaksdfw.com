import { PROCESS_STEPS } from '@/lib/brand';

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-24 border-y-2 border-ink bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-lime">
            How the freaks work
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-5xl">
            Simple start.
            <br />
            Obsessive finish.
          </h2>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <li
              key={item.step}
              className="border-2 border-white/15 bg-white/5 p-6 transition-colors hover:border-lime hover:bg-white/[0.07]"
            >
              <span className="font-display text-4xl font-black text-lime">{item.step}</span>
              <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight">
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
