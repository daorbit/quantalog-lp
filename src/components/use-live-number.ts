"use client";

import { useEffect, useState } from "react";

/**
 * A number that drifts upward on a timer, for the hero dashboard mock.
 *
 * The page is statically exported, so the value must start at exactly `seed` —
 * that is what the server rendered, and anything else is a hydration mismatch.
 * Drift only begins after mount, which also means a crawler and a
 * JavaScript-less visitor see a stable, sensible figure.
 *
 * Returns the current value and whether it changed on the last tick, so the
 * caller can flash the digits without tracking the previous value itself.
 */
export function useLiveNumber(
  seed: number,
  {
    /** Milliseconds between ticks. */
    every = 3000,
    /** Largest change per tick, in units. */
    drift = 3,
    /** Never wander further than this fraction away from the seed. */
    band = 0.04,
  }: { every?: number; drift?: number; band?: number } = {}
) {
  const [value, setValue] = useState(seed);
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    const min = Math.round(seed * (1 - band));
    const max = Math.round(seed * (1 + band));
    let offTimer: ReturnType<typeof setTimeout>;

    const id = setInterval(() => {
      setValue((v) => {
        // Biased upward: a live counter that trends down reads as a dying site.
        const step = Math.round((Math.random() * 2 - 0.7) * drift);
        const next = v + step;
        if (next < min || next > max) return v;
        return next;
      });
      setBumped(true);
      clearTimeout(offTimer);
      offTimer = setTimeout(() => setBumped(false), 600);
    }, every);

    return () => {
      clearInterval(id);
      clearTimeout(offTimer);
    };
  }, [seed, every, drift, band]);

  return { value, bumped };
}
