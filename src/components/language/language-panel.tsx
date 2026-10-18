"use client";

import { languageCopy, languages } from "@/lib/languages";
import { setTranslateLanguage } from "@/lib/translate/googtrans";
import { track } from "@/lib/track";
import { Flag } from "./flag";
import { LanguageOption } from "./language-option";

interface LanguagePanelProps {
  active: string;
  onClose: () => void;
}

export function LanguagePanel({ active, onClose }: LanguagePanelProps) {
  const current = languages.find((language) => language.code === active) ?? languages[0];

  const select = (code: string) => {
    if (code === active) return onClose();
    track("language_changed", { from: active, to: code });
    setTranslateLanguage(code);
  };

  return (
    <div className="mx-auto grid max-h-[calc(100dvh-3rem)] max-w-360 gap-8 overflow-y-auto px-4 pb-14 pt-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-12 lg:px-12">
      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">{languageCopy.eyebrow}</p>
        <p className="menu-reveal mt-4 flex items-center gap-3 text-[24px] font-semibold leading-tight tracking-tight text-fg">
          <Flag code={current.flag} />
          {current.native}
        </p>
        <p className="menu-reveal mt-3 max-w-72 text-[13px] leading-relaxed text-fg-muted">
          {languageCopy.description}
        </p>
      </div>

      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">{languageCopy.listLabel}</p>
        <div
          role="radiogroup"
          aria-label={languageCopy.listLabel}
          className="menu-reveal mt-3 grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        >
          {languages.map((language) => (
            <LanguageOption
              key={language.code}
              language={language}
              active={language.code === active}
              onSelect={select}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
