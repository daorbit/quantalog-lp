"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../use-reduced-motion";

export function useShelf(resetKey: string) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [state, setState] = useState({ progress: 0, ratio: 1, atStart: true, atEnd: true });

  useEffect(() => {
    const track = ref.current;
    if (!track) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const left = track.scrollLeft;
      setState({
        progress: max > 0 ? left / max : 0,
        ratio: track.scrollWidth > 0 ? Math.min(1, track.clientWidth / track.scrollWidth) : 1,
        atStart: left <= 2,
        atEnd: max <= 2 || left >= max - 2,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    track.scrollTo({ left: 0 });
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(track);
    track.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      track.removeEventListener("scroll", schedule);
    };
  }, [resetKey]);

  const page = useCallback(
    (direction: 1 | -1) => {
      const track = ref.current;
      if (!track) return;
      track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  return { ref, ...state, prev: () => page(-1), next: () => page(1) };
}
