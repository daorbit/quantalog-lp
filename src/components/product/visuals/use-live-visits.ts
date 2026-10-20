"use client";

import { useEffect, useRef, useState } from "react";
import { ARRIVAL_MS, LIVE_MAX, LIVE_MIN, LIVE_SEED, SEED_AGES, VISIT_POOL, seedVisits, type Visit } from "./live-visits-data";

export function useLiveVisits(running: boolean) {
  const [visits, setVisits] = useState<Visit[]>(seedVisits);
  const [live, setLive] = useState(LIVE_SEED);
  const nextRef = useRef(SEED_AGES.length);

  useEffect(() => {
    if (!running) return;
    const clock = window.setInterval(() => {
      setVisits((list) => list.map((v) => ({ ...v, age: v.age + 1 })));
    }, 1000);
    const arrivals = window.setInterval(() => {
      const id = nextRef.current;
      nextRef.current += 1;
      const visit = { ...VISIT_POOL[id % VISIT_POOL.length], id, age: 0 };
      setVisits((list) => [visit, ...list.slice(0, SEED_AGES.length - 1)]);
      setLive((n) => Math.min(LIVE_MAX, Math.max(LIVE_MIN, n + Math.round(Math.random() * 3) - 1)));
    }, ARRIVAL_MS);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(arrivals);
    };
  }, [running]);

  return { visits, live };
}
