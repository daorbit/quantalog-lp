"use client";

import { useMemo } from "react";
import { supplyStates } from "@/lib/gst-invoice/gst";
import { computeTotals } from "@/lib/gst-invoice/totals";
import { track } from "@/lib/track";
import { DetailsFields } from "./details-fields";
import { InvoiceSheet } from "./invoice-sheet";
import { ItemsSection } from "./items-section";
import { PartyFields } from "./party-fields";
import { PaymentFields } from "./payment-fields";
import { printInvoice } from "./print-invoice";
import { PrintPortal } from "./print-portal";
import { ToolActions } from "./tool-actions";
import { useInvoiceDraft } from "./use-invoice-draft";
import { useUpiQr } from "./use-upi-qr";

export function GstInvoiceTool() {
  const { draft, update, updateSeller, updateBuyer, updateItem, addItem, removeItem, startBlank } =
    useInvoiceDraft();
  const totals = useMemo(() => computeTotals(draft), [draft]);
  const supply = useMemo(() => supplyStates(draft), [draft]);
  const qrSrc = useUpiQr({
    upiId: draft.upiId,
    payee: draft.seller.name || "Payee",
    amount: totals.total,
    note: draft.number,
  });

  function download() {
    track("gst_invoice_download", {
      items: draft.items.length,
      interState: supply.interState,
      upi: Boolean(qrSrc),
    });
    printInvoice([draft.number, draft.buyer.name].filter(Boolean).join(" ") || "GST invoice");
  }

  const sheet = <InvoiceSheet draft={draft} totals={totals} supply={supply} qrSrc={qrSrc} />;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
      <div>
        <PartyFields
          idPrefix="gst-seller"
          title="Your business"
          description="Only GST-registered businesses can charge GST. Without a GSTIN, set each item to 0%."
          nameLabel="Business name"
          party={draft.seller}
          contact={draft.seller.contact}
          onChange={updateSeller}
        />
        <PartyFields
          idPrefix="gst-buyer"
          title="Your customer"
          description="Their state sets the place of supply, which decides CGST and SGST or IGST."
          nameLabel="Customer name"
          party={draft.buyer}
          onChange={updateBuyer}
        />
        <DetailsFields draft={draft} onChange={update} />
        <ItemsSection items={draft.items} onChange={updateItem} onAdd={addItem} onRemove={removeItem} />
        <PaymentFields draft={draft} onChange={update} />
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <ToolActions onDownload={download} onStartBlank={startBlank} />
        <div className="mt-5 lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto">{sheet}</div>
      </div>

      <PrintPortal>{sheet}</PrintPortal>
    </div>
  );
}
