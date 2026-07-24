import { TRUST_POINTS } from '@/lib/brand';

export function TrustStrip() {
  return (
    <section className="border-b-2 border-ink bg-lime">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
        {TRUST_POINTS.map((item, i) => (
          <div
            key={item.label}
            className={`px-5 py-6 sm:px-6 sm:py-7 ${
              i % 2 === 1 ? 'border-l-2 border-ink/15' : ''
            } ${i >= 2 ? 'border-t-2 border-ink/15 sm:border-t-0' : ''} ${
              i >= 2 ? 'sm:border-l-2 sm:border-ink/15' : i === 1 ? '' : ''
            }`}
          >
            <p className="font-display text-base font-extrabold tracking-tight text-ink sm:text-lg">
              {item.label}
            </p>
            <p className="mt-0.5 text-sm font-medium text-ink/70">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
