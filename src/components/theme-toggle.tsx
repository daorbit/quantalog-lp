"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  /**
   * A two-position segmented control rather than one button whose icon swaps.
   * An icon that changes on click has to be read to know what it now means;
   * both options visible with a thumb behind the active one shows the current
   * state and the alternative at the same time.
   */
  return (
    <div
      className="glass relative inline-flex items-center rounded-full p-0.5"
      role="radiogroup"
      aria-label="Color theme"
    >
      {/* The sliding thumb. Rendered only once mounted — before that the
          server has no idea which theme wins, and a thumb parked under the
          wrong option would visibly jump on hydration. */}
      {mounted && (
        <span
          className="absolute h-7 w-7 rounded-full bg-surface shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
          style={{ transform: `translateX(${isDark ? "1.75rem" : "0"})` }}
          aria-hidden="true"
        />
      )}

      {[
        { key: "light", Icon: Sun, label: "Light" },
        { key: "dark", Icon: Moon, label: "Dark" },
      ].map(({ key, Icon, label }) => {
        const active = mounted && (key === "dark") === isDark;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(key)}
            className={`relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${
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
