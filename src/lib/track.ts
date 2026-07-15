// Thin wrapper over the Quantalog tracker that this very site embeds.
// window.rta is defined by tracker.js once it has loaded (see layout.tsx).
// Calls before it loads are simply dropped — analytics must never break the page.

declare global {
  interface Window {
    rta?: {
      track: (name: string, props?: Record<string, unknown>) => void;
    };
  }
}

export function track(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.rta?.track(name, props);
}
