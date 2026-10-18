"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const TRIGGER =
  "inline-flex items-center gap-1 whitespace-nowrap px-3.5 py-1.5 text-[13px] text-fg transition-colors duration-200 group-hover:text-fg-muted group-focus-within:text-fg-muted";

export function MegaMenu({ label, href, children }: { label: string; href?: string; children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;
    link.blur();
    setDismissed(true);
    window.setTimeout(() => setDismissed(false), 400);
  };

  const chevron = (
    <ChevronDown
      className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
      aria-hidden="true"
    />
  );

  return (
    <div onClick={onClick} className={`mega group flex h-full items-center ${dismissed ? "mega--dismissed" : ""}`}>
      {href ? (
        <Link href={href} aria-haspopup="true" className={TRIGGER}>
          {label}
          {chevron}
        </Link>
      ) : (
        <button type="button" aria-haspopup="true" className={TRIGGER}>
          {label}
          {chevron}
        </button>
      )}

      <div className="mega__panel">{children}</div>
      <div className="mega__scrim" aria-hidden="true" />
    </div>
  );
}
