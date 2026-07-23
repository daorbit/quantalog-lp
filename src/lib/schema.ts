import { site } from "@/lib/site";

/**
 * Structured data shared across the site.
 *
 * Search engines reconcile schema by `@id`, so the organisation and website
 * nodes are defined once here with stable ids and referenced from every page
 * rather than restated. That is what lets a docs page say "publisher: the same
 * organisation the homepage described" instead of describing it again and
 * risking the two drifting apart.
 */

export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

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
};

/**
 * A breadcrumb trail. Google uses it to replace the bare URL under a result
 * with a readable path, which is worth having on every nested page.
 *
 * Pass paths relative to the site root; the leaf is the current page.
 */
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

/** Wraps nodes in the `@graph` envelope every page on this site emits. */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
