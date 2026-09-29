"use client";

import { useCallback, useEffect, useRef } from "react";

function loopWidth(el: HTMLElement) {
  const items = el.children;
  const half = items.length / 2;
  if (half < 1) return 0;
  return (items[half] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft;
}

export function useAutoScroll<T extends HTMLElement>({
  speed = 32,
  resumeAfter = 2500,
}: { speed?: number; resumeAfter?: number } = {}) {
  const ref = useRef<T>(null);
  const pausedUntil = useRef(0);

  const pause = useCallback(
    (ms = resumeAfter) => {
      pausedUntil.current = performance.now() + ms;
    },
    [resumeAfter]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pos = el.scrollLeft;
    let visible = false;
    let holding = false;
    let last = 0;
    let raf = 0;

    const tick = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      if (visible && !holding && t > pausedUntil.current) {
        const loop = loopWidth(el);
        pos += speed * dt;
        if (loop > 0 && pos >= loop) pos -= loop;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos) > 2) {
        pos = el.scrollLeft;
        pausedUntil.current = performance.now() + resumeAfter;
      }
    };
    const hold = () => (holding = true);
    const release = () => {
      holding = false;
      pausedUntil.current = performance.now() + 600;
    };
    const onPointerEnter = (e: PointerEvent) => e.pointerType === "mouse" && hold();
    const onPointerLeave = (e: PointerEvent) => e.pointerType === "mouse" && release();

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("focusin", hold);
    el.addEventListener("focusout", release);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("focusin", hold);
      el.removeEventListener("focusout", release);
    };
  }, [speed, resumeAfter]);

  const step = useCallback(
    (dir: 1 | -1) => {
      const el = ref.current;
      const first = el?.children[0] as HTMLElement | undefined;
      const second = el?.children[1] as HTMLElement | undefined;
      if (!el || !first || !second) return;
      pause(4000);
      const stride = second.offsetLeft - first.offsetLeft;
      if (dir === -1 && el.scrollLeft < stride) el.scrollLeft += loopWidth(el);
      const target = Math.round(el.scrollLeft / stride + dir) * stride;
      el.scrollTo({ left: target, behavior: "smooth" });
    },
    [pause]
  );

  return { ref, step };
}
