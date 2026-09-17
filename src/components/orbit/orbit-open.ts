"use client";


const EVENT = "orbit:open";

/**
 * Shared by the panel's own suggestion chip and by any button that opens Orbit
 * asking for a summary. It lives here rather than in the panel so a page can
 * import it without pulling the whole chat UI into its bundle.
 */
export const SUMMARISE_PROMPT = "Summarise this page for me";

export type OrbitOpenDetail = { ask?: string };

export function openOrbit(detail: OrbitOpenDetail = {}): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OrbitOpenDetail>(EVENT, { detail }));
}

export function onOrbitOpen(handler: (detail: OrbitOpenDetail) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<OrbitOpenDetail>).detail ?? {});
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
