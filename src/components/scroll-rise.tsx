"use client";

import { useEffect } from "react";

const SELECTOR = ".v-rise, .text-reveal, .map-stage";

export const MOTION_BOOT_SCRIPT =
  "(function(){var d=document.documentElement;if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-io');setTimeout(function(){if(!d.dataset.motionReady)d.classList.remove('motion-io')},4000)})()";

export function ScrollRise() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion-io")) return;
    root.dataset.motionReady = "1";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    const watch = (scope: ParentNode) => {
      if (scope instanceof Element && scope.matches(SELECTOR)) io.observe(scope);
      scope.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("in-view")) io.observe(el);
      });
    };

    watch(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
