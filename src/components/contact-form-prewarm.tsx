"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

/**
 * Loads the /contact da-forms embed in the background so the contact page
 * opens with it already in cache.
 *
 * The form is a cross-origin iframe: on a cold navigation to /contact the
 * browser has to resolve DNS, do a TLS handshake, fetch the form document and
 * then its JavaScript, all after the click. The `<head>` preconnect and
 * prefetch help, but a prefetched document still re-parses and re-runs its
 * scripts when it is actually framed. Mounting a hidden, fully-loaded iframe
 * once means the visible one on /contact is a warm-cache hit.
 *
 * Bounded on purpose:
 *  - never on /contact itself (the real iframe is there already);
 *  - only after the first pointer/scroll/key interaction, so it never competes
 *    with the initial page load or hurts LCP;
 *  - skipped under Save-Data;
 *  - `requestIdleCallback`, so it waits for a quiet moment;
 *  - once per session — a ref in module scope, not re-done on every route.
 */

let warmed = false;

export function ContactFormPrewarm() {
  const pathname = usePathname();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (warmed) return;
    if (pathname === "/contact") return;

    // Respect an explicit data-saver preference.
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    const start = () => setArmed(true);

    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", start, opts);
    window.addEventListener("keydown", start, opts);
    window.addEventListener("scroll", start, opts);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("scroll", start);
    };
  }, [pathname]);

  useEffect(() => {
    if (!armed || warmed) return;

    const hasRIC = typeof window.requestIdleCallback === "function";
    const handle = hasRIC
      ? window.requestIdleCallback(() => {
          warmed = true;
        })
      : window.setTimeout(() => {
          warmed = true;
        }, 1);

    return () => {
      if (hasRIC) window.cancelIdleCallback(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, [armed]);

  if (!armed) return null;

  return (
    <iframe
      src={site.contactFormSrc}
      title=""
      aria-hidden="true"
      tabIndex={-1}
      // Off-screen, zero-size, no interaction — present only to fill the cache.
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        left: -9999,
        top: 0,
        border: 0,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
