"use client";

import { useEffect, useState } from "react";
import { useInView } from "./use-in-view";
import { useReducedMotion } from "./use-reduced-motion";

export function useCycle<T extends HTMLElement>(length: number, interval: number) {
  const { ref, inView } = useInView<T>(0.4, false);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const running = inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => window.clearInterval(id);
  }, [running, length, interval]);

  return { ref, index, inView, running };
}
