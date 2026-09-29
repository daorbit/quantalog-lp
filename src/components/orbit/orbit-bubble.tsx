"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RotateCcw, X } from "lucide-react";
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
          <header className="orbit-panel__header flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <OrbitMark size={32} />
              <span className="leading-tight">
                <span className="block text-[15px] font-semibold text-fg">Orbit AI</span>
                <span className="block text-[12px] text-fg-muted">Answers about Quantalog</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={startOver}
                aria-label="Start over"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-subtle text-fg-muted transition-colors hover:bg-border hover:text-fg"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close Orbit"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-subtle text-fg-muted transition-colors hover:bg-border hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </header>

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
