export type PropertyType = "commercial" | "airbnb" | "residential";

export const PROPERTY_TYPE_OPTIONS: {
  value: PropertyType;
  label: string;
  hint: string;
}[] = [
  {
    value: "commercial",
    label: "Commercial",
    hint: "Offices, retail, medical, common areas",
  },
  {
    value: "airbnb",
    label: "Airbnb / STR",
    hint: "Turnovers between guests",
  },
  {
    value: "residential",
    label: "Residential",
    hint: "Homes when you need us",
  },
];

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  commercial: "Commercial",
  airbnb: "Airbnb / short-term",
  residential: "Residential",
};

/** Human labels for assessment fields stored in meta.details */
export const DETAIL_LABELS: Record<string, string> = {
  streetAddress: "Street address",
  city: "City",
  state: "State",
  zip: "ZIP",
  businessName: "Business / building",
  propertyName: "Property / listing",
  neighborhood: "Neighborhood / area",
  sqFt: "Approx. sq ft",
  restrooms: "Restrooms",
  floorsOrSuites: "Floors / suites",
  frequency: "Frequency",
  schedulePref: "Schedule preference",
  accessMethod: "Access",
  hasCurrentCleaner: "Current cleaner",
  focusAreas: "Focus areas",
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  turnoversPerWeek: "Turnovers / week",
  turnoverWindow: "Turnover window",
  checkOutTime: "Guest check-out",
  checkInTime: "Guest check-in",
  linenService: "Linen service",
  amenityRestock: "Amenity restock",
  parkingNotes: "Parking / entry notes",
  homeType: "Home type",
  cleanType: "Clean type",
  pets: "Pets",
  preferredDay: "Preferred day / time",
  notes: "Notes",
};

export const US_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "TX", label: "Texas" },
  { value: "OK", label: "Oklahoma" },
  { value: "LA", label: "Louisiana" },
  { value: "AR", label: "Arkansas" },
  { value: "NM", label: "New Mexico" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "Washington, D.C." },
];

export function pickAddressFields(raw: Record<string, unknown>): {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
} {
  const str = (key: string) => String(raw[key] || "").trim();
  return {
    streetAddress: str("streetAddress"),
    city: str("city"),
    state: str("state"),
    zip: str("zip"),
  };
}

export function formatDetailValue(key: string, value: unknown): string {
  if (value == null || value === "") return "";
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return String(value);
}

export function detailsToLines(
  details: Record<string, unknown> | undefined | null,
): string[] {
  if (!details) return [];
  const lines: string[] = [];
  for (const [key, value] of Object.entries(details)) {
    const formatted = formatDetailValue(key, value);
    if (!formatted) continue;
    const label = DETAIL_LABELS[key] || key;
    lines.push(`${label}: ${formatted}`);
  }
  return lines;
}

export function composeMessageFromDetails(
  details: Record<string, unknown> | undefined,
  fallbackNotes?: string,
): string {
  const lines = detailsToLines(details);
  if (lines.length) return lines.join("\n");
  return (fallbackNotes || "").trim() || "No additional details provided.";
}
