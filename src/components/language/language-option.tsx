import { Check } from "lucide-react";
import type { SiteLanguage } from "@/types/translate";
import { Flag } from "./flag";

interface LanguageOptionProps {
  language: SiteLanguage;
  active: boolean;
  onSelect: (code: string) => void;
}

export function LanguageOption({ language, active, onSelect }: LanguageOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => onSelect(language.code)}
      className="group/lang flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-bg-subtle"
    >
      <Flag code={language.flag} />
      <span className="min-w-0 flex-1">
        <span
          lang={language.code}
          className={`block truncate text-[14px] font-medium transition-colors ${
            active ? "text-accent" : "text-fg group-hover/lang:text-accent"
          }`}
        >
          {language.native}
        </span>
        <span className="block truncate text-[12px] text-fg-faint">{language.label}</span>
      </span>
      {active && <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />}
    </button>
  );
}
