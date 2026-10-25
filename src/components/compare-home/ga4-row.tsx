import { Check, Minus } from "lucide-react";
import type { Ga4Cell, Ga4Row } from "./ga4-rows";

export const GA4_GRID =
  "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-3 sm:gap-x-6";

function Cell({ cell, label, ours }: { cell: Ga4Cell; label: string; ours?: boolean }) {
  const Icon = cell.good ? Check : Minus;
  return (
    <div className="flex items-start gap-1.5 sm:gap-2.5">
      <Icon
        className={`mt-0.5 h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${cell.good ? "text-accent" : "text-fg-faint"}`}
        aria-hidden="true"
      />
      <p className={`text-[13px] leading-snug sm:text-[15px] ${ours ? "font-medium text-fg" : "text-fg-muted"}`}>
        <span className="sr-only">{label}: </span>
        {cell.text}
      </p>
    </div>
  );
}

export function Ga4RowItem({ row, ours, rival }: { row: Ga4Row; ours: string; rival: string }) {
  return (
    <li className={`${GA4_GRID} items-start py-4 sm:py-5`}>
      <p className="text-[13px] font-semibold leading-snug tracking-tight text-fg sm:text-[15px]">{row.point}</p>
      <Cell cell={row.ours} label={ours} ours />
      <Cell cell={row.theirs} label={rival} />
    </li>
  );
}
