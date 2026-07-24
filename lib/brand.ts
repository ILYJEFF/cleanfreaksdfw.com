/** Clean Freaks DFW — brand & business constants */

export const SITE_NAME = 'Clean Freaks DFW';
export const SITE_NAME_SHORT = 'CleanFreaks';
export const SITE_TAGLINE = 'Commercial & Airbnb cleaning from Carrollton north';
export const SITE_REGION = 'Carrollton & North DFW';
export const SITE_URL = 'https://www.cleanfreaksdfw.com';

export const CONTACT = {
  phoneDisplay: '(469) 555-0148',
  phoneTel: '+14695550148',
  email: 'hello@cleanfreaksdfw.com',
  city: 'Carrollton, TX',
};

export const FOCUS_SERVICES = [
  {
    slug: 'commercial',
    title: 'Commercial cleaning',
    short: 'Offices, retail, and shared workspaces that stay guest-ready for your clients.',
    description:
      'Scheduled and after-hours cleaning for offices, medical suites, retail floors, and common areas. Reliable crews, consistent checklists, and a polish that matches how you want your business seen.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Nightly or recurring schedules',
      'Lobby, restrooms, kitchens, workstations',
      'Supply restocking on request',
      'Bonded, insured, keyed access ready',
    ],
  },
  {
    slug: 'airbnb',
    title: 'Airbnb & short-term stays',
    short: 'Same-day turnovers so every guest walks into a five-star first impression.',
    description:
      'Fast, photo-ready turnovers between guests. We reset linens, restock essentials, deep-clean kitchens and baths, and flag maintenance issues before your next booking.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Same-day and same-afternoon turnovers',
      'Linen change & staging to your checklist',
      'Amenity restock coordination',
      'Photo-ready finish for listings',
    ],
  },
] as const;

export const SECONDARY_SERVICE = {
  slug: 'residential',
  title: 'Residential cleaning',
  short: 'Homes on the calendar when you need them. Available, not our main focus.',
  description:
    'Recurring or one-time home cleans for homeowners who want the same care we bring to commercial and short-term properties. Ideal if you already work with us on rentals or your office.',
  image:
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80',
  points: [
    'Recurring or deep cleans',
    'Move-in / move-out available',
    'Flexible around your schedule',
  ],
} as const;

export const SERVICE_CITIES = [
  'Carrollton',
  'Lewisville',
  'The Colony',
  'Frisco',
  'Plano',
  'Little Elm',
  'Prosper',
  'Celina',
  'Flower Mound',
  'Highland Village',
  'Coppell',
  'Hebron',
] as const;

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Tell us the property',
    body: 'Share the address, access notes, and whether it is commercial, a short-term stay, or a home.',
  },
  {
    step: '02',
    title: 'We build the checklist',
    body: 'Commercial scopes and Airbnb turnovers get tailored checklists so nothing is missed between visits.',
  },
  {
    step: '03',
    title: 'Show up polished',
    body: 'On-time crews, clear communication, and a finish you can open the door on with confidence.',
  },
] as const;

export const TRUST_POINTS = [
  { label: 'Carrollton based', detail: 'North DFW focus' },
  { label: 'Commercial first', detail: 'Offices & retail' },
  { label: 'Guest-ready', detail: 'Airbnb turnovers' },
  { label: 'Insured crews', detail: 'Keyed access ready' },
] as const;
