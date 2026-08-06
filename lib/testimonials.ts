export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: 5;
};

/** Illustrative commercial-style testimonials for layout until Google reviews are wired. */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jordan M.",
    role: "Office manager, Frisco",
    quote:
      "We switched after months of missed restrooms and slow replies. Clean Freaks sent a walkthrough fast, wrote the checklist, and the crew has been consistent every week.",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Clinic admin, Plano",
    quote:
      "Patients notice the waiting room. High-touch wipe-downs and after-hours timing mattered more than a cheap quote. They get both.",
    rating: 5,
  },
  {
    name: "Chris L.",
    role: "Airbnb host, The Colony",
    quote:
      "Same-day turnovers with staging that matches my listing photos. Issues get flagged before the next guest, which is the whole game.",
    rating: 5,
  },
  {
    name: "Danielle R.",
    role: "Facilities lead, Carrollton",
    quote:
      "On time is treated like part of the clean. Communication is clear, and quality has not drifted the way our last vendor did after month one.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Retail GM, Lewisville",
    quote:
      "Entry glass and restrooms finally stay sharp through weekend traffic. The freak list is real. Nothing vague.",
    rating: 5,
  },
  {
    name: "Elena V.",
    role: "Coworking community lead, Coppell",
    quote:
      "Shared kitchens and booths used to be the complaint magnet. Now members actually mention how clean the space feels.",
    rating: 5,
  },
];

export const REVIEW_SUMMARY = {
  label: "Excellent",
  rating: 5,
  countLabel: "North DFW commercial clients",
  note: "Sample reviews shown for site experience. Live Google reviews can replace this block.",
};
