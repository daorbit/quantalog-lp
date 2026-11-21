"use client";

import { Plus } from "lucide-react";
import { ActionButton } from "../action-button";
import type { InvoiceItem } from "@/lib/gst-invoice/types";
import { ItemFields } from "./item-fields";

export function ItemsSection({
  items,
  onChange,
  onAdd,
  onRemove,
}: {
  items: InvoiceItem[];
  onChange: (id: string, patch: Partial<InvoiceItem>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <section aria-labelledby="gst-items-heading" className="border-t border-border py-8">
      <h2 id="gst-items-heading" className="text-[19px] font-semibold tracking-tight text-fg">
        Items
      </h2>
      <p className="mt-1 text-pretty text-[14px] leading-relaxed text-fg-muted">
        Use an HSN code for goods and a SAC code for services. Most goods and services are taxed at 5% or 18%.
      </p>
      <ul className="mt-5">
        {items.map((item, i) => (
          <ItemFields
            key={item.id}
            item={item}
            position={i + 1}
            removable={items.length > 1}
            onChange={(patch) => onChange(item.id, patch)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </ul>
      <ActionButton variant="secondary" className="mt-2" onClick={onAdd}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add an item
      </ActionButton>
    </section>
  );
}
