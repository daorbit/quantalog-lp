"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function useReveal(total: number, active: boolean, step = 70) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    if (reduced) {
      setCount(total);
      return;
    }
    if (count >= total) return;
    const id = window.setTimeout(() => setCount((n) => n + 1), step);
    return () => window.clearTimeout(id);
  }, [active, reduced, count, total, step]);

  return count;
}
