"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { EmbeddedForm } from "./embedded-form";

export function DemoBookingDialog({
  src,
  open,
  onClose,
}: {
  src: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a demo"
      className="fixed inset-0 z-100 flex bg-black/55 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:text-fg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="h-full overflow-y-auto overscroll-contain">
          <EmbeddedForm src={src} title="Book a demo" eager className="block min-h-full" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
