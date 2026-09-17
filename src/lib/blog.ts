import { getCmsPage, listCmsPages, type CmsPage } from "@/lib/cms";

 
const BLOG_GROUP = "blogs";

const SUMMARY_FIELDS = [
  "title",
  "slug",
  "description",
  "tags",
  "author",
  "publishedAt",
  "updatedAt",
  "heroImage",
  "thumbnailImage",
  // Needed in the summary too: the sitemap is built from the listing, and a
  // post marked noindex in the CMS should never be submitted for crawling.
  "seo",
] as const satisfies readonly (keyof CmsPage)[];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  author: { name: string; role: string };
  /** Empty until a post is given artwork in the CMS; the card falls back. */
  image: { url: string; alt: string };
  /** Set from the CMS SEO panel. Keeps the post off the sitemap and out of the index. */
  noIndex: boolean;
};

export type Post = PostMeta & {
  html: string;
};

function toMeta(page: CmsPage): PostMeta {
  return {
    slug: page.slug,
    title: page.title,
    description: page.description ?? "",
    date: page.publishedAt ?? page.updatedAt,
    updated: page.updatedAt,
    tags: page.tags ?? [],
    author: page.author?.name ? page.author : { name: "Quantalog", role: "" },
    // A listing card wants the thumbnail; the hero is the wider crop, and is
    // the better of the two to fall back on when no thumbnail is set.
    image: page.thumbnailImage?.url
      ? page.thumbnailImage
      : (page.heroImage ?? { url: "", alt: "" }),
    noIndex: page.seo?.noIndex ?? false,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const pages = await listCmsPages({
    group: BLOG_GROUP,
    fields: [...SUMMARY_FIELDS],
  });
  // The CMS already sorts by publication date, newest first.
  return pages.map(toMeta);
}

export async function getSlugs(): Promise<string[]> {
  const pages = await listCmsPages({ group: BLOG_GROUP, fields: ["slug"] });
  return pages.map((p) => p.slug);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const page = await getCmsPage(slug);
  // A page outside the blog group is not a post, even if the slug matches.
  if (!page || page.group !== BLOG_GROUP) return undefined;

  return {
    ...toMeta(page),
    html: page.content ?? "",
  };
}

/** Posts sharing the most tags with this one, for the "read next" links. */
export async function getRelatedPosts(
  slug: string,
  limit = 2,
): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);

  return others
    .map((post) => ({
      post,
      score: post.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
