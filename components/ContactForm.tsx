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
      <div className="flex flex-col items-start gap-3 border-2 border-ink bg-lime p-8 shadow-punch">
        <CheckCircle2 className="h-8 w-8 text-ink" aria-hidden />
        <p className="font-display text-2xl font-black text-ink">Request received</p>
        <p className="text-ink/80">
          Thanks. We will follow up shortly with availability and a quote.
        </p>
        <button
          type="button"
          className="mt-2 text-sm font-extrabold uppercase tracking-wide text-ink underline decoration-2 underline-offset-2"
          onClick={() => setStatus('idle')}
        >
          Send another
        </button>
      </div>
    );
  }

  const fieldClass =
    'w-full border-2 border-ink bg-paper px-3.5 py-3 text-ink placeholder:text-ink-mute/50 outline-none transition-colors focus:bg-white focus:shadow-punch';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <Field label="First name" name="firstName" required autoComplete="given-name" className={fieldClass} />
        <Field label="Last name" name="lastName" required autoComplete="family-name" className={fieldClass} />
      </div>
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
        <Field label="Email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="propertyType" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink">
          Property type
        </label>
        <select
          id="propertyType"
          name="propertyType"
          required
          defaultValue="commercial"
          className={fieldClass}
        >
          {PROPERTY_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink">
          City / area
        </label>
        <input
          id="city"
          name="city"
          required
          placeholder="Carrollton, Frisco, Plano…"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink">
          Tell us about the property
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder="Sq ft, schedule needs, access notes, turnover windows…"
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm font-semibold text-red-700" role="alert">
          Something went wrong. Try again or call us.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group inline-flex w-full items-center justify-center gap-2 border-2 border-ink bg-lime px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot disabled:opacity-70 sm:w-auto"
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
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  className: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}
