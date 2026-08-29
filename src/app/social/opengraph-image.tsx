import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "AI analytics assistant and scheduled social posts";

export default function Image() {
  return ogImage({ eyebrow: "Orbit AI & social", title: "AI analytics assistant and scheduled social posts" });
}
