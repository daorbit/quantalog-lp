import { getPost, getSlugs } from "@/lib/blog";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Quantalog blog";

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

// Follows the post route: a slug added to the CMS since the last build still
// gets an image rather than a 404 in the social card.
export const dynamicParams = true;
export const revalidate = 60;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return ogImage({
    eyebrow: "Blog",
    title: post?.title ?? "Quantalog blog",
  });
}
