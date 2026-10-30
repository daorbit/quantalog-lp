import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Quantalog Apps and integrations";

export default function Image() {
  return ogImage({ eyebrow: "Quantalog Apps", title: "Switch on what you need. Connect what you use." });
}
