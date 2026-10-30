import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { APP_PAGES, getAppPage } from "@/lib/quantalog-apps";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Quantalog app";

export function generateStaticParams() {
  return APP_PAGES.map((app) => ({ slug: app.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getAppPage(slug);
  return ogImage({
    eyebrow: app?.name ?? "Quantalog Apps",
    title: app ? `${app.title} ${app.accent}` : "Built-in apps for your workspace",
  });
}
