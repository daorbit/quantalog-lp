"use client";

import { Trash2 } from "lucide-react";
import { FormField } from "../form-field";
import { SelectField } from "../select-field";
import { GST_RATES, rateLabel } from "@/lib/gst-invoice/gst";
import { formatRupees } from "@/lib/gst-invoice/format";
import { lineAmount } from "@/lib/gst-invoice/totals";
import type { InvoiceItem } from "@/lib/gst-invoice/types";

const RATE_OPTIONS = GST_RATES.map((rate) => ({ value: String(rate), label: rateLabel(rate) }));

export function ItemFields({
  item,
  position,
  removable,
  onChange,
  onRemove,
}: {
  item: InvoiceItem;
  position: number;
  removable: boolean;
  onChange: (patch: Partial<InvoiceItem>) => void;
  onRemove: () => void;
}) {
  const id = (field: string) => `${item.id}-${field}`;

  return (
    <li className="border-t border-border py-5 first:border-t-0 first:pt-0">
      <div className="flex items-end gap-3">
        <FormField label={`Item ${position}`} htmlFor={id("description")} className="min-w-0 flex-1">
          <input
            id={id("description")}
            className="q-input"
            value={item.description}
            placeholder="What you sold or did"
            onChange={(e) => onChange({ description: e.target.value })}
          />
        </FormField>
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove item ${position}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <FormField label="HSN or SAC" htmlFor={id("hsn")}>
          <input
            id={id("hsn")}
            className="q-input tabular-nums"
            value={item.hsn}
            inputMode="numeric"
            maxLength={8}
            onChange={(e) => onChange({ hsn: e.target.value.replace(/\D/g, "") })}
          />
        </FormField>
        <FormField label="Quantity" htmlFor={id("quantity")}>
          <input
            id={id("quantity")}
            className="q-input tabular-nums"
            value={item.quantity}
            inputMode="decimal"
            onChange={(e) => onChange({ quantity: e.target.value })}
          />
        </FormField>
        <FormField label="Rate (₹)" htmlFor={id("rate")}>
          <input
            id={id("rate")}
            className="q-input tabular-nums"
            value={item.rate}
            inputMode="decimal"
            placeholder="0"
            onChange={(e) => onChange({ rate: e.target.value })}
          />
        </FormField>
        <FormField label="GST rate" htmlFor={id("tax")}>
          <SelectField
            id={id("tax")}
            options={RATE_OPTIONS}
            value={String(item.taxRate)}
            onChange={(value) => onChange({ taxRate: Number(value) })}
          />
        </FormField>
      </div>

      <p className="mt-2 text-right text-[13px] tabular-nums text-fg-muted">
        Amount {formatRupees(lineAmount(item))}
      </p>
    </li>
  );
}
