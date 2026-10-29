import { CLIENT, INVOICE_NUMBER, ITEMS, QUOTE_NUMBER, SELLER, TOTAL, TOTALS } from "./invoice-data";
import type { InvoiceStage } from "./use-invoice-demo";

const STATUS: Record<InvoiceStage, { label: string; paid?: boolean }> = {
  0: { label: "Sent" },
  1: { label: "Accepted" },
  2: { label: "Sent" },
  3: { label: "Paid", paid: true },
};

export function InvoiceDocument({ stage }: { stage: InvoiceStage }) {
  const isInvoice = stage >= 2;
  const status = STATUS[stage];

  return (
    <div key={isInvoice ? "invoice" : "quote"} className="inv-swap relative p-6 sm:p-8">
      {status.paid && <span className="inv-stamp">Paid</span>}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[16px] font-semibold tracking-tight text-fg">{SELLER.name}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-fg-muted">
            {SELLER.address}
            <br />
            GSTIN {SELLER.gstin}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-accent">
            {isInvoice ? "Tax invoice" : "Quotation"}
          </p>
          <p className="mt-1 flex items-center justify-end gap-2 text-[12.5px] tabular-nums text-fg-muted">
            {isInvoice ? INVOICE_NUMBER : QUOTE_NUMBER}
            <span
              key={status.label}
              className={`inv-swap rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                status.paid ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400" : "bg-accent/10 text-accent"
              }`}
            >
              {status.label}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[11.5px] font-medium text-fg-faint">{isInvoice ? "Bill to" : "Quote for"}</p>
        <p className="mt-0.5 text-[13.5px] font-medium text-fg">{CLIENT.company}</p>
      </div>

      <ul className="mt-5 divide-y divide-border border-y border-border text-[13px]">
        {ITEMS.map((item) => (
          <li key={item.name} className="flex items-center justify-between gap-4 py-2.5">
            <span className="min-w-0">
              <span className="block truncate text-fg">{item.name}</span>
              <span className="text-[11.5px] tabular-nums text-fg-faint">SAC {item.code}</span>
            </span>
            <span className="shrink-0 tabular-nums text-fg">{item.amount}</span>
          </li>
        ))}
      </ul>

      <dl className="ml-auto mt-4 max-w-[16rem] space-y-1.5 text-[12.5px]">
        {TOTALS.map((t) => (
          <div key={t.label} className="flex justify-between gap-4">
            <dt className="text-fg-muted">{t.label}</dt>
            <dd className="tabular-nums text-fg">{t.value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 border-t border-border pt-2 text-[14px] font-semibold">
          <dt className="text-fg">{isInvoice ? "Total" : "Quote total"}</dt>
          <dd className="tabular-nums text-fg">{TOTAL}</dd>
        </div>
      </dl>
    </div>
  );
}
