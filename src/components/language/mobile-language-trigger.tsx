import { ChevronDown, Languages } from "lucide-react";
import { languageCopy } from "@/lib/languages";

export function MobileLanguageTrigger({
  active,
  open,
  onToggle,
}: {
  active: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-language-menu"
      aria-label={languageCopy.trigger}
      translate="no"
      className="notranslate inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] text-fg lg:hidden"
    >
      <Languages className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="uppercase">{active.split("-")[0]}</span>
      <ChevronDown
        className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
