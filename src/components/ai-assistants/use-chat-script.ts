"use client";

import { useEffect, useState } from "react";

export type ChatPhase = "ask" | "tool" | "answer" | "hold";

const WAIT: Record<Exclude<ChatPhase, "answer">, number> = { ask: 900, tool: 1200, hold: 3600 };
const TYPE_MS = 20;

export function useChatScript(answerLengths: readonly number[], running: boolean) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<ChatPhase>("ask");
  const [typed, setTyped] = useState(0);
  const total = answerLengths.length;
  const answerLength = answerLengths[index];

  useEffect(() => {
    if (!running) return;
    if (phase === "answer") {
      if (typed >= answerLength) {
        setPhase("hold");
        return;
      }
      const t = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      if (phase === "ask") setPhase("tool");
      else if (phase === "tool") {
        setTyped(0);
        setPhase("answer");
      } else {
        setIndex((i) => (i + 1) % total);
        setTyped(0);
        setPhase("ask");
      }
    }, WAIT[phase]);
    return () => window.clearTimeout(t);
  }, [running, phase, typed, answerLength, total]);

  return { index, phase, typed };
}
