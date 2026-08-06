"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { PROPERTY_TYPE_OPTIONS, type PropertyType } from "@/lib/quote-form";
import { CustomSelect } from "@/components/CustomSelect";
import { trackEvent } from "@/lib/analytics";
import { SITE_NAME } from "@/lib/brand";

const fieldClass =
  "w-full border-2 border-ink bg-paper px-3.5 py-3 text-ink placeholder:text-ink-mute/50 outline-none transition-colors focus:bg-white focus:shadow-punch";

type Status = "idle" | "loading" | "success" | "error";

/** Short estimate form for hero and CTA bands. Same API as the full quote form. */
export function LeadCaptureForm({
  tone = "light",
  idPrefix = "lead",
}: {
  tone?: "light" | "dark";
  idPrefix?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [consent, setConsent] = useState(false);

  const onDark = tone === "dark";
  const labelClass = onDark
    ? "text-xs font-extrabold uppercase tracking-wide text-white/55"
    : "text-xs font-extrabold uppercase tracking-wide text-ink-mute";
  const shellClass = onDark
    ? "border-2 border-lime/40 bg-ink/80 p-5 sm:p-6 backdrop-blur-sm"
    : "border-2 border-ink bg-paper p-5 sm:p-6 shadow-punch";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!propertyType || !consent) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const payload = {
      firstName: String(raw.firstName || ""),
      lastName: String(raw.lastName || ""),
      phone: String(raw.phone || ""),
      email: String(raw.email || ""),
      city: String(raw.city || ""),
      propertyType,
      message: String(raw.message || ""),
      details: { source: "lead-capture", smsConsent: true },
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      trackEvent("generate_lead", {
        property_type: propertyType,
        form: "lead_capture",
      });
      setStatus("success");
      form.reset();
      setPropertyType("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={`${shellClass} animate-pop`}>
        <CheckCircle2
          className={`h-7 w-7 ${onDark ? "text-lime" : "text-ink"}`}
          aria-hidden
        />
        <p
          className={`mt-3 font-display text-xl font-black ${onDark ? "text-white" : "text-ink"}`}
        >
          Request received
        </p>
        <p className={`mt-1 text-sm ${onDark ? "text-white/70" : "text-ink/75"}`}>
          We will follow up with availability and a quote.
        </p>
        <button
          type="button"
          className={`mt-4 text-sm font-extrabold uppercase tracking-wide underline decoration-2 underline-offset-2 ${onDark ? "text-lime" : "text-ink"}`}
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${shellClass} space-y-4`}>
      <div>
        <p
          className={`font-display text-[11px] font-extrabold uppercase tracking-[0.2em] ${onDark ? "text-lime" : "text-ink-mute"}`}
        >
          Free estimate
        </p>
        <h3
          className={`mt-1 font-display text-lg font-black sm:text-xl ${onDark ? "text-white" : "text-ink"}`}
        >
          Get your cleaning quote
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className={labelClass}>First name</span>
          <input
            id={`${idPrefix}-first`}
            name="firstName"
            required
            autoComplete="given-name"
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Last name</span>
          <input
            id={`${idPrefix}-last`}
            name="lastName"
            required
            autoComplete="family-name"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className={labelClass}>Phone</span>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldClass}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Email</span>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <CustomSelect
          label="Property type"
          name={`${idPrefix}-propertyType`}
          value={propertyType}
          onChange={(v) => setPropertyType(v as PropertyType)}
          options={PROPERTY_TYPE_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
          }))}
          placeholder="Select type"
          required
          labelClassName={
            onDark
              ? "mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-white/55"
              : "mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-ink-mute"
          }
        />
        <label className="block space-y-1.5">
          <span className={labelClass}>City</span>
          <input
            id={`${idPrefix}-city`}
            name="city"
            autoComplete="address-level2"
            placeholder="Carrollton"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className={labelClass}>Message</span>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={3}
          placeholder="Square footage, schedule, access notes..."
          className={`${fieldClass} resize-y`}
        />
      </label>

      <label className="flex gap-3 text-left">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-lime"
        />
        <span className={`text-xs leading-relaxed ${onDark ? "text-white/60" : "text-ink-mute"}`}>
          I agree to receive calls and text messages from {SITE_NAME} about my
          inquiry and service follow-up. Message/data rates may apply. Reply STOP
          to opt out. Consent is not a condition of purchase.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-600" role="alert">
          {!propertyType
            ? "Select a property type."
            : !consent
              ? "Confirm consent to be contacted."
              : "Something went wrong. Call us or try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 border-2 border-ink bg-lime px-5 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending
          </>
        ) : (
          <>
            Get free estimate
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
