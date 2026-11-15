"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeSwitch, type ThemeChoice } from "./use-theme-switch";

const OPTIONS: { key: ThemeChoice; Icon: typeof Sun; label: string }[] = [
  { key: "light", Icon: Sun, label: "Light" },
  { key: "dark", Icon: Moon, label: "Dark" },
];

export function ThemeToggle() {
  const { isDark, choose } = useThemeSwitch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className="glass relative inline-flex items-center rounded-full p-0.5"
      role="radiogroup"
      aria-label="Color theme"
    >

      {mounted && (
        <span
          className={`absolute h-7 w-7 rounded-full bg-surface shadow-soft transition-transform duration-200 ease-out ${
            isDark ? "translate-x-7" : "translate-x-0"
          }`}
          aria-hidden="true"
        />
      )}

      {OPTIONS.map(({ key, Icon, label }) => {
        const active = mounted && (key === "dark") === isDark;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => choose(key, "footer")}
            className={`relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 after:absolute after:left-1/2 after:top-1/2 after:h-11 after:w-11 after:-translate-x-1/2 after:-translate-y-1/2 after:content-[''] ${
              active ? "text-accent" : "text-fg-faint hover:text-fg-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
