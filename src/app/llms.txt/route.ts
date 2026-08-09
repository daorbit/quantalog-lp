import { site, productNav } from "@/lib/site";
import { getDocNav } from "@/lib/docs";
import { getAllPosts } from "@/lib/blog";
import { getAllComparisons } from "@/lib/comparisons";

/**
 * `/llms.txt` — a curated map of the site for language models.
 *
 * The convention is a Markdown file of links telling an LLM which pages are
 * worth reading, so it can answer questions about the product from the real
 * documentation instead of from whatever it inferred off the marketing copy.
 *
 * Generated from the same registries that build the nav and the sitemap rather
 * than kept as a static file in `public/`: a hand-written copy would silently
 * fall out of date the first time a doc page was added, and a stale map is
 * worse than none — it points a model at a URL that no longer exists.
 */

export const dynamic = "force-static";

/** One Markdown link line. The description is what tells a model whether to follow it. */
function link(title: string, path: string, description: string): string {
  return `- [${title}](${site.url}${path}): ${description}`;
}

export function GET(): Response {
  const sections: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    // Stated plainly because an LLM summarising the product tends to reach for
    // the category cliché ("another Google Analytics clone") without it.
    `${site.name} is a privacy-first, cookieless web analytics platform with built-in ` +
      "SEO auditing and a multi-tenant API for embedding analytics into your own product. " +
      "It requires no cookie banner, and the tracking script is under 1 KB.",
    "",
    "## Product",
    "",
    link("Home", "/", site.tagline),
    ...productNav.map((n) => link(n.label, n.href, n.blurb)),
    link("Pricing", "/#pricing", "Plans and limits, including the free tier"),
    "",
  ];

  for (const group of getDocNav()) {
    sections.push(`## Docs — ${group.category}`, "");
    sections.push(
      ...group.docs.map((d) => link(d.title, `/docs/${d.slug}`, d.description))
    );
    sections.push("");
  }

  const posts = getAllPosts();
  if (posts.length) {
    sections.push("## Blog", "");
    sections.push(
      ...posts.map((p) => link(p.title, `/blog/${p.slug}`, p.description))
    );
    sections.push("");
  }

  const comparisons = getAllComparisons();
  if (comparisons.length) {
    sections.push("## Comparisons", "");
    sections.push(
      ...comparisons.map((c) =>
        link(`${site.name} vs ${c.rival}`, `/compare/${c.slug}`, c.description)
      )
    );
    sections.push("");
  }

  sections.push(
    "## About",
    "",
    link("About", "/about", `Who builds ${site.name}`),
    link("Contact", "/contact", "Support and sales enquiries"),
    link("Privacy", "/privacy", "What is collected, and what is not"),
    link("Terms", "/terms", "Terms of service"),
    ""
  );

  return new Response(sections.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
