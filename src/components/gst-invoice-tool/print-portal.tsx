"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function PrintPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(
    <div className="invoice-print-root" aria-hidden="true">
      {children}
    </div>,
    document.body
  );
}
