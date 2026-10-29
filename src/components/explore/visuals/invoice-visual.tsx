"use client";

import { Receipt } from "lucide-react";
import { useCycle } from "../../use-cycle";
import { useCountTo } from "../../use-count-to";
import { VisualPill } from "./visual-pill";

const stages = [
  { pill: "Quotation accepted on the link", number: "QUO-0018", status: "Accepted", paid: false },
  { pill: "Converted and emailed", number: "INV-0042", status: "Sent", paid: false },
  { pill: "Paid by UPI", number: "INV-0042", status: "Paid", paid: true },
];

const lines = [
  { label: "Website redesign", amount: "40,000" },
  { label: "SEO audit", amount: "10,000" },
  { label: "CGST 9% + SGST 9%", amount: "9,000" },
];

const TOTAL = 59000;

export function InvoiceVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(stages.length, 2600);
  const stage = stages[index];
  const total = useCountTo(inView ? TOTAL : 0, 1300);

  return (
    <div ref={ref} className="flex w-full max-w-xs flex-col items-center gap-4">
      <VisualPill swapKey={stage.pill}>{stage.pill}</VisualPill>
      <div className="w-full rounded-2xl bg-surface p-4 text-left shadow-soft ring-1 ring-border dark:bg-bg-subtle">
        <div className="flex items-center justify-between gap-2">
          <p className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-fg">
            <Receipt className="h-4 w-4 shrink-0 text-accent" />
            <span className="truncate">{stage.number} · Acme Retail</span>
          </p>
          <span
            key={stage.status}
            className={`chat-in shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              stage.paid
                ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                : "bg-accent/10 text-accent"
            }`}
          >
            {stage.status}
          </span>
        </div>
        <ul className="stagger-in mt-3 space-y-2" data-active={inView || undefined}>
          {lines.map((line) => (
            <li key={line.label} className="flex items-center justify-between text-[13px]">
              <span className="text-fg-muted">{line.label}</span>
              <span className="tabular-nums text-fg">₹{line.amount}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-baseline justify-between border-t border-border pt-3">
          <span className="text-[12px] text-fg-faint">{stage.paid ? "Collected" : "Amount due"}</span>
          <span className="text-[18px] font-semibold tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </p>
      </div>
    </div>
  );
}
