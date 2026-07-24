"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home,
  KeyRound,
  Loader2,
} from "lucide-react";
import {
  PROPERTY_TYPE_OPTIONS,
  US_STATE_OPTIONS,
  pickAddressFields,
  type PropertyType,
} from "@/lib/quote-form";
import { CustomSelect } from "@/components/CustomSelect";
import { trackEvent } from "@/lib/analytics";

const fieldClass =
  "w-full border-2 border-ink bg-paper px-3.5 py-3 text-ink placeholder:text-ink-mute/50 outline-none transition-colors focus:bg-white focus:shadow-punch";

const TYPE_ICONS = {
  commercial: Building2,
  airbnb: KeyRound,
  residential: Home,
} as const;

const COMMERCIAL_FOCUS = [
  "Lobby / reception",
  "Restrooms",
  "Kitchen / break room",
  "Desks / workstations",
  "Floors / carpets",
  "Conference rooms",
] as const;

const RESIDENTIAL_FOCUS = [
  "Kitchen",
  "Bathrooms",
  "Bedrooms",
  "Living areas",
  "Floors",
  "Windows (interior)",
] as const;

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);

  const focusOptions = useMemo(() => {
    if (propertyType === "commercial") return [...COMMERCIAL_FOCUS];
    if (propertyType === "residential") return [...RESIDENTIAL_FOCUS];
    return [];
  }, [propertyType]);

  function toggleFocus(area: string) {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  }

  function onPropertyTypeChange(next: PropertyType) {
    setPropertyType(next);
    setFocusAreas([]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!propertyType) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const details = buildDetails(propertyType, raw, focusAreas);

    const payload = {
      firstName: String(raw.firstName || ""),
      lastName: String(raw.lastName || ""),
      phone: String(raw.phone || ""),
      email: String(raw.email || ""),
      city: String(raw.city || ""),
      propertyType,
      details,
      message: String(raw.notes || ""),
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
        city: payload.city || undefined,
      });
      setStatus("success");
      form.reset();
      setPropertyType("");
      setFocusAreas([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 border-2 border-ink bg-lime p-8 shadow-punch animate-pop">
        <CheckCircle2 className="h-8 w-8 text-ink" aria-hidden />
        <p className="font-display text-2xl font-black text-ink">
          Request received
        </p>
        <p className="text-ink/80">
          Sales has your details and will follow up with availability and a
          quote.
        </p>
        <button
          type="button"
          className="mt-2 text-sm font-extrabold uppercase tracking-wide text-ink underline decoration-2 underline-offset-2"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-mute">
              Step 01
            </p>
            <h3 className="mt-1 font-display text-lg font-black text-ink sm:text-xl">
              What are we cleaning?
            </h3>
          </div>
        </div>

        <div
          className={`grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-3"}`}
          role="radiogroup"
          aria-label="Property type"
        >
          {PROPERTY_TYPE_OPTIONS.map((opt) => {
            const Icon = TYPE_ICONS[opt.value];
            const selected = propertyType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onPropertyTypeChange(opt.value)}
                className={`group relative flex flex-col items-start gap-2 border-2 border-ink p-4 text-left transition-all ${
                  selected
                    ? "bg-lime shadow-punch -translate-y-0.5"
                    : "bg-paper hover:bg-white hover:shadow-punch hover:-translate-y-0.5"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${selected ? "text-ink" : "text-ink-mute"}`}
                  aria-hidden
                />
                <span className="font-display text-sm font-black text-ink">
                  {opt.label}
                </span>
                <span className="text-xs leading-snug text-ink-mute">
                  {opt.hint}
                </span>
                {selected && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-ink" />
                )}
              </button>
            );
          })}
        </div>
        {!propertyType && status === "error" && (
          <p className="text-sm font-semibold text-red-700" role="alert">
            Choose a property type to continue.
          </p>
        )}
      </section>

      <section className="space-y-5">
        <div>
          <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-mute">
            Step 02
          </p>
          <h3 className="mt-1 font-display text-lg font-black text-ink sm:text-xl">
            How do we reach you?
          </h3>
        </div>

        <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
          <Field
            label="First name"
            name="firstName"
            required
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            name="lastName"
            required
            autoComplete="family-name"
          />
        </div>
        <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
          <Field
            label="Phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </section>

      {propertyType && (
        <section
          key={propertyType}
          className="space-y-5 animate-rise border-t-2 border-ink/15 pt-8"
        >
          <div>
            <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-ink-mute">
              Step 03
            </p>
            <h3 className="mt-1 font-display text-lg font-black text-ink sm:text-xl">
              {propertyType === "commercial" && "Commercial assessment"}
              {propertyType === "airbnb" && "Turnover assessment"}
              {propertyType === "residential" && "Home assessment"}
            </h3>
            <p className="mt-1 text-sm text-ink-mute">
              These details help us quote accurately without a dozen back-and-forths.
            </p>
          </div>

          <AddressFields compact={compact} />

          {propertyType === "commercial" && (
            <CommercialFields focusAreas={focusAreas} onToggleFocus={toggleFocus} focusOptions={focusOptions} compact={compact} />
          )}
          {propertyType === "airbnb" && (
            <AirbnbFields compact={compact} />
          )}
          {propertyType === "residential" && (
            <ResidentialFields focusAreas={focusAreas} onToggleFocus={toggleFocus} focusOptions={focusOptions} compact={compact} />
          )}

          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink"
            >
              Anything else we should know?
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={compact ? 3 : 4}
              placeholder="Access quirks, supply preferences, must-haves…"
              className={`${fieldClass} resize-y`}
            />
          </div>
        </section>
      )}

      {status === "error" && propertyType && (
        <p className="text-sm font-semibold text-red-700" role="alert">
          Something went wrong. Try again or call us.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !propertyType}
        className="group inline-flex w-full items-center justify-center gap-2 border-2 border-ink bg-lime px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-ink shadow-punch transition-all hover:-translate-y-0.5 hover:bg-lime-hot disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Request a quote
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </>
        )}
      </button>
    </form>
  );
}

