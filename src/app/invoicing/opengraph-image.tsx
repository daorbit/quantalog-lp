import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Quotations and GST-ready invoices, paid by UPI";

export default function Image() {
  return ogImage({ eyebrow: "Invoicing", title: "Quotations and GST-ready invoices, paid by UPI" });
}
