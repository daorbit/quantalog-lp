"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { languageCopy } from "@/lib/languages";
import { useActiveLanguage } from "../use-active-language";
import { useDismiss } from "../use-dismiss";
import { LanguagePanel } from "./language-panel";

export function LanguageMenu() {
  const active = useActiveLanguage();
  const [open, setOpen] = useState(false);
  const [armed, setArmed] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const arm = () => setArmed(true);

  const dismiss = useCallback(() => {
    setOpen(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setDismissed(true);
    window.setTimeout(() => setDismissed(false), 400);
  }, []);

  useDismiss(rootRef, open, close);

  return (
    <div
      ref={rootRef}
      onPointerEnter={arm}
      onFocus={arm}
      translate="no"
      className={`notranslate mega group flex items-center self-stretch ${open ? "mega--open" : ""} ${dismissed ? "mega--dismissed" : ""}`}
    >
      <button
        type="button"
        onClick={() => {
          arm();
          setOpen((value) => !value);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={languageCopy.trigger}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] text-fg transition-colors duration-200 group-hover:text-fg-muted group-focus-within:text-fg-muted"
      >
        <Languages className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="uppercase">{active.split("-")[0]}</span>
        <ChevronDown
          className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden="true"
        />
      </button>

      <div className="mega__panel">
        {armed && <LanguagePanel active={active} onClose={dismiss} />}
      </div>
      <div className="mega__scrim" aria-hidden="true" />
    </div>
  );
}
