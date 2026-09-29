"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { OrbitHeader } from "./orbit-header";
import { OrbitMark } from "./orbit-mark";
import { OrbitPanel } from "./orbit-panel";
import { onOrbitOpen } from "./orbit-open";

const HIDDEN_ON = ["/contact", "/privacy", "/terms", "/thank-you"];

export function OrbitBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [ask, setAsk] = useState<string | undefined>(undefined);

  useEffect(
    () =>
      onOrbitOpen(({ ask: question }) => {
        setAsk(question);
        setSession((n) => n + 1);
        setOpen(true);
      }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.dataset.orbitOpen = "";
    return () => {
      delete root.dataset.orbitOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 63.99em)").matches) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  const startOver = () => {
    setAsk(undefined);
    setSession((n) => n + 1);
  };

  return (
    <>
      {open && <div className="orbit-scrim" onClick={() => setOpen(false)} aria-hidden />}

      {open && (
        <div className="orbit-panel" role="dialog" aria-label="Ask Orbit">
          <OrbitHeader onReset={startOver} onClose={() => setOpen(false)} />
          <OrbitPanel key={session} ask={ask} />
        </div>
      )}

      <button
        className="orbit-fab"
        data-open={open || undefined}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Hide Orbit" : "Ask Orbit"}
        aria-expanded={open}
      >
        <OrbitMark size={52} />
      </button>
    </>
  );
}
