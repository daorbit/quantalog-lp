import { siZoho } from "simple-icons";
import type { ComparisonEntry, ComparisonRow } from "./types";

const CHECKED_ON = "November 2026";

const GST_ROW: ComparisonRow = {
  point: "GST invoices",
  ours: "CGST, SGST or IGST worked out from the place of supply, HSN/SAC codes on each line, reverse charge and export under LUT, with the amount in words in lakh and crore.",
  theirs: "",
  verdict: "both",
};

const LEADS_ROW: ComparisonRow = {
  point: "From lead to invoice",
  ours: "Form leads, bookings and paid responses sit in the same workspace, and a paid form response can create its own GST invoice.",
  theirs: "",
  verdict: "quantalog",
};

const ANALYTICS_ROW: ComparisonRow = {
  point: "Which channel brought the customer",
  ours: "Cookieless website analytics in the same login, so a paid invoice can be traced back to the visit and the form that started it.",
  theirs: "",
  verdict: "quantalog",
};

const withTheirs = (row: ComparisonRow, theirs: string, verdict = row.verdict): ComparisonRow => ({
  ...row,
  theirs,
  verdict,
});

export const INVOICING_COMPARISONS: ComparisonEntry[] = [
  {
    slug: "zoho-invoice-alternative",
    rival: "Zoho Invoice",
    logo: siZoho,
    title: "Quantalog vs Zoho Invoice",
    description:
      "A Zoho Invoice alternative for Indian businesses that win customers online: quotations, GST invoices with a UPI QR and trackable share links, connected to the forms and website traffic that produced each customer.",
    intro:
      "Zoho Invoice is free, mature and part of a large suite of business apps. Quantalog Invoicing is newer and smaller. It makes sense when your invoices start with a lead from your own website or form, and you want the visit, the lead, the quote and the paid invoice in one place.",
    whenTheirs:
      "Stay with Zoho Invoice if you need recurring invoices, credit notes, online payment links, time and expense tracking, a client portal or mobile apps, or you plan to move to Zoho Books for accounting. Quantalog Invoicing does not do those yet.",
    checkedOn: CHECKED_ON,
    rows: [
      withTheirs(GST_ROW, "GST invoices with HSN/SAC codes and the tax split."),
      {
        point: "Quotations to invoices",
        ours: "A quotation converts to an invoice in one step, and the client can accept or decline it from the share link.",
        theirs: "Estimates convert to invoices, and clients can accept them online.",
        verdict: "both",
      },
      {
        point: "Getting paid",
        ours: "Your UPI ID becomes a QR code on the invoice, next to your bank details. Online payment links are not offered yet.",
        theirs: "Online payments through connected payment gateways.",
        verdict: "rival",
      },
      {
        point: "Recurring invoices and credit notes",
        ours: "Not offered yet.",
        theirs: "Included.",
        verdict: "rival",
      },
      {
        point: "E-invoicing (IRN) and e-way bills",
        ours: "Not offered yet.",
        theirs: "Available across Zoho's GST products, depending on plan. Check Zoho's India pricing page for which one you need.",
        verdict: "rival",
      },
      withTheirs(LEADS_ROW, "Invoicing only. Leads live in Zoho CRM or Bigin, which are separate products."),
      withTheirs(ANALYTICS_ROW, "Not part of Zoho Invoice."),
      {
        point: "Share links",
        ours: "Every document can have a public link that counts its views, and can be emailed now or scheduled for later.",
        theirs: "Invoices can be shared by email and through the client portal.",
        verdict: "both",
      },
      {
        point: "Templates",
        ours: "15 templates with your logo and accent colour.",
        theirs: "A range of customisable templates.",
        verdict: "both",
      },
      {
        point: "Mobile apps",
        ours: "Works in the browser on phones and computers. No native app.",
        theirs: "iOS and Android apps.",
        verdict: "rival",
      },
      {
        point: "Price",
        ours: "Invoicing is a free Quantalog app.",
        theirs: "Free, with usage limits that Zoho updates each year.",
        verdict: "both",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog Invoicing GST compliant?",
        a: "It produces GST tax invoices with your GSTIN, HSN/SAC codes, CGST and SGST or IGST from the place of supply, reverse charge and export under LUT. It does not generate e-invoices (IRN) or e-way bills yet, so businesses that must issue those should keep a tool that does.",
      },
      {
        q: "Can I use Quantalog Invoicing instead of Zoho Books?",
        a: "No. Quantalog Invoicing is not accounting software: there are no expenses, ledgers, bank feeds or GST return filing. It covers quotations, invoices, customers, items and sales, receivables and GST reports.",
      },
      {
        q: "What does Quantalog do that Zoho Invoice does not?",
        a: "It connects invoices to how the customer arrived. The website analytics, the lead form, the booking and the invoice sit in one workspace, and a paid form response can create its own invoice.",
      },
    ],
  },
  {
    slug: "vyapar-alternative",
    rival: "Vyapar",
    title: "Quantalog vs Vyapar",
    description:
      "A Vyapar alternative for service businesses, agencies and freelancers who send quotations and GST invoices online, and want them tied to their leads, bookings and website traffic.",
    intro:
      "Vyapar is billing and inventory software built for Indian shops and traders, with desktop and mobile apps that work offline. Quantalog Invoicing is for a different kind of business: one that finds customers online and bills for services.",
    whenTheirs:
      "Stay with Vyapar if you run a shop or trading business that needs stock tracking, counter billing, e-way bills, offline billing or a desktop app. Quantalog Invoicing has no inventory and does not work offline.",
    checkedOn: CHECKED_ON,
    rows: [
      {
        point: "Inventory and stock",
        ours: "Not offered. Saved items keep a name, rate, unit and HSN/SAC code, without stock levels.",
        theirs: "Inventory and stock tracking are a core part of the product.",
        verdict: "rival",
      },
      {
        point: "Offline and desktop billing",
        ours: "Browser only, and it needs an internet connection.",
        theirs: "Desktop and mobile apps that work offline.",
        verdict: "rival",
      },
      {
        point: "E-way bills",
        ours: "Not offered yet.",
        theirs: "Generated from the app, with limits that depend on the plan.",
        verdict: "rival",
      },
      withTheirs(GST_ROW, "GST invoices with the tax split and HSN codes."),
      {
        point: "Quotations clients can answer online",
        ours: "Share a link, see when it was viewed, and let the client accept or decline the quotation there.",
        theirs: "Estimates are shared as documents, for example over WhatsApp or email.",
        verdict: "quantalog",
      },
      withTheirs(LEADS_ROW, "Not part of the product. Vyapar starts at the bill."),
      withTheirs(ANALYTICS_ROW, "Business reports on sales and stock, but no website analytics."),
      {
        point: "Price",
        ours: "Invoicing is a free Quantalog app, and the Free plan needs no card.",
        theirs: "Basic mobile billing is free. The desktop app and premium features are yearly plans.",
        verdict: "both",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog a replacement for Vyapar?",
        a: "Only for businesses that bill for services and do not need stock. Shops and traders that rely on inventory, counter billing, e-way bills or offline use should stay with Vyapar.",
      },
      {
        q: "Does Quantalog Invoicing work on a phone?",
        a: "Yes, in the phone's browser. There is no native app, and it needs an internet connection.",
      },
      {
        q: "Can I put a UPI QR code on my invoice?",
        a: "Yes. Add your UPI ID to the business details and every invoice prints a UPI QR code next to your bank details, so the client can pay by scanning it.",
      },
    ],
  },
];
