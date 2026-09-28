import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Plans and pricing";

export default function Image() {
  return ogImage({ eyebrow: "Pricing", title: "Plans and pricing" });
}
