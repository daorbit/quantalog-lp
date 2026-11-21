"use client";

import { FormField, fieldDescribedBy } from "../form-field";
import type { DocumentKindConfig } from "@/lib/gst-invoice/document-kinds";
import { UPI_ID_PATTERN } from "@/lib/gst-invoice/upi";
import type { InvoiceDraft } from "@/lib/gst-invoice/types";
import { ToolSection } from "./tool-section";

const UPI_HINT = "Adds a QR code for the exact total that any UPI app can scan.";

export function PaymentFields({
  config,
  draft,
  onChange,
}: {
  config: DocumentKindConfig;
  draft: InvoiceDraft;
  onChange: (patch: Partial<InvoiceDraft>) => void;
}) {
  const upiError = draft.upiId && !UPI_ID_PATTERN.test(draft.upiId) ? "Check the UPI ID, like name@okbank." : undefined;

  return (
    <ToolSection id="gst-payment-heading" title={config.extrasTitle}>
      {config.showUpi && (
        <FormField label="UPI ID" htmlFor="gst-upi" optional error={upiError} hint={UPI_HINT} className="sm:col-span-2">
          <input
            id="gst-upi"
            className="q-input"
            value={draft.upiId}
            placeholder="yourname@okbank"
            spellCheck={false}
            autoCapitalize="off"
            aria-invalid={Boolean(upiError)}
            aria-describedby={fieldDescribedBy("gst-upi", upiError, UPI_HINT)}
            onChange={(e) => onChange({ upiId: e.target.value.trim() })}
          />
        </FormField>
      )}

      <FormField label={config.notesLabel} htmlFor="gst-notes" optional className="sm:col-span-2">
        <textarea
          id="gst-notes"
          className="q-input resize-y"
          rows={3}
          value={draft.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
        />
      </FormField>

      <FormField label="Bank details" htmlFor="gst-bank" optional className="sm:col-span-2">
        <textarea
          id="gst-bank"
          className="q-input resize-y"
          rows={3}
          value={draft.bankDetails}
          placeholder={"Bank name\nAccount number\nIFSC"}
          onChange={(e) => onChange({ bankDetails: e.target.value })}
        />
      </FormField>
    </ToolSection>
  );
}
