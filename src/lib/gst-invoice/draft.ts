import { addDays, isoDay } from "./format";
import type { InvoiceDraft, InvoiceItem } from "./types";

export const DEFAULT_TAX_RATE = 18;
export const DEFAULT_PAYMENT_DAYS = 15;

let itemCounter = 0;

export function newItem(patch: Partial<InvoiceItem> = {}): InvoiceItem {
  itemCounter += 1;
  return {
    id: `item-${Date.now().toString(36)}-${itemCounter}`,
    description: "",
    hsn: "",
    quantity: "1",
    rate: "",
    taxRate: DEFAULT_TAX_RATE,
    ...patch,
  };
}

const EMPTY_PARTY = { name: "", address: "", gstin: "", state: "" };

export function blankDraft(): InvoiceDraft {
  return {
    seller: { ...EMPTY_PARTY, contact: "" },
    buyer: { ...EMPTY_PARTY },
    number: "INV-0001",
    issueDate: "",
    dueDate: "",
    items: [newItem()],
    pricesIncludeTax: false,
    roundOff: true,
    reverseCharge: false,
    upiId: "",
    bankDetails: "",
    notes: "",
  };
}

export function sampleDraft(): InvoiceDraft {
  return {
    seller: {
      name: "Northwind Studio",
      address: "14 MG Road, Bengaluru 560001",
      gstin: "29ABCDE1234F1Z5",
      state: "",
      contact: "billing@northwind.example",
    },
    buyer: {
      name: "Acme Retail Pvt Ltd",
      address: "Andheri East, Mumbai 400069",
      gstin: "27AAACA1234B1Z2",
      state: "",
    },
    number: "INV-0001",
    issueDate: "",
    dueDate: "",
    items: [
      { id: "sample-1", description: "Website redesign, 5 pages", hsn: "998314", quantity: "1", rate: "40000", taxRate: 18 },
      { id: "sample-2", description: "Support retainer, hours", hsn: "998316", quantity: "4", rate: "1500", taxRate: 18 },
    ],
    pricesIncludeTax: false,
    roundOff: true,
    reverseCharge: false,
    upiId: "",
    bankDetails: "",
    notes: "Thank you for your business.",
  };
}

export function withDates(draft: InvoiceDraft, today: Date): InvoiceDraft {
  if (draft.issueDate) return draft;
  const issueDate = isoDay(today);
  return { ...draft, issueDate, dueDate: draft.dueDate || addDays(issueDate, DEFAULT_PAYMENT_DAYS) };
}
