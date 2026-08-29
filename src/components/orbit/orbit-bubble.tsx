"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RotateCcw, X } from "lucide-react";
import { OrbitMark } from "./orbit-mark";
import { OrbitPanel } from "./orbit-panel";

/**
 * The floating "Ask Orbit" launcher and the panel it opens.
 *
 * Same shape as the dashboard's OrbitBubble: a mark that is always on screen, a
 * light scrim while the panel is up, and the panel sitting directly above the
 * launcher. What is dropped is everything the public endpoint has no use for —
 * no shared provider (there is one conversation, this component owns it), no
 * model picker.
 *
 * Closed by default. Hidden on the pages where a chat widget would be tactless:
 * contact is already a conversation with a person, and the legal pages are
 * where someone goes to read exactly what we collect.
 *
 * The panel mounts only while open, and each open starts a fresh conversation —
 * the right default for a pre-sales chat nobody returns to. Remounting
 * OrbitPanel via the `key` is what resets the hook's state.
 */

const HIDDEN_ON = ["/contact", "/privacy", "/terms", "/thank-you"];

export function OrbitBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Hold the page still while the sheet is up.
   *
   * On a phone the panel is a near-full-screen sheet, and without this the page
   * behind it scrolls under the thumb the moment a drag starts outside the
   * thread — the scroll chaining that makes a web sheet feel unlike an app.
   * Only below the breakpoint where it is a sheet: on desktop it is a side
   * panel and locking the page would be wrong.
   */
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 48em)").matches) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  const startOver = () => setSession((n) => n + 1);

  return (
    <>
      {open && <div className="orbit-scrim" onClick={() => setOpen(false)} aria-hidden />}

      {open && (
        <div className="orbit-panel" role="dialog" aria-label="Ask Orbit">
          <div className="aurora-wash" aria-hidden />

          <header className="orbit-panel__header flex items-center justify-between border-b border-border px-4 py-2.5">
            <div className="flex items-center gap-2">
              <OrbitMark size={22} />
              <span className="text-sm font-semibold">Orbit</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={startOver}
                aria-label="Start over"
                className="flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition hover:bg-fg/5 hover:text-fg"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close Orbit"
                className="flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition hover:bg-fg/5 hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <OrbitPanel key={session} />
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
