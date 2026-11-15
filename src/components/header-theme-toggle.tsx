"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeSwitch } from "./use-theme-switch";

export function HeaderThemeToggle() {
  const { isDark, choose } = useThemeSwitch();

  return (
    <button
      type="button"
      onClick={() => choose(isDark ? "light" : "dark", "header")}
      aria-label="Switch light or dark theme"
      title="Switch theme"
      className="mr-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-fg transition-colors duration-200 hover:bg-bg-subtle hover:text-fg-muted sm:inline-flex"
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
