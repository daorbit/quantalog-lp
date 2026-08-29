import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Form builder with built-in form analytics";

export default function Image() {
  return ogImage({ eyebrow: "Forms", title: "Form builder with built-in form analytics" });
}