function buildDetails(
  propertyType: PropertyType,
  raw: Record<string, FormDataEntryValue>,
  focusAreas: string[],
): Record<string, unknown> {
  const str = (key: string) => String(raw[key] || "").trim();
  const address = pickAddressFields(raw);

  if (propertyType === "commercial") {
    return {
      ...address,
      businessName: str("businessName"),
      sqFt: str("sqFt"),
      restrooms: str("restrooms"),
      floorsOrSuites: str("floorsOrSuites"),
      frequency: str("frequency"),
      schedulePref: str("schedulePref"),
      accessMethod: str("accessMethod"),
      hasCurrentCleaner: str("hasCurrentCleaner"),
      focusAreas,
      notes: str("notes"),
    };
  }

  if (propertyType === "airbnb") {
    return {
      ...address,
      propertyName: str("propertyName"),
      neighborhood: str("neighborhood"),
      bedrooms: str("bedrooms"),
      bathrooms: str("bathrooms"),
      turnoversPerWeek: str("turnoversPerWeek"),
      turnoverWindow: str("turnoverWindow"),
      checkOutTime: str("checkOutTime"),
      checkInTime: str("checkInTime"),
      linenService: str("linenService"),
      amenityRestock: str("amenityRestock"),
      accessMethod: str("accessMethod"),
      parkingNotes: str("parkingNotes"),
      notes: str("notes"),
    };
  }

  return {
    ...address,
    homeType: str("homeType"),
    bedrooms: str("bedrooms"),
    bathrooms: str("bathrooms"),
    sqFt: str("sqFt"),
    frequency: str("frequency"),
    cleanType: str("cleanType"),
    pets: str("pets"),
    preferredDay: str("preferredDay"),
    focusAreas,
    notes: str("notes"),
  };
}

