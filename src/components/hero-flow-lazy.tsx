"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroFlow = dynamic(
  () => import("./hero-flow").then((m) => m.HeroFlow),
  { ssr: false },
);

/**
 * Lazy wrapper for the hero diagram.
 *
 * React Flow (`@xyflow/react`) is a heavy dependency and the diagram is
 * decoration, so it is kept off the critical path at every width: nothing
 * mounts until the reserved-height placeholder scrolls near the viewport,
 * then the chunk loads and the graph renders. The placeholder means the
 * swap-in causes no layout shift.
 *
 * `compact` renders the drag-free graph (used on phones). Desktop passes
 * `compact={false}` for the full draggable graph but still defers the load.
 */
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

    // The diagram is decoration. Even when it is in view on load (desktop), the
    // React Flow chunk must not compete with hydration and first input — so the
    // load is pushed to idle time. Off-screen, the observer gates it further.
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
