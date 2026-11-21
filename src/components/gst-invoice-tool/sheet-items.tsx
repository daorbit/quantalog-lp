import { formatRupees } from "@/lib/gst-invoice/format";
import { rateLabel } from "@/lib/gst-invoice/gst";
import { lineAmount, toAmount } from "@/lib/gst-invoice/totals";
import type { InvoiceItem } from "@/lib/gst-invoice/types";

const CELL = "py-2.5 align-top";
const NUMBER_CELL = `${CELL} pl-3 text-right tabular-nums`;
const WIDE_ONLY = "hidden @md:table-cell";

export function SheetItems({ items }: { items: InvoiceItem[] }) {
  return (
    <table className="mt-8 w-full border-collapse text-left">
      <thead>
        <tr className="border-y border-border text-[11px] font-medium uppercase tracking-wide text-fg-faint">
          <th scope="col" className={`${CELL} w-7`}>#</th>
          <th scope="col" className={CELL}>Item</th>
          <th scope="col" className={NUMBER_CELL}>Qty</th>
          <th scope="col" className={`${NUMBER_CELL} ${WIDE_ONLY}`}>Rate</th>
          <th scope="col" className={`${NUMBER_CELL} ${WIDE_ONLY}`}>GST</th>
          <th scope="col" className={NUMBER_CELL}>Amount</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {items.map((item, i) => (
          <tr key={item.id} className="break-inside-avoid">
            <td className={`${CELL} text-fg-faint`}>{i + 1}</td>
            <td className={CELL}>
              <span className="block text-fg">{item.description || "Item"}</span>
              {item.hsn && <span className="block text-[11px] text-fg-faint">HSN/SAC {item.hsn}</span>}
            </td>
            <td className={NUMBER_CELL}>{toAmount(item.quantity)}</td>
            <td className={`${NUMBER_CELL} ${WIDE_ONLY}`}>{formatRupees(toAmount(item.rate))}</td>
            <td className={`${NUMBER_CELL} ${WIDE_ONLY}`}>{rateLabel(item.taxRate)}</td>
            <td className={`${NUMBER_CELL} text-fg`}>{formatRupees(lineAmount(item))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
