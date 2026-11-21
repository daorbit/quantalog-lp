import { rupeesInWords } from "@/lib/gst-invoice/amount-in-words";
import { formatRupees } from "@/lib/gst-invoice/format";
import { taxRows } from "@/lib/gst-invoice/totals";
import type { InvoiceTotals } from "@/lib/gst-invoice/types";

function SheetRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="tabular-nums text-fg">{value}</dd>
    </div>
  );
}

export function SheetTotals({ totals, interState }: { totals: InvoiceTotals; interState: boolean }) {
  const roundOff = totals.roundOffAmount;

  return (
    <div className="mt-6 flex flex-col items-end break-inside-avoid">
      <dl className="w-full max-w-72 space-y-1.5">
        <SheetRow label="Taxable value" value={formatRupees(totals.taxableAmount)} />
        {taxRows(totals, interState).map((row) => (
          <SheetRow key={row.label} label={row.label} value={formatRupees(row.amount)} />
        ))}
        {roundOff !== 0 && (
          <SheetRow label="Round off" value={`${roundOff > 0 ? "+" : "−"}${formatRupees(Math.abs(roundOff))}`} />
        )}
        <div className="flex justify-between gap-6 border-t border-border pt-2 text-[15px] font-semibold">
          <dt className="text-fg">Total</dt>
          <dd className="tabular-nums text-fg">{formatRupees(totals.total)}</dd>
        </div>
      </dl>
      <p className="mt-2 max-w-sm text-right text-[11px] text-fg-faint">{rupeesInWords(totals.total)}</p>
    </div>
  );
}
