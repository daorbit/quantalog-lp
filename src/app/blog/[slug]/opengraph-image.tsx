import { getPost, getSlugs } from "@/lib/blog";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Quantalog blog";

/** One card per post, built at the same time as the post's HTML. */
export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({
    eyebrow: "Blog",
    title: post?.title ?? "Quantalog blog",
  });
}
