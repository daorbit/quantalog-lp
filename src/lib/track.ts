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
