"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroFlow = dynamic(
  () => import("./hero-flow").then((m) => m.HeroFlow),
  { ssr: false },
);

export function HeroFlowLazy({
  compact = false,
  className = "h-[300px] w-full",
}: {
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ric =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200);

    if (typeof IntersectionObserver === "undefined") {
      ric(() => setShow(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ric(() => setShow(true));
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {show && <HeroFlow compact={compact} />}
    </div>
  );
}
