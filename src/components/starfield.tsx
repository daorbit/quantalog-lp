"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drifting dot field behind the page.
 *
 * Dots are real elements at random positions rather than a tiled CSS gradient,
 * because a repeating tile puts every dot on a visible lattice. Each carries a
 * depth factor: nearer dots are larger, brighter, and move further on both
 * scroll and pointer movement, which is what reads as depth rather than as a
 * flat sticker sliding over the page.
 */
type Dot = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  /** 0 = far (barely moves), 1 = near (moves most). */
  depth: number;
};

export function Starfield({ count = 60 }: { count?: number }) {
  const layer = useRef<HTMLDivElement>(null);

  // Generated after mount, not during render: the positions are random, so
  // producing them on the server would guarantee a hydration mismatch. Until
  // then the component renders nothing, which both sides agree on.
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: 0.8 + depth * depth * 3.2,
          delay: Math.random() * -18,
          duration: 14 + Math.random() * 16,
          opacity: 0.1 + depth * 0.4,
          depth,
        };
      })
    );
  }, [count]);

  // Scroll and pointer both feed the same three custom properties, written
  // inside one rAF. Doing this through React state would re-render the whole
  // field on every frame.
  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let scrollY = window.scrollY;
    // Pointer offset from the centre of the viewport, in -1..1.
    let px = 0;
    let py = 0;

    const flush = () => {
      frame = 0;
      el.style.setProperty("--scroll-y", String(scrollY));
      el.style.setProperty("--pointer-x", px.toFixed(4));
      el.style.setProperty("--pointer-y", py.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      schedule();
    };
    const onPointer = (e: PointerEvent) => {
      // Coarse pointers (touch) fire this on tap and would jerk the field, so
      // only a real hovering pointer drives the parallax.
      if (e.pointerType !== "mouse") return;
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    flush();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={layer} className="starfield" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              "--depth": d.depth.toFixed(3),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
