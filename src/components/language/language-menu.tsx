"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { DEFAULT_LANGUAGE, languageCopy } from "@/lib/languages";
import { useActiveLanguage } from "../use-active-language";
import { useDismiss } from "../use-dismiss";
import { LanguagePanel } from "./language-panel";

export function LanguageMenu() {
  const active = useActiveLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);

  useDismiss(rootRef, open, close);

  return (
    <div ref={rootRef} className="notranslate sm:relative" translate="no">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={languageCopy.trigger}
        className={`relative grid h-8 w-8 place-items-center rounded-full text-fg transition-colors duration-200 hover:bg-bg-subtle ${
          open ? "bg-bg-subtle" : ""
        }`}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        {active !== DEFAULT_LANGUAGE && (
          <span
            aria-hidden="true"
            className="absolute -right-1 top-0 rounded-full bg-accent px-1 text-[8px] font-semibold uppercase leading-3.5 text-accent-fg"
          >
            {active.split("-")[0]}
          </span>
        )}
      </button>

      {open && <LanguagePanel id={panelId} active={active} onClose={close} />}
    </div>
  );
}
