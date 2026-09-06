
const API_BASE =
  process.env.NEXT_PUBLIC_CMS_API_URL ?? "https://cms.daorbit.in/api";

const WORKSPACE_ID =
  process.env.NEXT_PUBLIC_CMS_WORKSPACE_ID ?? "6a9cfdb839090e083196fcaa";

/** How long a rendered page may serve before the CMS is checked again. */
const REVALIDATE_SECONDS = 60;

const workspace = () => `${API_BASE}/workspaces/${WORKSPACE_ID}`;
 
async function readJson<T>(res: Response, what: string): Promise<T> {
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("json")) {
    throw new Error(
      `CMS ${what}: expected JSON from ${res.url} but got "${type}". ` +
        `Check NEXT_PUBLIC_CMS_API_URL points at the API, not the CMS web app.`,
    );
  }
  return (await res.json()) as T;
}

/** A page as the CMS returns it. Fields are present only when requested. */
export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  description: string;
  group: string;
  tags: string[];
  heroImage: { url: string; alt: string };
  thumbnailImage: { url: string; alt: string };
  content: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
    noIndex: boolean;
  };
  author: { name: string; role: string };
  readingMinutes: number;
  status: string;
  publishedAt: string | null;
  updatedAt: string;
};

type ListResponse = {
  items: CmsPage[];
  total: number;
  page: number;
  perPage: number;
};

/**
 * Lists published pages in a group, newest first.
 *
 * `fields` keeps the payload to what the caller renders — an index of fifteen
 * posts would otherwise ship every post's full body to draw a list of titles.
 */
export async function listCmsPages(options: {
  group?: string;
  tag?: string;
  fields?: (keyof CmsPage)[];
  perPage?: number;
}): Promise<CmsPage[]> {
  const query = new URLSearchParams();
  if (options.group) query.set("group", options.group);
  if (options.tag) query.set("tag", options.tag);
  if (options.fields?.length) query.set("fields", options.fields.join(","));
  query.set("perPage", String(options.perPage ?? 100));

  const res = await fetch(`${workspace()}/pagebyslug?${query}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    // A failed build is better than a site that quietly ships an empty blog.
    throw new Error(`CMS list failed: ${res.status} ${res.statusText}`);
  }

  const data = await readJson<ListResponse>(res, "list");
  return data.items;
}

/** One published page by slug, or null when there is no such page. */
export async function getCmsPage(
  slug: string,
  fields?: (keyof CmsPage)[],
): Promise<CmsPage | null> {
  const query = fields?.length ? `?fields=${fields.join(",")}` : "";

  const res = await fetch(
    `${workspace()}/page-details/${encodeURIComponent(slug)}${query}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`CMS page "${slug}" failed: ${res.status} ${res.statusText}`);
  }

  return readJson<CmsPage>(res, `page "${slug}"`);
}
