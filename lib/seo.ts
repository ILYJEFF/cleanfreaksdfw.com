import { CONTACT, FOCUS_SERVICES, SECONDARY_SERVICE, SERVICE_CITIES, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/brand";
import { SERVICE_AREAS } from "@/lib/areas";
import { FACILITIES } from "@/lib/facilities";
import { FAQS } from "@/lib/faqs";

export const ALL_SERVICES = [...FOCUS_SERVICES, SECONDARY_SERVICE];

export type Crumb = {
  name: string;
  href: string;
};

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT.email,
    telephone: CONTACT.phoneTel,
    description: `${SITE_NAME}: commercial cleaning and Airbnb turnovers across north DFW. ${SITE_TAGLINE}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Carrollton",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: SERVICE_CITIES.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Texas" },
    })),
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HouseCleaner",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    description: `${SITE_NAME}: commercial property cleaning and Airbnb turnovers based in Carrollton, TX, serving north DFW. Residential cleaning available.`,
    url: SITE_URL,
    telephone: CONTACT.phoneTel,
    email: CONTACT.email,
    image: absoluteUrl("/icon.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Carrollton",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: SERVICE_CITIES.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "Texas" },
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning services",
      itemListElement: ALL_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.short,
          url: absoluteUrl(`/services/${service.slug}`),
          provider: { "@id": `${SITE_URL}/#localbusiness` },
          areaServed: "North Dallas-Fort Worth, TX",
        },
      })),
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function serviceJsonLd(slug: string) {
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} cleaning`,
    alternateName: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    image: service.image,
    provider: {
      "@type": "HouseCleaner",
      "@id": `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
    },
    areaServed: SERVICE_CITIES.map((name) => ({
      "@type": "City",
      name,
    })),
    serviceType: service.title,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contact"),
      priceCurrency: "USD",
    },
  };
}

export function faqJsonLd(items = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.8 },
  ...ALL_SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  })),
  ...FACILITIES.map((f) => ({
    path: `/facilities/${f.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
  ...SERVICE_AREAS.map((a) => ({
    path: `/areas/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  })),
];
