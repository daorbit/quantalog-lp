import { formatDay } from "@/lib/gst-invoice/format";
import { isValidGstin, stateLabel, type SupplyStates } from "@/lib/gst-invoice/gst";
import { lineAmount } from "@/lib/gst-invoice/totals";
import type { InvoiceDraft, InvoiceParty, InvoiceTotals } from "@/lib/gst-invoice/types";
import { SheetItems } from "./sheet-items";
import { SheetPayment } from "./sheet-payment";
import { SheetTotals } from "./sheet-totals";

const LABEL = "text-[11px] font-medium uppercase tracking-wide text-fg-faint";

function PartyBlock({
  party,
  fallback,
  contact,
  nameClassName = "text-[15px]",
}: {
  party: InvoiceParty;
  fallback: string;
  contact?: string;
  nameClassName?: string;
}) {
  return (
    <>
      <p className={`${nameClassName} font-semibold tracking-tight text-fg`}>{party.name || fallback}</p>
      {party.address && <p className="mt-1 whitespace-pre-line text-fg-muted">{party.address}</p>}
      {party.gstin && <p className="text-fg-muted">GSTIN {party.gstin}</p>}
      {contact && <p className="text-fg-muted">{contact}</p>}
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <p className="tabular-nums text-fg-muted">
      {label} <span className="text-fg">{value}</span>
    </p>
  );
}

export function InvoiceSheet({
  draft,
  totals,
  supply,
  qrSrc,
}: {
  draft: InvoiceDraft;
  totals: InvoiceTotals;
  supply: SupplyStates;
  qrSrc: string | null;
}) {
  const items = draft.items.filter((item) => item.description.trim() || lineAmount(item) > 0);
  const heading = isValidGstin(draft.seller.gstin) ? "Tax invoice" : "Invoice";

  return (
    <article className="invoice-sheet rounded-[var(--radius-card)] border border-border text-[13px] leading-relaxed">
      <div className="invoice-sheet__page p-6 @lg:p-10">
        <header className="flex flex-col-reverse gap-6 @md:flex-row @md:items-start @md:justify-between">
          <div className="min-w-0">
            <PartyBlock
              party={draft.seller}
              fallback="Your business"
              contact={draft.seller.contact}
              nameClassName="text-[19px]"
            />
          </div>
          <div className="@md:text-right">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">{heading}</p>
            <p className="mt-1 text-[15px] font-semibold tabular-nums text-fg">{draft.number}</p>
            <MetaRow label="Date" value={formatDay(draft.issueDate)} />
            <MetaRow label="Due" value={formatDay(draft.dueDate)} />
          </div>
        </header>

        <div className="mt-8 grid gap-6 border-t border-border pt-6 @md:grid-cols-2">
          <div>
            <p className={LABEL}>Bill to</p>
            <div className="mt-1.5">
              <PartyBlock party={draft.buyer} fallback="Customer name" />
            </div>
          </div>
          <div className="@md:text-right">
            <p className={LABEL}>Place of supply</p>
            <p className="mt-1.5 text-fg">{stateLabel(supply.placeOfSupply) || "Not set"}</p>
            <p className="mt-3 text-fg-muted">Tax payable on reverse charge: {draft.reverseCharge ? "Yes" : "No"}</p>
          </div>
        </div>

        <SheetItems items={items} />
        <SheetTotals totals={totals} interState={supply.interState} />
        <SheetPayment
          qrSrc={qrSrc}
          upiId={draft.upiId}
          total={totals.total}
          bankDetails={draft.bankDetails}
          notes={draft.notes}
        />

        <footer className="mt-12 flex justify-end break-inside-avoid">
          <div className="text-right">
            <p className="text-fg">For {draft.seller.name || "your business"}</p>
            <p className="mt-10 border-t border-border pt-1.5 text-[11px] text-fg-faint">Authorised signatory</p>
          </div>
        </footer>
      </div>
    </article>
  );
}
