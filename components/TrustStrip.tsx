import { TRUST_POINTS } from '@/lib/brand';

export function TrustStrip() {
  return (
    <section className="relative border-b border-ink/5 bg-mist">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-ink/5 sm:grid-cols-4">
        {TRUST_POINTS.map((item) => (
          <div
            key={item.label}
            className="bg-mist px-5 py-7 sm:px-6 sm:py-8"
          >
            <p className="font-display text-lg font-700 tracking-tight text-ink sm:text-xl" style={{ fontWeight: 700 }}>
              {item.label}
            </p>
            <p className="mt-1 text-sm text-ink-mute">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
