import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "LinkedIn post scheduler with AI-written posts";

export default function Image() {
  return ogImage({ eyebrow: "Scheduled posts", title: "LinkedIn post scheduler with AI-written posts" });
}
