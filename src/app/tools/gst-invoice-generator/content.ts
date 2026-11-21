import { ArrowLeftRight, Building2, Calculator } from "lucide-react";
import type { ProductFeature } from "@/components/product/product-feature-grid";
import type { Faq } from "@/lib/faqs";

export const TITLE = "Free GST invoice generator, no signup";

export const KEYWORDS = [
  "free GST invoice generator",
  "GST invoice generator",
  "GST invoice format",
  "online GST bill maker",
  "GST invoice with UPI QR code",
  "CGST SGST IGST invoice",
  "tax invoice format India",
  "invoice generator no signup",
];

export const META_DESCRIPTION =
  "Make a GST invoice in your browser: CGST, SGST or IGST worked out, HSN and SAC codes, amount in words and a UPI QR. Download it as a PDF. Free, no signup.";

export const LEAD =
  "Fill in your business, your customer and what you sold. CGST and SGST or IGST is worked out from the two states, the total is written in words, and your UPI ID becomes a QR code for the exact amount. Download it as an A4 PDF.";

export const PROMISES = ["No signup", "Nothing you type leaves your browser", "A4 PDF with a UPI QR"];

export const STEPS = [
  {
    title: "Add both businesses",
    body: "Type your details and your customer's. Their GSTINs set the two states, so the right GST is chosen for you.",
  },
  {
    title: "List what you sold",
    body: "Each line takes an HSN or SAC code, a quantity, a rate and a GST rate. Totals, tax and the amount in words update as you type.",
  },
  {
    title: "Download and send",
    body: "Download a print-ready A4 PDF with a UPI QR for the total, then send it on WhatsApp, by email or on paper.",
  },
];

export const TAX_SPLIT: ProductFeature[] = [
  {
    icon: Building2,
    title: "Same state: CGST and SGST",
    body: "When you and your customer are in the same state, the GST is split in half between the centre and the state. 18% becomes 9% CGST and 9% SGST.",
  },
  {
    icon: ArrowLeftRight,
    title: "Different states: IGST",
    body: "When the place of supply is in another state, the whole rate is charged as IGST. 18% stays 18%, on one line.",
  },
  {
    icon: Calculator,
    title: "Rates that already include GST",
    body: "If your price already has GST in it, turn on Rates include GST. ₹1,180 at 18% becomes ₹1,000 taxable value and ₹180 GST.",
  },
];

export const INVOICE_RULES = [
  "Your name, address and GSTIN",
  "A consecutive invoice number of up to 16 characters, unique in the financial year",
  "The date the invoice is issued",
  "Your customer's name and address, and their GSTIN if they are registered",
  "The place of supply, with the state's name and code",
  "An HSN code for goods or a SAC code for services on each line",
  "A description and quantity for each item",
  "The taxable value of each item, after any discount",
  "The GST rate and amount, as CGST and SGST or as IGST",
  "Whether tax is payable on reverse charge",
  "Your signature, or the signature of someone you authorise",
];

export const FAQS: Faq[] = [
  {
    q: "Is this GST invoice generator really free?",
    a: "Yes. There is no signup, no watermark and no limit on how many invoices you download. It runs entirely in your browser, and nothing you type is sent to Quantalog.",
  },
  {
    q: "When do I charge CGST and SGST, and when IGST?",
    a: "Compare your state with the place of supply, which is usually your customer's state. If they are the same, split the GST equally into CGST and SGST. If they differ, charge the full rate as IGST. The generator reads both states from the GSTINs, or from the State fields, and picks for you.",
  },
  {
    q: "What GST rates apply now?",
    a: "Since 22 September 2025 most goods and services are taxed at 5% or 18%, with 40% for a short list of luxury and sin goods. The old 12% and 28% slabs were folded into these, apart from a few tobacco products. Special rates such as 3% for gold and 0.25% for rough diamonds remain. Check the rate for your HSN or SAC code before you send the invoice.",
  },
  {
    q: "Do I need HSN or SAC codes on my invoice?",
    a: "If your aggregate turnover was up to ₹5 crore in the last financial year, a 4-digit HSN or SAC code is required on invoices to registered businesses. Above ₹5 crore, a 6-digit code is required on every invoice.",
  },
  {
    q: "How do I save the invoice as a PDF?",
    a: "Press Download PDF and choose Save as PDF as the printer. The file is laid out on A4 and named after the invoice number and customer. On a phone, the same option appears in the print or share sheet.",
  },
  {
    q: "Where is my invoice stored?",
    a: "Only in this browser, so you can close the page and come back to it. Start blank clears it. Nothing is uploaded, which also means the draft will not appear on another device.",
  },
  {
    q: "Can I make an invoice without a GSTIN?",
    a: "Yes, but you cannot charge GST without being registered. Leave the GSTIN blank and set each item to 0%, and the document is headed Invoice instead of Tax invoice. Businesses in the composition scheme issue a bill of supply instead, which this tool does not make.",
  },
  {
    q: "Does it create e-invoices with an IRN?",
    a: "No. Businesses with aggregate turnover above ₹5 crore must report B2B invoices to the Invoice Registration Portal and print the IRN and QR code it returns. This generator makes the invoice itself, not the e-invoice.",
  },
];
