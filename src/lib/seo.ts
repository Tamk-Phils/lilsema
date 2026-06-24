import type { Metadata } from "next";

export const siteConfig = {
  name: "Lil Sema's Pro Shots",
  shortName: "Lil Sema",
  tagline: "Professional Photography & Videography in Cameroon",
  description:
    "Premium photography and cinematic videography by Lil Sema in Yaounde, Cameroon. Weddings, portraits, events, music videos, and commercial shoots — professional quality with high-end mobile technology.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://semasproshots.com",
  locale: "en_CM",
  language: "en",
  email: "contact@lilsema.com",
  phone: "+237682385567",
  phoneDisplay: "+237 682 385 567",
  whatsapp: "https://wa.me/237682385567",
  address: {
    streetAddress: "Yaounde",
    addressLocality: "Yaounde",
    addressRegion: "Littoral",
    postalCode: "",
    addressCountry: "CM",
  },
  geo: {
    latitude: 4.0511,
    longitude: 9.7679,
  },
  priceRange: "$$",
  foundingDate: "2021",
  areaServed: ["Yaounde", "Yaounde", "Cameroon"],
  services: [
    "Portrait Photography",
    "Wedding Photography",
    "Event Photography",
    "Cinematic Videography",
    "Commercial Photography",
    "Drone Photography",
    "Music Video Production",
  ],
  keywords: [
    "photographer Cameroon",
    "Yaounde photographer",
    "wedding photographer Cameroon",
    "portrait photographer Yaounde",
    "videographer Cameroon",
    "cinematic videography Cameroon",
    "event photographer Yaounde",
    "professional phone photography",
    "music video Cameroon",
    "commercial photography Cameroon",
    "drone photography Cameroon",
    "Lil Sema",
    "Lil Sema Pro Shots",
  ],
  creator: "Lil Sema",
  category: "Photography",
} as const;

export const publicRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImageAlt?: string;
};

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  ogImageAlt,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const allKeywords = [...new Set([...siteConfig.keywords, ...keywords])];

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.creator, url: siteConfig.url }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    category: siteConfig.category,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? `${title} — ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/opengraph-image")],
      creator: "@lilsema",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/logo.svg"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    foundingDate: siteConfig.foundingDate,
    areaServed: siteConfig.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography & Videography Services",
      itemListElement: siteConfig.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: { "@id": `${siteConfig.url}/#organization` },
        },
      })),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["English", "French"],
      areaServed: "CM",
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.creator,
    jobTitle: "Professional Photographer & Videographer",
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    url: absoluteUrl("/about"),
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.addressLocality,
      addressCountry: siteConfig.address.addressCountry,
    },
    knowsAbout: siteConfig.services,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(
  faqs: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export type GalleryImage = {
  id: string;
  url: string;
  category?: string;
  event_name?: string | null;
  created_at?: string;
};

export function imageGalleryJsonLd(images: GalleryImage[]) {
  if (images.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${siteConfig.name} Portfolio`,
    description:
      "Professional photography and videography portfolio by Lil Sema — portraits, weddings, events, and cinematic work in Cameroon.",
    url: absoluteUrl("/gallery"),
    author: { "@id": `${siteConfig.url}/#person` },
    image: images.slice(0, 20).map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      name: img.event_name ?? `Lil Sema ${img.category ?? "Photography"} Work`,
      description: `Professional ${img.category ?? "photography"} by Lil Sema in Cameroon`,
      creator: { "@id": `${siteConfig.url}/#person` },
    })),
  };
}
