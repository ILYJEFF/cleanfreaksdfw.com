/** Clean Freaks DFW — brand & business constants */

export const SITE_NAME = 'Clean Freaks DFW';
export const SITE_NAME_SHORT = 'CleanFreaks';
export const SITE_TAGLINE = 'A little obsessed. Extremely thorough.';
export const SITE_REGION = 'Carrollton & North DFW';
export const SITE_URL = 'https://www.cleanfreaksdfw.com';

export const CONTACT = {
  phoneDisplay: '(254) 479-7482',
  phoneTel: '+12544797482',
  email: 'sales@cleanfreaksdfw.com',
  city: 'Carrollton, TX',
};

export const FOCUS_SERVICES = [
  {
    slug: 'commercial',
    title: 'Commercial',
    headline: 'Offices that look like you mean business.',
    short: 'Lobbies, suites, and shared spaces cleaned like your brand depends on it. Because it does.',
    description:
      'Scheduled and after-hours cleans for offices, medical suites, retail floors, and common areas. We run tight checklists, show up when we say we will, and leave every surface looking intentional.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Nightly or recurring routes',
      'Lobby, restrooms, kitchens, desks',
      'Supply restock on request',
      'Bonded, insured, keyed access ready',
    ],
  },
  {
    slug: 'airbnb',
    title: 'Airbnb turnovers',
    headline: 'Guest-ready before the next knock.',
    short: 'Same-day turnovers with photo-ready finishes. Your listing stays sharp. Reviews stay kinder.',
    description:
      'Fast resets between guests. Linens, kitchens, baths, staging, and amenity checks against your list. We flag issues before the next booking, not after the one-star review.',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80',
    points: [
      'Same-day and afternoon turnovers',
      'Linen change & staging to your checklist',
      'Amenity restock coordination',
      'Photo-ready finish for listings',
    ],
  },
] as const;

export const SECONDARY_SERVICE = {
  slug: 'residential',
  title: 'Residential',
  headline: 'Homes when you need us.',
  short: 'Available, not the main act. Same freaky standards when we take the job.',
  description:
    'Recurring or one-time home cleans for people who already trust us with rentals or workplaces. Same attention. Flexible scheduling.',
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
    title: 'Spill the details',
    body: 'Property type, access notes, timing. Commercial route or Airbnb window. We listen weirdly closely.',
  },
  {
    step: '02',
    title: 'Build the freak list',
    body: 'Custom checklist for your space. Nothing vague. Nothing “we usually do.” Your standards, written down.',
  },
  {
    step: '03',
    title: 'Leave it spotless',
    body: 'On time. Communicative. Finished like we will be judged. Because we are.',
  },
] as const;

export const TRUST_POINTS = [
  { label: 'Carrollton based', detail: 'North DFW routes' },
  { label: 'Commercial first', detail: 'Offices & retail' },
  { label: 'Turnover ready', detail: 'Airbnb same-day' },
  { label: 'Insured crews', detail: 'Keyed access OK' },
] as const;

export const MANIFESTO = [
  'Dust does not get a free pass.',
  'Corners count.',
  'On time is a cleanliness issue.',
  'Your guests should never know we were here. Only that the place feels new.',
] as const;
