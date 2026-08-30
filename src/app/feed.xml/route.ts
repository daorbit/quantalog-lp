import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

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
    '<rss version="2.0" xmlns:atom="http:
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
