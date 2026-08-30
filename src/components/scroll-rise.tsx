"use client";

import { useEffect } from "react";

export function ScrollRise() {
  useEffect(() => {

    if (
      typeof CSS !== "undefined" &&
      CSS.supports?.("animation-timeline: view()")
    ) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;

    const root = document.documentElement;
    root.classList.add("no-scroll-timeline");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    const els = document.querySelectorAll<HTMLElement>(".v-rise");
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("no-scroll-timeline");
    };
  }, []);

  return null;
}
