import { site, productNav } from "@/lib/site";
import { getDocNav } from "@/lib/docs";
import { getAllPosts } from "@/lib/blog";
import { getAllComparisons } from "@/lib/comparisons";

export const dynamic = "force-static";

function link(title: string, path: string, description: string): string {
  return `- [${title}](${site.url}${path}): ${description}`;
}

export function GET(): Response {
  const sections: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",

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
