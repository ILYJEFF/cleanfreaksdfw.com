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
  businessName: "Business / building",
  propertyName: "Property / listing",
  address: "Address or area",
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
