import { CalendarCheck, FileText, Receipt } from "lucide-react";
import type { ProductFeature } from "@/components/product/product-feature-grid";
import type { Faq } from "@/lib/faqs";

export const TITLE = "Free quotation generator with GST, no signup";

export const META_DESCRIPTION =
  "Make a GST quotation in your browser: CGST, SGST or IGST worked out, HSN and SAC codes, a valid-until date and a line to accept it. Download a PDF. Free.";

export const KEYWORDS = [
  "quotation generator",
  "free quotation maker",
  "quotation format",
  "GST quotation format",
  "online quotation maker",
  "price quotation template",
  "quotation with GST",
];

export const LEAD =
  "Fill in your business, your customer and what you are quoting for. GST is worked out the way the invoice will charge it, the total is written in words, and the quote says how long the price holds. Download it as an A4 PDF.";

export const PROMISES = ["No signup", "Nothing you type leaves your browser", "A4 PDF with a line to accept"];

export const STEPS = [
  {
    title: "Add both businesses",
    body: "Type your details and your customer's. Their GSTINs set the two states, so the right GST is chosen for you.",
  },
  {
    title: "List what you are quoting for",
    body: "Each line takes an HSN or SAC code, a quantity, a rate and a GST rate, so the customer sees the full price with tax.",
  },
  {
    title: "Download and send",
    body: "Download an A4 PDF with a line for the customer to sign and accept, then send it on WhatsApp, by email or on paper.",
  },
];

export const QUOTE_VS_INVOICE: ProductFeature[] = [
  {
    icon: FileText,
    title: "A quotation offers a price",
    body: "It sets out what you will charge before the customer agrees. Nothing is owed yet, and it is not a tax invoice.",
  },
  {
    icon: Receipt,
    title: "An invoice asks for payment",
    body: "Once the work is agreed or delivered, the invoice records the sale, carries the GST and starts the payment clock.",
    href: "/tools/gst-invoice-generator",
  },
  {
    icon: CalendarCheck,
    title: "Keep the two in step",
    body: "Quote GST the same way the invoice will charge it, so the customer never meets a different total later.",
  },
];

export const QUOTE_CONTENTS = [
  "Your business name, address and GSTIN",
  "Your customer's name and address",
  "A quotation number and date, so both sides can refer to it",
  "How long the price holds",
  "Each item with a description, quantity, rate and HSN or SAC code",
  "The GST that will apply, split the way the invoice will split it",
  "The total, in figures and in words",
  "Payment terms, such as an advance before work starts",
  "Delivery time and anything else the customer should agree to",
  "A place for the customer to accept",
];

export const FAQS: Faq[] = [
  {
    q: "Is this quotation generator really free?",
    a: "Yes. There is no signup, no watermark and no limit on how many quotations you download. It runs entirely in your browser, and nothing you type is sent to Quantalog.",
  },
  {
    q: "Should a quotation include GST?",
    a: "If you are GST-registered and the work is taxable, yes. Showing the GST tells the customer the full price they will pay, and the invoice should then match it. The GST itself is charged on the invoice, not on the quotation.",
  },
  {
    q: "What is the format of a quotation?",
    a: "No law fixes it, because a quotation is not a tax invoice. Customers expect your details and theirs, a number and date, how long the price holds, the items with rates and tax, the total and your terms. The generator lays all of that out on one A4 page.",
  },
  {
    q: "How long should a quotation be valid?",
    a: "Fifteen to thirty days is common, and shorter when your own costs change quickly. The generator sets 30 days, and you can change the Valid until date.",
  },
  {
    q: "Is a quotation the same as a proforma invoice?",
    a: "No. A quotation offers a price before the customer agrees. A proforma invoice usually comes after agreement, setting out what will be billed, often to ask for an advance. Neither is a tax invoice.",
  },
  {
    q: "How do I turn an accepted quotation into an invoice?",
    a: "Here, open the free GST invoice generator and enter the same items. In Quantalog Invoicing, the customer accepts on a link and you convert the quotation into an invoice in one click, with every line copied.",
  },
  {
    q: "Where is my quotation stored?",
    a: "Only in this browser, so you can close the page and come back to it. Start blank clears it. Nothing is uploaded, which also means the draft will not appear on another device.",
  },
];
