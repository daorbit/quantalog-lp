"use client";

import { useEffect, useRef } from "react";
import { startSnow } from "./snow-engine";

export function SnowCanvas({
  max,
  fromTop = false,
  className,
}: {
  max: number;
  fromTop?: boolean;
  className: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return startSnow(canvas, { max, fromTop });
  }, [max, fromTop]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
