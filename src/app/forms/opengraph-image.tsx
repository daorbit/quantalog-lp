import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
const TITLE = "Form builder with Razorpay payments and bookings";

export const alt = TITLE;

export default function Image() {
  return ogImage({ eyebrow: "Form builder", title: TITLE });
}
