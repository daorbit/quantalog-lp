import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Google Search Console, inside your analytics";

export default function Image() {
  return ogImage({ eyebrow: "Search visibility", title: "Google Search Console, inside your analytics" });
}
