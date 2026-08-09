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
  // The sitelinks search box: lets a result carry a search field that goes
  // straight into the docs rather than sending people to the homepage first.
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/docs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * The author node.
 *
 * A `Person` rather than the Organization: answer engines weigh a named human
 * author when deciding whether a source is attributable, and reusing the
 * company as its own author does not satisfy that.
 */
export const AUTHOR_ID = `${site.url}/#author`;

export const author = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: site.author,
  url: site.url,
  worksFor: { "@id": ORG_ID },
};

/**
 * An `Article` node for a content page.
 *
 * AI answer engines treat Article as the signal that a page is quotable
 * editorial content, and they check `author` and `dateModified` before
 * attributing a quote — so all three travel together rather than separately.
 */
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
  /** ISO date the page first went live. */
  published: string;
  /** ISO date of the last meaningful edit. Defaults to `published`. */
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
