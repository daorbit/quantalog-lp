import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

const TITLE = "Cookieless web analytics without a consent banner";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = TITLE;

export default function Image() {
  return ogImage({ eyebrow: "Cookieless analytics", title: TITLE });
}
