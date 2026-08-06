import { PAIN_INTRO, PAIN_POINTS } from "@/lib/pain";

export function PainSection() {
  return (
    <section className="border-b-2 border-ink bg-paper" id="why-switch">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-ink-mute">
            Why facilities switch
          </p>
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            The janitorial problems you already know
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-mute">{PAIN_INTRO}</p>
        </div>

        <ul className="mt-12 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((item) => (
            <li
              key={item.title}
              className="bg-paper p-6 transition-colors hover:bg-lime/30 sm:p-7"
            >
              <span className="mb-3 inline-block h-2 w-2 rotate-45 bg-lime" aria-hidden />
              <h3 className="font-display text-base font-black text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-mute">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
