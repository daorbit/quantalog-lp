"use client";

import { languageCopy, languages } from "@/lib/languages";
import { Flag } from "./flag";
import { LanguageOption } from "./language-option";
import { useLanguageSelect } from "./use-language-select";

export function MobileLanguageMenu({ active, onClose }: { active: string; onClose: () => void }) {
  const current = languages.find((language) => language.code === active) ?? languages[0];
  const select = useLanguageSelect(active, onClose);

  return (
    <div id="mobile-language-menu" translate="no" className="notranslate mobile-menu">
      <div className="mobile-menu__body">
        <p className="mobile-menu__label">{languageCopy.eyebrow}</p>
        <p className="flex items-center gap-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-fg">
          <Flag code={current.flag} />
          {current.native}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">{languageCopy.description}</p>

        <p className="mobile-menu__label mt-8">{languageCopy.listLabel}</p>
        <div role="radiogroup" aria-label={languageCopy.listLabel} className="grid grid-cols-2 gap-x-2 gap-y-0.5">
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
