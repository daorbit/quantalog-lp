"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * The Orbit mark.
 *
 * Two files, not one — the artwork is not transparent, so each is drawn on its
 * own ground and the dark one on a light panel would be a black square. Which
 * to show follows the resolved theme; before mount that is unknown, so it
 * renders the dark mark (this site defaults to dark) to avoid a first-paint
 * flash of the wrong one.
 */
export function OrbitMark({ size = 20 }: { size?: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = !mounted || resolvedTheme !== "light";

  return (
    <img
      src={dark ? "/da-ai-dark-mode.png" : "/da-ai-light-mode.png"}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        display: "block",
        flexShrink: 0,
        objectFit: "cover",
      }}
    />
  );
}
