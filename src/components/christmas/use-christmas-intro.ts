"use client";

import { useEffect, useState } from "react";

const START_DELAY_MS = 700;
const DURATION_MS = 11500;

export function useChristmasIntro() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let startTimer = 0;

    const start = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", start);
      startTimer = window.setTimeout(() => setPlaying(true), START_DELAY_MS);
    };

    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      window.clearTimeout(startTimer);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const endTimer = window.setTimeout(() => setPlaying(false), DURATION_MS);
    return () => window.clearTimeout(endTimer);
  }, [playing]);

  return playing;
}
