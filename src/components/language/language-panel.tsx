"use client";

import { X } from "lucide-react";
import { languageCopy, languages } from "@/lib/languages";
import { setTranslateLanguage } from "@/lib/translate/googtrans";
import { track } from "@/lib/track";
import { LanguageOption } from "./language-option";

interface LanguagePanelProps {
  id: string;
  active: string;
  onClose: () => void;
}

export function LanguagePanel({ id, active, onClose }: LanguagePanelProps) {
  const select = (code: string) => {
    if (code === active) return onClose();
    track("language_changed", { from: active, to: code });
    setTranslateLanguage(code);
  };

  return (
    <div id={id} role="dialog" aria-label={languageCopy.title} className="lang-panel">
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h2 className="text-[13px] font-semibold tracking-tight text-fg">{languageCopy.title}</h2>
          <p className="text-[11px] text-fg-faint">{languageCopy.description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={languageCopy.close}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-fg-muted transition-colors hover:text-fg"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="p-4">
        <div role="radiogroup" aria-label={languageCopy.title} className="grid grid-cols-2 gap-2">
          {languages.map((language) => (
            <LanguageOption
              key={language.code}
              language={language}
              active={language.code === active}
              onSelect={select}
            />
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-fg-faint">{languageCopy.note}</p>
      </div>
    </div>
  );
}
