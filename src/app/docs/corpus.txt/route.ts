import { getDoc, getDocSlugs } from "@/lib/docs";
import { renderDocMarkdown } from "@/lib/docs-corpus";

/**
 * Every documentation page as one markdown document, for Orbit to answer from.
 *
 * Orbit is a separate service and used to carry its own hand-written copy of
 * these facts, kept in step by whoever remembered. Nobody remembered, and the
 * assistant spent a release telling people that lead capture — a feature with a
 * published docs page — did not exist. This endpoint is the fix: the docs are
 * the source, and Orbit reads them rather than restating them.
 *
 * Static, like `llms.txt` beside it. The content only changes when the site is
 * rebuilt, so it is rendered once at build time and served from the edge; the
 * reading side caches it as well, and falls back to its last good copy, so a
 * fetch failure here degrades to slightly stale answers rather than to an
 * assistant that has forgotten the product.
 *
 * Public deliberately. It is published documentation either way, and an
 * authenticated endpoint would need a credential shared between two
 * independently deployed services to protect text anyone can read at
 * `/docs/lead-capture`.
 */
export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const sections = getDocSlugs()
    .map((slug) => getDoc(slug))
    .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc))
    .map((doc) => renderDocMarkdown(doc).body);

  return new Response(sections.join("\n\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
