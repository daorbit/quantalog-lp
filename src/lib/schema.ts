import { site } from "@/lib/site";

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

// Answer engines want a date they can attribute and check without parsing prose.
// SITE_PUBLISHED is the launch date and is fixed; SITE_MODIFIED is bumped with
// each meaningful content release.
export const SITE_PUBLISHED = "2025-11-01";
export const SITE_MODIFIED = "2026-08-09";

export const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/favicon.png`,
  },
  sameAs: [site.github, `https://x.com/${site.twitter.replace(/^@/, "")}`],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.email,
    availableLanguage: "English",
  },
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
  datePublished: SITE_PUBLISHED,
  dateModified: SITE_MODIFIED,

  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/docs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const AUTHOR_ID = `${site.url}/#author`;

export const author = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: site.author,
  url: site.url,
  worksFor: { "@id": ORG_ID },

  // image, jobTitle and sameAs are all optional, but without them the Person
  // node carries nothing an answer engine can attribute or cross-check, and
  // the article rich result renders without a byline avatar.
  image: {
    "@type": "ImageObject",
    url: `${site.url}/favicon.png`,
  },
  jobTitle: "Product Team",
  sameAs: [site.github, `https://x.com/${site.twitter.replace(/^@/, "")}`],
};

export function article({
  path,
  headline,
  description,
  published,
  modified,
}: {
  path: string;
  headline: string;
  description: string;

  published: string;

  modified?: string;
}): Record<string, unknown> {
  return {
    "@type": "Article",
    "@id": `${site.url}${path}#article`,
    headline,
    description,
    url: `${site.url}${path}`,
    image: `${site.url}/OgImage.png`,
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    datePublished: published,
    dateModified: modified ?? published,
    inLanguage: "en",
  };
}

export function breadcrumbs(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function service({
  path,
  name,
  description,
  serviceType,
  offer,
}: {
  path: string;
  name: string;
  description: string;

  serviceType: string;

  offer?: { name: string; price: string; description: string };
}): Record<string, unknown> {
  const o = offer ?? {
    name: "Hobby",
    price: "0",
    description: "10k pageviews per month, free forever",
  };
  return {
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name,
    description,
    serviceType,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    url: `${site.url}${path}`,
    isPartOf: { "@id": SITE_ID },
    offers: {
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "USD",
      description: o.description,
      availability: "https://schema.org/InStock",
      url: `${site.url}${path}`,
    },
  };
}

export function howTo({
  path,
  name,
  description,
  steps,
}: {
  path: string;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): Record<string, unknown> {
  return {
    "@type": "HowTo",
    "@id": `${site.url}${path}#howto`,
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
