import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "AI analytics assistant built into your dashboard";

export default function Image() {
  return ogImage({ eyebrow: "Orbit AI", title: "AI analytics assistant built into your dashboard" });
}
