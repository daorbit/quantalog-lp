"use client";

import { useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { calendlyUrl, loadCalendly } from "@/lib/calendly";
import { Button } from "./ui";

const prewarm = () => {
  void loadCalendly().catch(() => {});
};

export function BookDemoButton({
  location,
  variant = "secondary",
  size = "lg",
}: {
  location: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
}) {
  const [opening, setOpening] = useState(false);
  const url = calendlyUrl(site.demoCall);

  const open = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpening(true);
    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({ url });
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setOpening(false);
    }
  };

  return (
    <Button
      href={url}
      variant={variant}
      size={size}
      track="book_demo"
      trackProps={{ location }}
      onClick={open}
      onIntent={prewarm}
    >
      {opening ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
      )}
      Book a demo
    </Button>
  );
}
