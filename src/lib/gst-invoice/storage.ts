import type { InvoiceDraft } from "./types";

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

export function loadDraft(key: string): InvoiceDraft | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isDraft(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveDraft(key: string, draft: InvoiceDraft): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(draft));
  } catch {
    return;
  }
}

export function clearDraft(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    return;
  }
}
