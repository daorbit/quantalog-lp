"use client";

import { useLayoutEffect, type RefObject } from "react";

export function useAutoResize(ref: RefObject<HTMLTextAreaElement | null>, value: string) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const max = parseFloat(getComputedStyle(el).maxHeight) || Number.POSITIVE_INFINITY;
    const full = el.scrollHeight;
    const overflowing = full > max;
    el.style.height = `${Math.min(full, max)}px`;
    el.style.overflowY = overflowing ? "auto" : "hidden";
    if (!overflowing) el.scrollTop = 0;
  }, [ref, value]);
}
