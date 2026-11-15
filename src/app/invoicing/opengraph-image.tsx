import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

const TITLE = "Free GST invoice generator with UPI QR code";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = TITLE;

export default function Image() {
  return ogImage({ eyebrow: "GST invoicing", title: TITLE });
}
