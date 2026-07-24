'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const PROPERTY_TYPES = [
  { value: 'commercial', label: 'Commercial' },
  { value: 'airbnb', label: 'Airbnb / short-term' },
  { value: 'residential', label: 'Residential' },
];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-3 rounded-lg border border-tide/30 bg-tide-soft/50 p-8">
        <CheckCircle2 className="h-8 w-8 text-tide" aria-hidden />
        <p className="font-display text-2xl font-700 text-ink" style={{ fontWeight: 700 }}>
          Request received
        </p>
        <p className="text-ink-mute">
          Thanks. We will follow up shortly with availability and a quote.
        </p>
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-tide hover:text-tide-deep"
          onClick={() => setStatus('idle')}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" required autoComplete="family-name" />
      </div>
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="propertyType" className="mb-1.5 block text-sm font-medium text-ink">
          Property type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          required
          defaultValue="commercial"
          className="w-full rounded-md border border-ink/15 bg-sun px-3.5 py-3 text-ink outline-none transition-colors focus:border-tide"
        >
          {PROPERTY_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-ink">
          City / area
        </label>
        <input
          id="city"
          name="city"
          required
          placeholder="Carrollton, Frisco, Plano…"
          className="w-full rounded-md border border-ink/15 bg-sun px-3.5 py-3 text-ink placeholder:text-ink-mute/50 outline-none transition-colors focus:border-tide"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Tell us about the property
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder="Sq ft, schedule needs, access notes, turnover windows…"
          className="w-full resize-y rounded-md border border-ink/15 bg-sun px-3.5 py-3 text-ink placeholder:text-ink-mute/50 outline-none transition-colors focus:border-tide"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong. Please try again or call us.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-tide px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-tide-deep disabled:opacity-70 sm:w-auto"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Request a quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-md border border-ink/15 bg-sun px-3.5 py-3 text-ink placeholder:text-ink-mute/50 outline-none transition-colors focus:border-tide"
      />
    </div>
  );
}
