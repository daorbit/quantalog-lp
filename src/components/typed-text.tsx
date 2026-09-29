"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

export function TypedText({
  text,
  speed = 55,
  caret = true,
}: {
  text: string;
  speed?: number;
  caret?: boolean;
}) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) return;
    const id = window.setTimeout(() => setCount((n) => n + 1), speed);
    return () => window.clearTimeout(id);
  }, [count, text.length, speed, reduced]);

  return (
    <>
      {text.slice(0, count)}
      {caret && <span className="type-caret" aria-hidden="true" />}
    </>
  );
}
