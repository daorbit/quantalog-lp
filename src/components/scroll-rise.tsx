"use client";

import { useEffect } from "react";

/**
 * Makes `.v-rise` scroll-driven on browsers that lack `animation-timeline`.
 *
 * Chrome ties `.v-rise` to scroll position natively via `animation-timeline:
 * view()`. Where that is unsupported the CSS falls back to a load-fired
 * animation, which means a section far down the page finishes animating before
 * anyone scrolls to it. This component covers that gap and nothing else:
 *
 *  - it does nothing at all when scroll-timeline is supported;
 *  - it sets `.no-scroll-timeline` on <html>, which the stylesheet uses to
 *    pause `.v-rise` until `.in-view` is added here;
 *  - content is never removed from the DOM and only opacity/transform move,
 *    so crawlers and reduced-motion users are unaffected either way.
 *
 * Mounted once, near the root.
 */
export function ScrollRise() {
  useEffect(() => {
    // Native scroll-timeline handles it — leave every v-rise alone.
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
