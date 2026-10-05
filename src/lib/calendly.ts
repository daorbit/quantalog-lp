declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css";
const LOAD_TIMEOUT_MS = 4000;

let loading: Promise<void> | null = null;

export function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loading) return loading;

  loading = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    const timer = window.setTimeout(() => reject(new Error("calendly timeout")), LOAD_TIMEOUT_MS);
    script.onload = () => {
      window.clearTimeout(timer);
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("calendly failed"));
    };
    document.body.appendChild(script);
  }).catch((err: unknown) => {
    loading = null;
    throw err;
  });

  return loading;
}

export function calendlyUrl(base: string): string {
  const url = new URL(base);
  url.searchParams.set("hide_gdpr_banner", "1");
  return url.toString();
}
