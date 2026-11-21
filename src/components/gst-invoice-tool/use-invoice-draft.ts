"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DocumentKindConfig } from "@/lib/gst-invoice/document-kinds";
import { blankDraft, newItem, sampleDraft, withDates } from "@/lib/gst-invoice/draft";
import { clearDraft, loadDraft, saveDraft } from "@/lib/gst-invoice/storage";
import type { InvoiceDraft, InvoiceItem, InvoiceParty, InvoiceSeller } from "@/lib/gst-invoice/types";

const SAVE_DELAY_MS = 400;

function withDefaults(stored: InvoiceDraft, config: DocumentKindConfig): InvoiceDraft {
  const base = blankDraft(config);
  return {
    ...base,
    ...stored,
    seller: { ...base.seller, ...stored.seller },
    buyer: { ...base.buyer, ...stored.buyer },
    items: stored.items.length ? stored.items.map((item) => ({ ...newItem(), ...item })) : base.items,
  };
}

export function useInvoiceDraft(config: DocumentKindConfig) {
  const [draft, setDraft] = useState<InvoiceDraft>(() => sampleDraft(config));
  const loaded = useRef(false);
  const { storageKey, endDays } = config;

  useEffect(() => {
    const stored = loadDraft(storageKey);
    setDraft((current) => withDates(stored ? withDefaults(stored, config) : current, new Date(), endDays));
    loaded.current = true;
  }, [config, storageKey, endDays]);

  useEffect(() => {
    if (!loaded.current) return;
    const timer = setTimeout(() => saveDraft(storageKey, draft), SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [draft, storageKey]);

  const update = useCallback((patch: Partial<InvoiceDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
  }, []);

  const updateSeller = useCallback((patch: Partial<InvoiceSeller>) => {
    setDraft((d) => ({ ...d, seller: { ...d.seller, ...patch } }));
  }, []);

  const updateBuyer = useCallback((patch: Partial<InvoiceParty>) => {
    setDraft((d) => ({ ...d, buyer: { ...d.buyer, ...patch } }));
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<InvoiceItem>) => {
    setDraft((d) => ({ ...d, items: d.items.map((item) => (item.id === id ? { ...item, ...patch } : item)) }));
  }, []);

  const addItem = useCallback(() => {
    setDraft((d) => ({ ...d, items: [...d.items, newItem()] }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setDraft((d) => (d.items.length > 1 ? { ...d, items: d.items.filter((item) => item.id !== id) } : d));
  }, []);

  const startBlank = useCallback(() => {
    clearDraft(storageKey);
    setDraft(withDates(blankDraft(config), new Date(), endDays));
  }, [config, storageKey, endDays]);

  return { draft, update, updateSeller, updateBuyer, updateItem, addItem, removeItem, startBlank };
}
