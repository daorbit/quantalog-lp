"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { track } from "@/lib/track";

export type ThemeChoice = "light" | "dark";

export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  const choose = useCallback(
    (theme: ThemeChoice, location: string) => {
      setTheme(theme);
      track("theme_changed", { theme, location });
    },
    [setTheme]
  );

  return { isDark: resolvedTheme === "dark", choose };
}
