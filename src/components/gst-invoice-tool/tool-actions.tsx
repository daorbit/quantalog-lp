"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, RotateCcw } from "lucide-react";
import { ActionButton } from "../action-button";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

const CONFIRM_WINDOW_MS = 3000;

export function ToolActions({ onDownload, onStartBlank }: { onDownload: () => void; onStartBlank: () => void }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = setTimeout(() => setConfirming(false), CONFIRM_WINDOW_MS);
    return () => clearTimeout(timer);
  }, [confirming]);

  function startBlank() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setConfirming(false);
    onStartBlank();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <ActionButton onClick={onDownload}>
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </ActionButton>
        <ActionButton variant="secondary" onClick={startBlank} aria-live="polite">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {confirming ? "Tap again to clear" : "Start blank"}
        </ActionButton>
      </div>
      <p className="mt-3 text-pretty text-[13px] leading-relaxed text-fg-muted">
        Your draft stays in this browser. Need numbering that keeps count, saved customers and share links?{" "}
        <a
          href={`${site.app}/signup`}
          onClick={() => track("cta_start_free", { location: "gst_tool_actions" })}
          className="inline-flex items-center gap-0.5 font-medium text-accent hover:underline hover:underline-offset-4"
        >
          Send it from Quantalog
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </p>
    </div>
  );
}
