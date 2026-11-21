export type InvoiceParty = {
  name: string;
  address: string;
  gstin: string;
  state: string;
};

export type InvoiceSeller = InvoiceParty & {
  contact: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  hsn: string;
  quantity: string;
  rate: string;
  taxRate: number;
};

export type InvoiceDraft = {
  seller: InvoiceSeller;
  buyer: InvoiceParty;
  number: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  pricesIncludeTax: boolean;
  roundOff: boolean;
  reverseCharge: boolean;
  upiId: string;
  bankDetails: string;
  notes: string;
};

export type TaxLine = {
  rate: number;
  taxable: number;
  tax: number;
};

export type InvoiceTotals = {
  subtotal: number;
  taxableAmount: number;
  taxAmount: number;
  roundOffAmount: number;
  total: number;
  taxLines: TaxLine[];
};
