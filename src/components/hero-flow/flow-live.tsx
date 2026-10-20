"use client";

import { useEffect, useState } from "react";
import { useLiveNumber } from "../use-live-number";
import { useReducedMotion } from "../use-reduced-motion";
import { TypedText } from "../typed-text";
import { PACKET_ARRIVAL_MS, PACKET_CYCLE_MS } from "./flow-timing";

export function LiveValue({ seed }: { seed: number }) {
  const { value, bumped } = useLiveNumber(seed, { every: 2200, drift: 3, band: 0.25 });
  return (
    <span className="tick-num inline-flex items-center gap-1.5" data-bumped={bumped}>
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
      {value}
    </span>
  );
}

export function CountValue({ seed }: { seed: number }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(seed);
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let tick: number | undefined;
    let settle: number | undefined;
    const bump = () => {
      setValue((v) => v + 1 + Math.floor(Math.random() * 3));
      setBumped(true);
      window.clearTimeout(settle);
      settle = window.setTimeout(() => setBumped(false), 600);
    };
    const start = window.setTimeout(() => {
      bump();
      tick = window.setInterval(bump, PACKET_CYCLE_MS);
    }, PACKET_ARRIVAL_MS);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(settle);
      window.clearInterval(tick);
    };
  }, [reduced]);

  return (
    <span className="tick-num" data-bumped={bumped}>
      {value.toLocaleString("en-US")}
    </span>
  );
}

export function OrbitNotes({ notes }: { notes: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || notes.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % notes.length), PACKET_CYCLE_MS * 2);
    return () => window.clearInterval(id);
  }, [reduced, notes.length]);

  return (
    <p className="min-h-8.5 font-mono text-[10.5px] leading-relaxed text-fg-muted">
      <TypedText key={index} text={notes[index]} speed={28} caret={false} />
    </p>
  );
}
