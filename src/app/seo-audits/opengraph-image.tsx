import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "SEO audit tool with Lighthouse scores";

export default function Image() {
  return ogImage({ eyebrow: "SEO audits", title: "SEO audit tool with Lighthouse scores" });
}
