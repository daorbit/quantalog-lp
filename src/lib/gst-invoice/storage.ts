import type { InvoiceDraft } from "./types";

const STORAGE_KEY = "quantalog:gst-invoice-draft:v1";

function isDraft(value: unknown): value is InvoiceDraft {
  if (!value || typeof value !== "object") return false;
  const draft = value as Partial<InvoiceDraft>;
  return (
    typeof draft.number === "string" &&
    typeof draft.seller === "object" &&
    typeof draft.buyer === "object" &&
    Array.isArray(draft.items)
  );
}

export function loadDraft(): InvoiceDraft | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: InvoiceDraft): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    return;
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}
