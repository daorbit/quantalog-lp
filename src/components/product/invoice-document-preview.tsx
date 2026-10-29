import { Eye, Mail, QrCode } from "lucide-react";

const items = [
  { name: "Website redesign, 5 pages", code: "998314", qty: "1", rate: "40,000", amount: "40,000" },
  { name: "SEO audit and fixes", code: "998313", qty: "1", rate: "10,000", amount: "10,000" },
  { name: "Support retainer", code: "998316", qty: "4 Hrs", rate: "1,500", amount: "6,000" },
];

const totals = [
  { label: "Subtotal", value: "56,000" },
  { label: "Discount 5%", value: "−2,800" },
  { label: "CGST 9%", value: "4,788" },
  { label: "SGST 9%", value: "4,788" },
];

export function InvoiceDocumentPreview() {
  return (
    <div className="tile tile--static overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4 sm:px-8">
        <p className="text-[15px] font-semibold tracking-tight text-fg">INV-0042 · Acme Retail</p>
        <p className="flex items-center gap-4 text-[12px] text-fg-faint">
          <span className="inline-flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Emailed with PDF
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Viewed 3 times
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[17px] font-semibold tracking-tight text-fg">Northwind Studio</p>
              <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                14 MG Road, Bengaluru, Karnataka
                <br />
                GSTIN 29ABCDE1234F1Z5
              </p>
            </div>
            <div className="text-right">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">Tax invoice</p>
              <p className="mt-1 text-[13px] tabular-nums text-fg-muted">INV-0042 · Due in 15 days</p>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-[12px] font-medium text-fg-faint">Bill to</p>
            <p className="mt-1 text-[14px] font-medium text-fg">Acme Retail Pvt Ltd</p>
            <p className="text-[13px] text-fg-muted">Place of supply: Karnataka (29)</p>
          </div>

          <ul className="mt-6 divide-y divide-border border-y border-border text-[13px]">
            <li className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-2.5 text-[12px] font-medium text-fg-faint sm:grid-cols-[minmax(0,1fr)_5rem_4rem_5rem_5rem]">
              <span>Item</span>
              <span className="hidden sm:block">SAC</span>
              <span className="hidden text-right sm:block">Qty</span>
              <span className="hidden text-right sm:block">Rate</span>
              <span className="text-right">Amount</span>
            </li>
            {items.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-3 sm:grid-cols-[minmax(0,1fr)_5rem_4rem_5rem_5rem]"
              >
                <span className="truncate text-fg">{item.name}</span>
                <span className="hidden tabular-nums text-fg-muted sm:block">{item.code}</span>
                <span className="hidden text-right tabular-nums text-fg-muted sm:block">{item.qty}</span>
                <span className="hidden text-right tabular-nums text-fg-muted sm:block">{item.rate}</span>
                <span className="text-right tabular-nums text-fg">{item.amount}</span>
              </li>
            ))}
          </ul>

          <dl className="ml-auto mt-5 max-w-xs space-y-2 text-[13px]">
            {totals.map((t) => (
              <div key={t.label} className="flex justify-between gap-4">
                <dt className="text-fg-muted">{t.label}</dt>
                <dd className="tabular-nums text-fg">{t.value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-border pt-2 text-[14px] font-semibold">
              <dt className="text-fg">Total</dt>
              <dd className="tabular-nums text-fg">₹62,776</dd>
            </div>
          </dl>
          <p className="mt-4 text-right text-[12px] text-fg-faint">
            Rupees Sixty Two Thousand Seven Hundred Seventy Six Only
          </p>
        </div>

        <div className="flex flex-col border-t border-border p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="text-[12px] font-medium text-fg-faint">Amount due</p>
          <p className="mt-1 text-[2rem] font-semibold leading-none tracking-tight tabular-nums text-emerald-600 dark:text-emerald-400">
            ₹62,776
          </p>
          <p className="mt-2 text-[13px] text-fg-muted">Due 14 Nov</p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-[12px] font-medium text-fg-faint">Scan to pay</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl ring-1 ring-border">
                <QrCode className="h-14 w-14 text-fg" strokeWidth={1.25} aria-hidden="true" />
              </span>
              <p className="text-[13px] leading-relaxed text-fg-muted">
                Any UPI app, for the exact amount, with INV-0042 as the note.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 lg:mt-auto">
            <p className="text-[12px] font-medium text-fg-faint">Bank transfer</p>
            <p className="mt-1 text-[13px] text-fg-muted">HDFC Bank · IFSC HDFC0001234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
