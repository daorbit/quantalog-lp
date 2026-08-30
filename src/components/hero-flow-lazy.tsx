"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroFlow = dynamic(
  () => import("./hero-flow").then((m) => m.HeroFlow),
  { ssr: false },
);

/**
 * The hero diagram for phone widths.
 *
 * React Flow is a heavy dependency and the diagram is decoration, so on mobile
 * it is not worth putting on the critical path: this mounts nothing until the
 * placeholder scrolls near the viewport, then loads the chunk and renders the
 * compact (drag-free) graph. On desktop the hero renders `HeroFlow` directly
 * instead — there the diagram is a headline element and worth the weight up
 * front.
 *
 * The reserved-height placeholder means the swap-in causes no layout shift.
 */
export function HeroFlowLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[300px] w-full" aria-hidden>
      {show && <HeroFlow compact />}
    </div>
  );
}