function AddressFields({ compact }: { compact: boolean }) {
  return (
    <div className="space-y-4 border-2 border-dashed border-ink/25 bg-paper/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink-mute">
            Property location
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">
            Address <span className="font-medium text-ink-mute">(optional)</span>
          </p>
        </div>
      </div>
      <Field
        label="Street address"
        name="streetAddress"
        autoComplete="street-address"
        placeholder="123 Main St, Suite 200"
      />
      <div
        className={`grid gap-4 ${
          compact ? "grid-cols-1" : "sm:grid-cols-[1.4fr_0.8fr_0.7fr]"
        }`}
      >
        <Field
          label="City"
          name="city"
          autoComplete="address-level2"
          placeholder="Carrollton"
        />
        <CustomSelect
          label="State"
          name="state"
          options={US_STATE_OPTIONS}
          placeholder="State"
        />
        <Field
          label="ZIP"
          name="zip"
          autoComplete="postal-code"
          placeholder="75006"
        />
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
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
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-extrabold uppercase tracking-wide text-ink"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  options,
  placeholder = "Select…",
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <CustomSelect
      label={label}
      name={name}
      required={required}
      options={options}
      placeholder={placeholder}
    />
  );
}

function FocusChips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (area: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 block text-sm font-extrabold uppercase tracking-wide text-ink">
        Focus areas
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((area) => {
          const on = selected.includes(area);
          return (
            <button
              key={area}
              type="button"
              onClick={() => onToggle(area)}
              aria-pressed={on}
              className={`border-2 border-ink px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide transition-all ${
                on
                  ? "bg-lime shadow-[2px_2px_0_0_#0b0d0c]"
                  : "bg-paper hover:bg-white"
              }`}
            >
              {area}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CommercialFields({
  focusAreas,
  onToggleFocus,
  focusOptions,
  compact,
}: {
  focusAreas: string[];
  onToggleFocus: (area: string) => void;
  focusOptions: string[];
  compact: boolean;
}) {
  return (
    <>
      <Field label="Business / building name" name="businessName" required />
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-3"}`}>
        <Field label="Approx. sq ft" name="sqFt" placeholder="e.g. 4,200" />
        <Field label="Restrooms" name="restrooms" placeholder="e.g. 3" />
        <Field
          label="Floors / suites"
          name="floorsOrSuites"
          placeholder="e.g. 2 floors"
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <SelectField
          label="Frequency"
          name="frequency"
          required
          options={[
            { value: "Nightly / 5-day", label: "Nightly / 5-day" },
            { value: "Weekly", label: "Weekly" },
            { value: "Biweekly", label: "Biweekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "One-time / deep", label: "One-time / deep" },
          ]}
        />
        <SelectField
          label="Schedule preference"
          name="schedulePref"
          required
          options={[
            { value: "After hours", label: "After hours" },
            { value: "Daytime", label: "Daytime" },
            { value: "Weekend", label: "Weekend" },
            { value: "Flexible", label: "Flexible" },
          ]}
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <SelectField
          label="Access"
          name="accessMethod"
          required
          options={[
            { value: "Keyed entry", label: "Keyed entry" },
            { value: "Badge / fob", label: "Badge / fob" },
            { value: "Code / lockbox", label: "Code / lockbox" },
            { value: "Met on site", label: "Met on site" },
            { value: "Other", label: "Other" },
          ]}
        />
        <SelectField
          label="Current cleaner?"
          name="hasCurrentCleaner"
          options={[
            { value: "No", label: "No" },
            { value: "Yes, replacing", label: "Yes, replacing" },
            { value: "Yes, supplementing", label: "Yes, supplementing" },
          ]}
        />
      </div>
      <FocusChips
        options={focusOptions}
        selected={focusAreas}
        onToggle={onToggleFocus}
      />
    </>
  );
}

function AirbnbFields({ compact }: { compact: boolean }) {
  return (
    <>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          label="Property / listing name"
          name="propertyName"
          placeholder="Nickname or listing title"
        />
        <Field
          label="Neighborhood / area"
          name="neighborhood"
          placeholder="Legacy West, The Colony…"
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-3"}`}>
        <Field label="Bedrooms" name="bedrooms" required placeholder="e.g. 3" />
        <Field label="Bathrooms" name="bathrooms" required placeholder="e.g. 2" />
        <Field
          label="Turnovers / week"
          name="turnoversPerWeek"
          required
          placeholder="e.g. 2–3"
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <SelectField
          label="Turnover window"
          name="turnoverWindow"
          required
          options={[
            { value: "Same-day", label: "Same-day" },
            { value: "Afternoon", label: "Afternoon" },
            { value: "Next morning", label: "Next morning" },
            { value: "Flexible", label: "Flexible" },
          ]}
        />
        <SelectField
          label="Access"
          name="accessMethod"
          required
          options={[
            { value: "Smart lock", label: "Smart lock" },
            { value: "Lockbox", label: "Lockbox" },
            { value: "Key exchange", label: "Key exchange" },
            { value: "Host meets crew", label: "Host meets crew" },
          ]}
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          label="Guest check-out"
          name="checkOutTime"
          placeholder="e.g. 11:00 AM"
        />
        <Field
          label="Guest check-in"
          name="checkInTime"
          placeholder="e.g. 3:00 PM"
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <SelectField
          label="Linen service"
          name="linenService"
          required
          options={[
            { value: "Yes, full change", label: "Yes, full change" },
            { value: "We supply linens", label: "We supply linens" },
            { value: "No linens needed", label: "No linens needed" },
          ]}
        />
        <SelectField
          label="Amenity restock"
          name="amenityRestock"
          required
          options={[
            { value: "Yes, from our stock", label: "Yes, from our stock" },
            { value: "Yes, from on-site stock", label: "Yes, from on-site stock" },
            { value: "No", label: "No" },
          ]}
        />
      </div>
      <Field
        label="Parking / entry notes"
        name="parkingNotes"
        placeholder="Gate code, parking spot, unit number…"
      />
    </>
  );
}

function ResidentialFields({
  focusAreas,
  onToggleFocus,
  focusOptions,
  compact,
}: {
  focusAreas: string[];
  onToggleFocus: (area: string) => void;
  focusOptions: string[];
  compact: boolean;
}) {
  return (
    <>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <SelectField
          label="Home type"
          name="homeType"
          required
          options={[
            { value: "House", label: "House" },
            { value: "Apartment", label: "Apartment" },
            { value: "Condo", label: "Condo" },
            { value: "Townhome", label: "Townhome" },
          ]}
        />
        <SelectField
          label="Clean type"
          name="cleanType"
          required
          options={[
            { value: "Standard / maintenance", label: "Standard / maintenance" },
            { value: "Deep clean", label: "Deep clean" },
            { value: "Move-in / move-out", label: "Move-in / move-out" },
          ]}
        />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-3"}`}>
        <Field label="Bedrooms" name="bedrooms" required placeholder="e.g. 4" />
        <Field label="Bathrooms" name="bathrooms" required placeholder="e.g. 2.5" />
        <Field label="Approx. sq ft" name="sqFt" placeholder="e.g. 2,100" />
      </div>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <SelectField
          label="Frequency"
          name="frequency"
          required
          options={[
            { value: "One-time", label: "One-time" },
            { value: "Weekly", label: "Weekly" },
            { value: "Biweekly", label: "Biweekly" },
            { value: "Monthly", label: "Monthly" },
          ]}
        />
        <SelectField
          label="Pets"
          name="pets"
          options={[
            { value: "None", label: "None" },
            { value: "Dog(s)", label: "Dog(s)" },
            { value: "Cat(s)", label: "Cat(s)" },
            { value: "Other / multiple", label: "Other / multiple" },
          ]}
        />
      </div>
      <Field
        label="Preferred day / time"
        name="preferredDay"
        placeholder="e.g. Tuesday mornings"
      />
      <FocusChips
        options={focusOptions}
        selected={focusAreas}
        onToggle={onToggleFocus}
      />
    </>
  );
}
