import { SERVICE_CITIES } from "@/lib/brand";

export type ServiceArea = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  focus: string;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const AREA_COPY: Record<
  string,
  Pick<ServiceArea, "headline" | "summary" | "focus">
> = {
  Carrollton: {
    headline: "Commercial and Airbnb cleaning from our Carrollton home base.",
    summary:
      "Carrollton is home base. Short routes mean tighter communication, faster walkthroughs, and crews who already know the north DFW corridor.",
    focus:
      "Offices along the bushy corridor, medical suites, and short-term rentals that need same-day turnovers.",
  },
  Lewisville: {
    headline: "Office and Airbnb cleaning across Lewisville.",
    summary:
      "From lakeside listings to office parks, Lewisville properties get written checklists and on-time routes from Clean Freaks DFW.",
    focus:
      "Commercial suites, retail commons, and guest-ready Airbnb turnovers.",
  },
  "The Colony": {
    headline: "Commercial cleaning and turnovers in The Colony.",
    summary:
      "Busy commercial corridors and short-term stays need consistency. We bring freak lists and after-hours options to The Colony.",
    focus: "Offices, retail, and same-day rental resets.",
  },
  Frisco: {
    headline: "Frisco commercial cleaning that matches the growth.",
    summary:
      "Frisco facilities move fast. Clean Freaks keeps lobbies, suites, and rentals looking intentional with recurring routes and QC.",
    focus: "Corporate offices, medical suites, and premium Airbnb turnovers.",
  },
  Plano: {
    headline: "Plano office and facility cleaning done thoroughly.",
    summary:
      "Legacy campuses and new suites both need reliable janitorial partners. We document the work and keep quality from drifting.",
    focus: "Multi-suite offices, coworking, and retail floors.",
  },
  "Little Elm": {
    headline: "Little Elm commercial and Airbnb cleaning.",
    summary:
      "Growing neighborhoods mean more offices and more guest stays. We cover both with the same obsessive standards.",
    focus: "Small commercial, retail, and short-term rental turnovers.",
  },
  Prosper: {
    headline: "Prosper facility cleaning with written standards.",
    summary:
      "Prosper businesses deserve more than a vague mop route. We build the freak list around your actual traffic and hours.",
    focus: "Offices, retail, and places of worship.",
  },
  Celina: {
    headline: "Celina commercial cleaning across a fast-growing map.",
    summary:
      "New builds and expanding campuses need a cleaner who can scale the checklist with you. That is the freak way.",
    focus: "Offices, warehouses light-industrial commons, and rentals.",
  },
  "Flower Mound": {
    headline: "Flower Mound office and rental cleaning.",
    summary:
      "From corporate suites to lakeside Airbnbs, Flower Mound properties get on-time service and detail that holds up.",
    focus: "Commercial suites and guest-ready turnovers.",
  },
  "Highland Village": {
    headline: "Highland Village commercial cleaning, close and consistent.",
    summary:
      "Tight community, high standards. We keep storefronts and offices looking sharp without disrupting open hours.",
    focus: "Retail, offices, and light commercial.",
  },
  Coppell: {
    headline: "Coppell facility cleaning with after-hours options.",
    summary:
      "Coppell businesses need quiet after-hours crews and visible daytime polish. We schedule around how you actually operate.",
    focus: "Offices, medical suites, and warehouse break areas.",
  },
  Hebron: {
    headline: "Hebron corridor commercial cleaning.",
    summary:
      "Along the Hebron corridor we run efficient routes for offices and mixed-use spaces that cannot look halfway done.",
    focus: "Office parks and shared commercial spaces.",
  },
};

export const SERVICE_AREAS: ServiceArea[] = SERVICE_CITIES.map((name) => {
  const copy = AREA_COPY[name] ?? {
    headline: `Commercial cleaning in ${name}, TX.`,
    summary: `Clean Freaks DFW serves ${name} with commercial cleaning and Airbnb turnovers built on written checklists.`,
    focus: "Offices, retail, and short-term rentals.",
  };
  return {
    slug: slugify(name),
    name,
    ...copy,
  };
});

export function getArea(slug: string) {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}

export function areaSlugs() {
  return SERVICE_AREAS.map((a) => a.slug);
}

export function nearbyAreas(slug: string, limit = 4) {
  const idx = SERVICE_AREAS.findIndex((a) => a.slug === slug);
  if (idx < 0) return SERVICE_AREAS.slice(0, limit);
  const rest = [
    ...SERVICE_AREAS.slice(idx + 1),
    ...SERVICE_AREAS.slice(0, idx),
  ];
  return rest.slice(0, limit);
}

export function cityToSlug(name: string) {
  return slugify(name);
}
