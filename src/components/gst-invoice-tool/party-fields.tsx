"use client";

import { FormField, fieldDescribedBy } from "../form-field";
import { SelectField } from "../select-field";
import { GST_STATES, isValidGstin, stateLabel, stateOfGstin } from "@/lib/gst-invoice/gst";
import type { InvoiceParty, InvoiceSeller } from "@/lib/gst-invoice/types";
import { ToolSection } from "./tool-section";

const GSTIN_HINT = "15 characters, like 29ABCDE1234F1Z5.";

export function PartyFields({
  idPrefix,
  title,
  description,
  nameLabel,
  party,
  contact,
  onChange,
}: {
  idPrefix: string;
  title: string;
  description: string;
  nameLabel: string;
  party: InvoiceParty;
  contact?: string;
  onChange: (patch: Partial<InvoiceSeller>) => void;
}) {
  const id = (field: string) => `${idPrefix}-${field}`;
  const gstinError = party.gstin && !isValidGstin(party.gstin) ? `Check the GSTIN: ${GSTIN_HINT}` : undefined;
  const gstinState = stateOfGstin(party.gstin);
  const stateOptions = [
    { value: "", label: gstinState ? `${stateLabel(gstinState)}, from the GSTIN` : "Choose a state" },
    ...GST_STATES,
  ];

  return (
    <ToolSection id={id("heading")} title={title} description={description}>
      <FormField label={nameLabel} htmlFor={id("name")} className="sm:col-span-2">
        <input
          id={id("name")}
          className="q-input"
          value={party.name}
          onChange={(e) => onChange({ name: e.target.value })}
          autoComplete="organization"
        />
      </FormField>

      <FormField label="GSTIN" htmlFor={id("gstin")} optional error={gstinError} hint={GSTIN_HINT}>
        <input
          id={id("gstin")}
          className="q-input uppercase"
          value={party.gstin}
          maxLength={15}
          spellCheck={false}
          aria-invalid={Boolean(gstinError)}
          aria-describedby={fieldDescribedBy(id("gstin"), gstinError, GSTIN_HINT)}
          onChange={(e) => onChange({ gstin: e.target.value.toUpperCase().replace(/\s/g, "") })}
        />
      </FormField>

      <FormField label="State" htmlFor={id("state")}>
        <SelectField
          id={id("state")}
          options={stateOptions}
          value={party.state}
          onChange={(state) => onChange({ state })}
        />
      </FormField>

      <FormField label="Address" htmlFor={id("address")} className="sm:col-span-2">
        <textarea
          id={id("address")}
          className="q-input resize-y"
          rows={2}
          value={party.address}
          onChange={(e) => onChange({ address: e.target.value })}
        />
      </FormField>

      {contact !== undefined && (
        <FormField label="Email or phone" htmlFor={id("contact")} optional className="sm:col-span-2">
          <input
            id={id("contact")}
            className="q-input"
            value={contact}
            onChange={(e) => onChange({ contact: e.target.value })}
          />
        </FormField>
      )}
    </ToolSection>
  );
}
