"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

let warmed = false;

export function ContactFormPrewarm() {
  const pathname = usePathname();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (warmed) return;
    if (pathname === "/contact") return;

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
