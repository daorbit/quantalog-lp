"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

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
