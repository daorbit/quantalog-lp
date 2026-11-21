"use client";

import { FormField, fieldDescribedBy } from "../form-field";
import type { InvoiceDraft } from "@/lib/gst-invoice/types";
import { ToggleField } from "./toggle-field";
import { ToolSection } from "./tool-section";

const NUMBER_HINT = "Unique in the financial year, up to 16 characters.";
const NUMBER_PATTERN = /^[A-Za-z0-9/-]{1,16}$/;

export function DetailsFields({
  draft,
  onChange,
}: {
  draft: InvoiceDraft;
  onChange: (patch: Partial<InvoiceDraft>) => void;
}) {
  const numberError =
    draft.number && !NUMBER_PATTERN.test(draft.number)
      ? "Use up to 16 letters, numbers, dashes or slashes."
      : undefined;

  return (
    <ToolSection id="gst-details-heading" title="Invoice details">
      <FormField
        label="Invoice number"
        htmlFor="gst-number"
        error={numberError}
        hint={NUMBER_HINT}
        className="sm:col-span-2"
      >
        <input
          id="gst-number"
          className="q-input"
          value={draft.number}
          maxLength={16}
          spellCheck={false}
          aria-invalid={Boolean(numberError)}
          aria-describedby={fieldDescribedBy("gst-number", numberError, NUMBER_HINT)}
          onChange={(e) => onChange({ number: e.target.value.replace(/\s/g, "") })}
        />
      </FormField>

      <FormField label="Invoice date" htmlFor="gst-issue-date">
        <input
          id="gst-issue-date"
          type="date"
          className="q-input"
          value={draft.issueDate}
          onChange={(e) => onChange({ issueDate: e.target.value })}
        />
      </FormField>

      <FormField label="Due date" htmlFor="gst-due-date" optional>
        <input
          id="gst-due-date"
          type="date"
          className="q-input"
          value={draft.dueDate}
          min={draft.issueDate || undefined}
          onChange={(e) => onChange({ dueDate: e.target.value })}
        />
      </FormField>

      <ToggleField
        id="gst-includes-tax"
        label="Rates include GST"
        description="Turn this on when the rates you typed already have GST in them, and the tax is worked out backwards."
        checked={draft.pricesIncludeTax}
        onChange={(pricesIncludeTax) => onChange({ pricesIncludeTax })}
      />
      <ToggleField
        id="gst-round-off"
        label="Round the total to the nearest rupee"
        description="Adds a round-off line so the total has no paise."
        checked={draft.roundOff}
        onChange={(roundOff) => onChange({ roundOff })}
      />
      <ToggleField
        id="gst-reverse-charge"
        label="Tax payable on reverse charge"
        description="Only for supplies where your customer pays the GST to the government instead of you."
        checked={draft.reverseCharge}
        onChange={(reverseCharge) => onChange({ reverseCharge })}
      />
    </ToolSection>
  );
}
