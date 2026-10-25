"use client";

import { useCallback } from "react";
import { setTranslateLanguage } from "@/lib/translate/googtrans";
import { track } from "@/lib/track";

export function useLanguageSelect(active: string, onClose: () => void) {
  return useCallback(
    (code: string) => {
      if (code === active) return onClose();
      track("language_changed", { from: active, to: code });
      setTranslateLanguage(code);
    },
    [active, onClose],
  );
}
