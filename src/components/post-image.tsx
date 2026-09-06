import type { PostMeta } from "@/lib/blog";

/**
 * A post's artwork, or a stand-in until it has some.
 *
 * Posts come from the CMS with `heroImage`/`thumbnailImage` fields that are
 * empty for now. Rather than leave a hole in the grid — or worse, a broken
 * image — a post without artwork gets a generated cover: a gradient seeded from
 * its slug, so the same post always draws the same one and two cards side by
 * side never look identical.
 */

/** Hue pairs that stay legible against both themes. */
const GRADIENTS = [
  ["#0d9488", "#0369a1"],
  ["#7c3aed", "#2563eb"],
  ["#db2777", "#7c3aed"],
  ["#ea580c", "#db2777"],
  ["#0891b2", "#0d9488"],
  ["#4f46e5", "#0891b2"],
];

/** A stable index from the slug, so a post's cover never changes between builds. */
function seed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function PostImage({
  post,
  className = "",
  sizes,
}: {
  post: Pick<PostMeta, "slug" | "title" | "image">;
  className?: string;
  sizes?: string;
}) {
  if (post.image?.url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- images are remote
      // CMS URLs on arbitrary hosts, and next/image is unoptimized here anyway.
      <img
        src={post.image.url}
        alt={post.image.alt || post.title}
        sizes={sizes}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  const [from, to] = GRADIENTS[seed(post.slug) % GRADIENTS.length];
  // The post's initial, quietly — enough to tell two placeholders apart at a
  // glance without pretending to be a designed cover.
  const initial = post.title.trim().charAt(0).toUpperCase();

  return (
    <div
      aria-hidden="true"
      className={`flex h-full w-full items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span className="select-none text-4xl font-bold text-white/25">
        {initial}
      </span>
    </div>
  );
}
