import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

const TITLE = "White label analytics API for SaaS and agencies";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = TITLE;

export default function Image() {
  return ogImage({ eyebrow: "Platform API", title: TITLE });
}
