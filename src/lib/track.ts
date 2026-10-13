declare global {
  interface Window {
    rta?: {
      track: (name: string, props?: Record<string, unknown>) => void;
    };
  }
}

export function track(name: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.rta?.track(name, props);
  } catch {
    return;
  }
}
