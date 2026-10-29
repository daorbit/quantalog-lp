import Link from "next/link";
import { ArrowRight, BarChart3, FileText, QrCode, Receipt } from "lucide-react";
import { site } from "@/lib/site";
import { Button, SectionHeading } from "../ui";
import { InvoiceShowcase } from "../invoice-showcase/invoice-showcase";

const FEATURES = [
  { icon: FileText, title: "Quote to invoice", body: "An accepted quotation becomes an invoice in one click." },
  { icon: Receipt, title: "GST-ready", body: "HSN and SAC codes, CGST and SGST or IGST, worked out per line." },
  { icon: QrCode, title: "UPI QR on every bill", body: "Rupee invoices carry a scan-to-pay code for the amount due." },
  { icon: BarChart3, title: "Know who owes you", body: "Receivables by how late they are, and a GSTR-1 style export." },
];

export function Invoicing() {
  return (
    <section id="invoicing" className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6">
        <SectionHeading
          eyebrow="Invoicing"
          title="Turn the lead into a paid invoice."
          body="Send a quotation to the people your forms bring in. They accept it on a link, it becomes an invoice in one click, and they pay by UPI."
          centered
        />
        <div className="mt-8 flex justify-center gap-2 sm:gap-3">
          <Button
            href={`${site.app}/signup`}
            size="lg"
            className="max-sm:px-4"
            track="cta_start_free"
            trackProps={{ location: "invoicing" }}
          >
            Send an invoice
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/invoicing" variant="secondary" size="lg" className="max-sm:px-4">
            How it works
          </Button>
        </div>

        <div className="mt-14 sm:mt-20">
          <InvoiceShowcase />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-border pt-8 sm:mt-16 sm:gap-8 sm:pt-10 lg:grid-cols-4 lg:gap-0">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bm-spec">
              <span className="bm-spec-icon">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 text-[14px] font-semibold tracking-[-0.01em] sm:mt-4 sm:text-[15px]">{title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-fg-muted sm:mt-1.5 sm:text-[14px]">{body}</p>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-[13px] leading-relaxed text-fg-faint">
          Invoicing is a free Quantalog app in every workspace. The money goes straight to your bank or UPI
          account; {site.name} never handles it.{" "}
          <Link href="/docs/quantalog-invoicing" className="underline underline-offset-2 hover:text-fg">
            Read the invoicing docs
          </Link>
        </p>
      </div>
    </section>
  );
}
