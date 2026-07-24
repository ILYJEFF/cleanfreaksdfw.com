import { SERVICE_CITIES, CONTACT } from '@/lib/brand';
import { MapPin } from 'lucide-react';

export function ServiceAreaSection() {
  return (
    <section id="areas" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide">
              Service area
            </p>
            <h2 className="mt-3 font-display text-3xl font-700 tracking-tight text-ink sm:text-4xl lg:text-5xl" style={{ fontWeight: 700 }}>
              Based in Carrollton. Operating north.
            </h2>
            <p className="mt-4 text-lg text-ink-mute text-pretty">
              We run routes through the northern DFW corridor so commercial schedules and Airbnb turnovers stay tight and on time.
            </p>
            <div className="mt-8 inline-flex items-start gap-3 rounded-md bg-sun px-4 py-3 text-sm text-ink-mute">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tide" aria-hidden />
              <span>
                Home base: <strong className="font-semibold text-ink">{CONTACT.city}</strong>
              </span>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SERVICE_CITIES.map((city) => (
              <li
                key={city}
                className="rounded-md border border-ink/8 bg-sun px-4 py-3.5 text-sm font-medium text-ink transition-colors hover:border-tide/40 hover:bg-tide-soft/40"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
