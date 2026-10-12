"use client";

import { useCallback, useState } from "react";
import { CalendarDays } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "./ui";
import { DemoBookingDialog } from "./demo-booking-dialog";

export function BookDemoButton({
  location,
  variant = "secondary",
  size = "lg",
}: {
  location: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const openDialog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <Button
        href={site.demoCall}
        variant={variant}
        size={size}
        track="book_demo"
        trackProps={{ location }}
        onClick={openDialog}
      >
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        Book a demo
      </Button>
      <DemoBookingDialog src={site.demoCall} open={open} onClose={close} />
    </>
  );
}
