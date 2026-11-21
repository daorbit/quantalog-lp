export type DocumentKind = "invoice" | "quotation";

export type DocumentKindConfig = {
  kind: DocumentKind;
  storageKey: string;
  numberPrefix: string;
  numberLabel: string;
  numberHint: string;
  dateLabel: string;
  endLabel: string;
  sheetEndLabel: string;
  endDays: number;
  showReverseCharge: boolean;
  showUpi: boolean;
  extrasTitle: string;
  notesLabel: string;
  sheetNotesLabel: string;
  sampleNotes: string;
  acceptanceBlock: boolean;
  registeredHeading: string;
  unregisteredHeading: string;
  fileFallback: string;
  downloadEvent: string;
  actionsPrompt: string;
  actionsLocation: string;
};

export const DOCUMENT_KINDS: Record<DocumentKind, DocumentKindConfig> = {
  invoice: {
    kind: "invoice",
    storageKey: "quantalog:gst-invoice-draft:v1",
    numberPrefix: "INV-0001",
    numberLabel: "Invoice number",
    numberHint: "Unique in the financial year, up to 16 characters.",
    dateLabel: "Invoice date",
    endLabel: "Due date",
    sheetEndLabel: "Due",
    endDays: 15,
    showReverseCharge: true,
    showUpi: true,
    extrasTitle: "Payment and notes",
    notesLabel: "Notes or terms",
    sheetNotesLabel: "Notes",
    sampleNotes: "Thank you for your business.",
    acceptanceBlock: false,
    registeredHeading: "Tax invoice",
    unregisteredHeading: "Invoice",
    fileFallback: "GST invoice",
    downloadEvent: "gst_invoice_download",
    actionsPrompt: "Need numbering that keeps count, saved customers and share links?",
    actionsLocation: "gst_tool_actions",
  },
  quotation: {
    kind: "quotation",
    storageKey: "quantalog:quotation-draft:v1",
    numberPrefix: "QUO-0001",
    numberLabel: "Quotation number",
    numberHint: "Your own series, up to 16 characters.",
    dateLabel: "Quotation date",
    endLabel: "Valid until",
    sheetEndLabel: "Valid until",
    endDays: 30,
    showReverseCharge: false,
    showUpi: false,
    extrasTitle: "Terms and bank details",
    notesLabel: "Terms and conditions",
    sheetNotesLabel: "Terms",
    sampleNotes: "Prices hold until the date above. 50% in advance to start, and the rest on delivery.",
    acceptanceBlock: true,
    registeredHeading: "Quotation",
    unregisteredHeading: "Quotation",
    fileFallback: "Quotation",
    downloadEvent: "quotation_download",
    actionsPrompt: "Want the customer to accept it online, then turn it into an invoice in one click?",
    actionsLocation: "quotation_tool_actions",
  },
};
