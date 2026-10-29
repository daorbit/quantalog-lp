"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "../use-in-view";
import { useReducedMotion } from "../use-reduced-motion";

export type InvoiceStage = 0 | 1 | 2 | 3;

export type InvoiceCue = "accept" | "pay" | null;

type Step = { wait: number; cue: InvoiceCue; stage?: InvoiceStage };

const SCRIPT: Step[] = [
  { wait: 1200, cue: null, stage: 0 },
  { wait: 700, cue: "accept" },
  { wait: 1600, cue: null, stage: 1 },
  { wait: 1600, cue: null, stage: 2 },
  { wait: 800, cue: "pay" },
  { wait: 4200, cue: null, stage: 3 },
];

const CONVERT_AFTER_MS = 1400;
const RESUME_AFTER_MS = 9000;

export function useInvoiceDemo() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35, false);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<InvoiceStage>(0);
  const [cue, setCue] = useState<InvoiceCue>(null);
  const [paused, setPaused] = useState(false);

  const stepRef = useRef(0);
  const idleRef = useRef<number | undefined>(undefined);
  const convertRef = useRef<number | undefined>(undefined);

  const playing = inView && !reduced && !paused;

  useEffect(() => {
    if (!playing) return;
    let timer: number | undefined;

    const tick = () => {
      const step = SCRIPT[stepRef.current];
      if (step.stage !== undefined) setStage(step.stage);
      setCue(step.cue);
      timer = window.setTimeout(() => {
        stepRef.current = (stepRef.current + 1) % SCRIPT.length;
        tick();
      }, step.wait);
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      setCue(null);
    };
  }, [playing]);

  useEffect(
    () => () => {
      window.clearTimeout(idleRef.current);
      window.clearTimeout(convertRef.current);
    },
    []
  );

  const interact = useCallback(() => {
    setPaused(true);
    stepRef.current = 0;
    window.clearTimeout(idleRef.current);
    window.clearTimeout(convertRef.current);
    idleRef.current = window.setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  const accept = useCallback(() => {
    interact();
    setStage(1);
    convertRef.current = window.setTimeout(() => setStage(2), CONVERT_AFTER_MS);
  }, [interact]);

  const pay = useCallback(() => {
    interact();
    setStage(3);
  }, [interact]);

  const reset = useCallback(() => {
    interact();
    setStage(0);
  }, [interact]);

  return { ref, stage, cue, playing, accept, pay, reset };
}

export type InvoiceDemo = ReturnType<typeof useInvoiceDemo>;
