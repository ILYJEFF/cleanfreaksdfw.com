export type Facility = {
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  summary: string;
  problem: string;
  solution: string;
  inclusions: string[];
  image: string;
};

export const FACILITIES: Facility[] = [
  {
    slug: "office-buildings",
    title: "Office building cleaning",
    shortTitle: "Office buildings",
    headline: "Offices that look like you mean business.",
    summary:
      "Lobbies, suites, restrooms, and break rooms on a written schedule. After-hours when you need quiet floors.",
    problem:
      "Tenants notice sticky lobbies, empty soap, and dust on the conference table before leadership does. Generic crews clean the visible path and skip the corners that shape first impressions.",
    solution:
      "Clean Freaks builds a freak list for your floors: traffic patterns, restrooms, kitchens, glass, and high-touch points. We show up when we say we will and QC the work like your brand is on the door.",
    inclusions: [
      "Lobby and reception",
      "Restrooms and restock",
      "Kitchens and break rooms",
      "Workstations and conference rooms",
      "Floors, carpets, and trash",
      "After-hours or daytime routes",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "medical-suites",
    title: "Medical suite cleaning",
    shortTitle: "Medical suites",
    headline: "Clinics that feel as clean as they claim.",
    summary:
      "Waiting rooms, exam-adjacent commons, restrooms, and high-touch disinfection with careful timing around patient hours.",
    problem:
      "Patients judge hygiene in seconds. Missed restrooms, smudged glass, and neglected waiting-room chairs quietly erode trust.",
    solution:
      "We prioritize high-touch surfaces, restrooms, and public areas with checklists written for clinical commons, not a random office route.",
    inclusions: [
      "Waiting rooms and reception",
      "Public restrooms",
      "High-touch disinfection",
      "Floors and trash",
      "Staff break areas",
      "After-hours scheduling",
    ],
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "retail",
    title: "Retail floor cleaning",
    shortTitle: "Retail",
    headline: "Floors and fronts that invite people in.",
    summary:
      "Sales floors, fitting areas, restrooms, and storefront glass kept sharp through open hours and peak traffic.",
    problem:
      "Dusty shelves, streaked entry glass, and neglected restrooms make a store feel cheap no matter what you sell.",
    solution:
      "Retail-focused routes hit floors, glass, restrooms, and high-touch fixtures on a cadence that matches your traffic, not a one-size checklist.",
    inclusions: [
      "Sales floor and aisles",
      "Entry glass and doors",
      "Restrooms",
      "Fitting and waiting areas",
      "Trash and dusting",
      "Open or closed-hour cleans",
    ],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "coworking",
    title: "Coworking space cleaning",
    shortTitle: "Coworking",
    headline: "Shared spaces that stay membership-worthy.",
    summary:
      "Hot desks, phone booths, kitchens, and restrooms cleaned between waves of members without killing the vibe.",
    problem:
      "Shared kitchens and booths get gross fast. Members churn when the space feels like everyone else's mess.",
    solution:
      "We schedule around your busiest blocks, restock where agreed, and keep common zones looking intentional every open.",
    inclusions: [
      "Hot desks and commons",
      "Phone booths and meeting rooms",
      "Kitchens and coffee bars",
      "Restrooms and restock",
      "High-touch wipe-downs",
      "Flexible day or night routes",
    ],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "warehouses",
    title: "Warehouse and light industrial cleaning",
    shortTitle: "Warehouses",
    headline: "Floors, docks, and break rooms that keep pace.",
    summary:
      "High-traffic floors, restrooms, offices, and break areas maintained without getting in the way of operations.",
    problem:
      "Dust, tracked dirt, and neglected break rooms slow teams down and make safety walks uncomfortable.",
    solution:
      "We map your traffic lanes and focus zones, then run a schedule that protects ops while keeping the facility presentable for visitors and inspectors.",
    inclusions: [
      "Floor sweeping and mopping",
      "Restrooms and break rooms",
      "Office and shipping desks",
      "Trash and recycling",
      "Entry mats and dock approaches",
      "Custom frequency",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "places-of-worship",
    title: "Places of worship cleaning",
    shortTitle: "Places of worship",
    headline: "Sanctuaries and halls ready for the next gathering.",
    summary:
      "Worship spaces, classrooms, kitchens, and restrooms reset with respect for schedules and sacred spaces.",
    problem:
      "Weekend volume leaves floors, restrooms, and fellowship halls tired. Volunteers should not be the backup janitorial plan.",
    solution:
      "We clean around services and events with a checklist that covers public spaces, classrooms, and hospitality areas consistently.",
    inclusions: [
      "Sanctuary and lobbies",
      "Classrooms and nurseries",
      "Fellowship halls",
      "Kitchens",
      "Restrooms",
      "Event and weekend timing",
    ],
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1400&q=80",
  },
];

export function getFacility(slug: string) {
  return FACILITIES.find((f) => f.slug === slug);
}

export function facilitySlugs() {
  return FACILITIES.map((f) => f.slug);
}
