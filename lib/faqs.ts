import { CONTACT, SERVICE_CITIES, SITE_NAME, SITE_URL } from "@/lib/brand";

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    question: `What does ${SITE_NAME} specialize in?`,
    answer:
      "Commercial cleaning and Airbnb / short-term rental turnovers across Carrollton and north DFW. Residential cleaning is available when capacity allows.",
  },
  {
    question: `Which cities does ${SITE_NAME} serve?`,
    answer: `We operate from Carrollton through north DFW, including ${SERVICE_CITIES.join(", ")}.`,
  },
  {
    question: "How do I get a free cleaning estimate?",
    answer: `Submit the quote form on this site or call ${CONTACT.phoneDisplay}. Tell us the property type, access notes, and timing. We follow up fast to schedule a walkthrough when needed.`,
  },
  {
    question: "How do I communicate with the cleaning team?",
    answer:
      "You get a clear sales and ops contact path. Scope changes, access updates, and schedule notes go through one channel so nothing gets lost in a group text void.",
  },
  {
    question: "Do you offer after-hours cleaning?",
    answer:
      "Yes. Daytime, evening, and after-hours commercial routes are available so we are not mopping through your busiest meetings.",
  },
  {
    question: "Do you run background checks on cleaners?",
    answer:
      "Yes. Crews are screened as part of hiring. We are bonded and insured, and keyed-access ready when your facility requires it.",
  },
  {
    question:
      "Service is great the first month, then it drops. What makes you different?",
    answer:
      "We write the freak list down, run recurring QC, and treat on-time as part of the clean. Quality drift is the industry disease. Documented standards and inspections are the cure.",
  },
  {
    question: "Is there a building size limit?",
    answer:
      "No hard ceiling. We scope single suites, multi-floor offices, and multi-location portfolios. The plan scales to your square footage and traffic.",
  },
  {
    question: "Do you provide toilet paper, soap, and other consumables?",
    answer:
      "Yes, consumables can be supplied and restocked under your service agreement when you want one less thing to chase.",
  },
  {
    question: "Do you offer same-day Airbnb turnovers?",
    answer:
      "Yes. Same-day and afternoon turnovers with linen changes, staging, and amenity checks against your checklist. We flag issues before the next guest, not after the one-star review.",
  },
  {
    question: "What is included in a commercial clean?",
    answer:
      "Typical scopes cover lobbies, restrooms, kitchens, desks, floors, trash, and high-touch surfaces. Every facility gets a written checklist. Nothing vague. Nothing we usually do.",
  },
  {
    question: "How fast do you respond to quote requests?",
    answer: `Call ${CONTACT.phoneDisplay} or use the form at ${SITE_URL}/contact. We prioritize commercial and Airbnb inquiries across north DFW and move quickly toward walkthrough and quote.`,
  },
];

export const HOME_FAQ_TEASER = FAQS.filter((f) =>
  [
    "How do I get a free cleaning estimate?",
    "Service is great the first month, then it drops. What makes you different?",
    "Do you offer after-hours cleaning?",
    "Do you offer same-day Airbnb turnovers?",
  ].includes(f.question),
);
