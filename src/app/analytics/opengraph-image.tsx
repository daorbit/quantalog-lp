import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Real-time web analytics dashboard";

export default function Image() {
  return ogImage({ eyebrow: "Analytics", title: "Real-time web analytics dashboard" });
}
