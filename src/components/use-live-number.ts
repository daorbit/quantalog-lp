"use client";

import { useEffect, useState } from "react";

export function useLiveNumber(
  seed: number,
  {

    every = 3000,

    drift = 3,

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
