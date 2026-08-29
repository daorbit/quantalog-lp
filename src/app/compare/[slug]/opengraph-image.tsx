import { getComparison, getComparisonSlugs } from "@/lib/comparisons";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Quantalog comparison";

export function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  return ogImage({
    eyebrow: "Comparison",
    title: c?.title ?? "Quantalog vs the alternatives",
  });
}
