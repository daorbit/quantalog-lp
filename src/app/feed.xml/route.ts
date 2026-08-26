import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * `/feed.xml` — an RSS 2.0 feed of the blog.
 *
 * Worth having for two audiences that are easy to forget. Readers and
 * aggregators are the obvious one; the less obvious one is that several
 * crawlers, including the ones behind answer engines, use a feed as a discovery
 * hint and revisit it far more eagerly than they re-crawl a sitemap. A feed is
 * also the cheapest freshness signal a site can emit: it says what changed and
 * when, in the order it changed.
 *
 * Generated from the post registry rather than maintained by hand, for the same
 * reason `/llms.txt` is — a static copy goes stale the first time a post lands.
 */

export const dynamic = "force-static";

/**
 * XML has five predefined entities and no tolerance for a stray `&`. Titles and
 * descriptions are author-written prose, so they go through this before being
 * interpolated — an unescaped ampersand in a title invalidates the whole feed.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const posts = getAllPosts();
  // getAllPosts is sorted newest-first, so the head of the list is the feed's
  // own last-build date.
  const updated = posts[0]?.updated ?? posts[0]?.date;

  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        // Stable and unchanging, so a reader can tell a revision from a new post.
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <dc:creator>${escapeXml(post.author.name)}</dc:creator>`,
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(`${site.name} Blog`)}</title>`,
    `    <link>${site.url}/blog</link>`,
    `    <description>${escapeXml(site.description)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    ...(updated ? [`    <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>`] : []),
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
