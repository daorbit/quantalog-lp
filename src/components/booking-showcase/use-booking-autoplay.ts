"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { AUTOPLAY_SCENES } from "./booking-data";
import type { BookingDemo } from "./use-booking-demo";

export type BookingCue = { day?: number; slot?: string; confirm?: boolean } | null;

type Scene = (typeof AUTOPLAY_SCENES)[number];

type Step = { wait: number; cue: BookingCue; run?: (demo: BookingDemo) => void };

const RESUME_AFTER_MS = 9000;

function stepsFor(scene: Scene): Step[] {
  return [
    { wait: 900, cue: null, run: (demo) => demo.reset() },
    { wait: 650, cue: { day: scene.day } },
    { wait: 800, cue: null, run: (demo) => demo.pickDay(scene.day) },
    { wait: 600, cue: { slot: scene.slot } },
    { wait: 900, cue: null, run: (demo) => demo.pickSlot(scene.slot) },
    { wait: 600, cue: { confirm: true } },
    { wait: 4200, cue: null, run: (demo) => demo.confirm() },
  ];
}

function useInView(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}

function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return allowed;
}

export function useBookingAutoplay(demo: BookingDemo, ref: RefObject<HTMLElement | null>) {
  const inView = useInView(ref);
  const motionAllowed = useMotionAllowed();
  const [paused, setPaused] = useState(false);
  const [cue, setCue] = useState<BookingCue>(null);

  const demoRef = useRef(demo);
  const sceneRef = useRef(0);
  const stepRef = useRef(0);
  const idleRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    demoRef.current = demo;
  });

  const playing = inView && motionAllowed && !paused;

  useEffect(() => {
    if (!playing) return;
    let timer: number | undefined;

    const tick = () => {
      const steps = stepsFor(AUTOPLAY_SCENES[sceneRef.current % AUTOPLAY_SCENES.length]);
      const step = steps[stepRef.current];
      step.run?.(demoRef.current);
      setCue(step.cue);
      timer = window.setTimeout(() => {
        stepRef.current += 1;
        if (stepRef.current >= steps.length) {
          stepRef.current = 0;
          sceneRef.current += 1;
        }
        tick();
      }, step.wait);
    };

    tick();
    return () => {
      window.clearTimeout(timer);
      setCue(null);
    };
  }, [playing]);

  useEffect(() => () => window.clearTimeout(idleRef.current), []);

  const interact = useCallback(() => {
    setPaused(true);
    stepRef.current = 0;
    window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  const controlled: BookingDemo = {
    ...demo,
    pickDay: (day) => {
      interact();
      demo.pickDay(day);
    },
    pickSlot: (slot) => {
      interact();
      demo.pickSlot(slot);
    },
    confirm: () => {
      interact();
      demo.confirm();
    },
    reset: () => {
      interact();
      demo.reset();
    },
  };

  return { demo: controlled, cue, playing };
}
