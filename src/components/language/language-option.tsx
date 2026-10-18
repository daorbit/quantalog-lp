import { Check } from "lucide-react";
import type { SiteLanguage } from "@/types/translate";

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
      lang={language.code}
      onClick={() => onSelect(language.code)}
      className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left transition-colors duration-200 ${
        active ? "border-cta bg-cta text-cta-fg" : "border-border text-fg hover:bg-bg-subtle"
      }`}
    >
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-medium">{language.native}</span>
        <span className={`block text-[11px] ${active ? "opacity-70" : "text-fg-faint"}`}>{language.label}</span>
      </span>
      {active && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
    </button>
  );
}
