import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "White label analytics API for your product";

export default function Image() {
  return ogImage({ eyebrow: "Platform API", title: "White label analytics API for your product" });
}
