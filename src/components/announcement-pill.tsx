"use client";

import { ChevronRight } from "lucide-react";
import { track } from "@/lib/track";

export function AnnouncementPill({
  href,
  label,
  children,
  event,
  className = "",
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  event: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event, { location: "hero_pill" })}
      className={`group inline-flex items-center gap-2.5 rounded-full border border-border py-1 pl-1 pr-3 text-[13px] text-fg-muted transition-colors duration-200 hover:border-border-strong hover:text-fg ${className}`}
    >
      <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[11px] font-semibold text-accent">{label}</span>
      {children}
      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}
