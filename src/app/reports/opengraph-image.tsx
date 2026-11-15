import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

const TITLE = "Automated client reports by email and WhatsApp";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = TITLE;

export default function Image() {
  return ogImage({ eyebrow: "Client reports", title: TITLE });
}
