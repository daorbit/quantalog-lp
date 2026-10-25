import { Check, Minus } from "lucide-react";
import { site } from "@/lib/site";
import type { Ga4Cell, Ga4Row } from "./ga4-rows";

function Cell({ cell, label, ours }: { cell: Ga4Cell; label: string; ours?: boolean }) {
  const Icon = cell.good ? Check : Minus;
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        className={`mt-0.5 h-4 w-4 shrink-0 ${cell.good ? "text-accent" : "text-fg-faint"}`}
        aria-hidden="true"
      />
      <p className={`text-[15px] leading-snug ${ours ? "font-medium text-fg" : "text-fg-muted"}`}>
        <span className="mb-0.5 block text-[12px] font-medium text-fg-faint sm:sr-only">{label}</span>
        {cell.text}
      </p>
    </div>
  );
}

export function Ga4RowItem({ row, rival }: { row: Ga4Row; rival: string }) {
  return (
    <li className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-start">
      <p className="col-span-2 text-[15px] font-semibold tracking-tight text-fg sm:col-span-1">{row.point}</p>
      <Cell cell={row.ours} label={site.name} ours />
      <Cell cell={row.theirs} label={rival} />
    </li>
  );
}
