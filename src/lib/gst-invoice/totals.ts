import { rateLabel } from "./gst";
import type { InvoiceDraft, InvoiceItem, InvoiceTotals, TaxLine } from "./types";

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function toAmount(value: string): number {
  const n = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function lineAmount(item: Pick<InvoiceItem, "quantity" | "rate">): number {
  return round2(toAmount(item.quantity) * toAmount(item.rate));
}

export function computeTotals(draft: Pick<InvoiceDraft, "items" | "pricesIncludeTax" | "roundOff">): InvoiceTotals {
  const byRate = new Map<number, { taxable: number; tax: number }>();
  let subtotal = 0;
  let taxable = 0;
  let tax = 0;

  for (const item of draft.items) {
    const amount = lineAmount(item);
    const rate = item.taxRate;
    const lineTaxable = draft.pricesIncludeTax ? amount / (1 + rate / 100) : amount;
    const lineTax = draft.pricesIncludeTax ? amount - lineTaxable : (lineTaxable * rate) / 100;
    const bucket = byRate.get(rate) ?? { taxable: 0, tax: 0 };
    bucket.taxable += lineTaxable;
    bucket.tax += lineTax;
    byRate.set(rate, bucket);
    subtotal += amount;
    taxable += lineTaxable;
    tax += lineTax;
  }

  const taxableAmount = round2(taxable);
  const taxAmount = round2(tax);
  const beforeRounding = taxableAmount + taxAmount;
  const roundOffAmount = draft.roundOff ? round2(Math.round(beforeRounding) - beforeRounding) : 0;

  return {
    subtotal: round2(subtotal),
    taxableAmount,
    taxAmount,
    roundOffAmount,
    total: round2(beforeRounding + roundOffAmount),
    taxLines: [...byRate.entries()]
      .filter(([, bucket]) => bucket.taxable !== 0 || bucket.tax !== 0)
      .sort(([a], [b]) => a - b)
      .map(([rate, bucket]): TaxLine => ({ rate, taxable: round2(bucket.taxable), tax: round2(bucket.tax) })),
  };
}

export type TaxRow = { label: string; amount: number };

export function taxRows(totals: InvoiceTotals, interState: boolean): TaxRow[] {
  return totals.taxLines
    .filter((line) => line.tax > 0)
    .flatMap((line): TaxRow[] => {
      if (interState) return [{ label: `IGST ${rateLabel(line.rate)}`, amount: line.tax }];
      const cgst = round2(line.tax / 2);
      return [
        { label: `CGST ${rateLabel(line.rate / 2)}`, amount: cgst },
        { label: `SGST ${rateLabel(line.rate / 2)}`, amount: round2(line.tax - cgst) },
      ];
    });
}
