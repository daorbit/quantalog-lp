"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { nav, productNav, site } from "@/lib/site";
import { track } from "@/lib/track";

export function Header() {
  const [open, setOpen] = useState(false);

  // The scroll listener that used to drive a background swap is gone with the
  // background itself — one less re-render on every scroll frame.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    /* The bar itself runs nearly edge to edge: the logo sits at the far left
       and the account controls at the far right, with only the nav links
       collected into a pill floating in the middle. Boxing all three groups
       inside one narrow container is what made the earlier version read as a
       toolbar rather than as chrome belonging to the page. */
    <header className="sticky top-0 z-40">
      {/* Scroll position, drawn by CSS scroll-timeline. No listener, no state:
          the previous `scrolled` boolean already costs a re-render on scroll,
          and this is free by comparison. */}
      <div
        className="scroll-progress h-px origin-left bg-accent/60"
        aria-hidden="true"
      />

      {/* Fully transparent — no fill, no hairline. The page shows straight
          through the bar at every scroll position; the nav pill is the only
          thing carrying a surface of its own. */}
      <div>
        <div className="relative flex h-16 items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />

          {/* The links sit in their own recessed pill, centred in the bar. It
              groups them as one object instead of three loose words floating
              between the logo and the buttons. */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-border/70 bg-bg-subtle/60 p-1 backdrop-blur md:flex"
            aria-label="Main"
          >
          {/* Hover and keyboard focus both open it, entirely in CSS —
              group-hover for the pointer, focus-within for Tab. No state, no
              outside-click listener, no close timer: the panel stays open
              because the cursor is still inside the group, which is the same
              condition that opened it.

              The panel is always mounted and hidden with opacity, so the links
              are in the DOM for a crawler whether or not anyone hovers. */}
          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13.5px] text-fg-muted transition-colors duration-200 group-hover:bg-surface group-hover:text-fg group-focus-within:bg-surface group-focus-within:text-fg"
            >
              Product
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden="true"
              />
            </button>

            {/* pt-2 rather than mt-2: the gap between trigger and panel has to
                be inside the hover target, or crossing it reads as leaving. */}
            <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-float">
                {productNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-bg-subtle"
                  >
                    <span className="block text-[13.5px] font-medium text-fg">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-fg-muted">
                      {item.blurb}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13.5px] text-fg-muted transition-colors duration-200 hover:bg-surface hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Paired with the primary CTA as two adjacent chips, the way the
                reference does it — a bare text link beside a solid button
                reads as an afterthought rather than the second option. */}
            <a
              href={`${site.app}/login`}
              onClick={() => track("sign_in", { location: "header" })}
              className="hidden rounded-full border border-border bg-surface/60 px-4 py-2 text-[13.5px] text-fg-muted backdrop-blur transition-all duration-200 hover:border-border-strong hover:text-fg md:inline-flex"
            >
              Sign in
            </a>
            <a
              href={`${site.app}/signup`}
              onClick={() => track("cta_start_free", { location: "header" })}
              className="group hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13.5px] font-medium text-accent-fg shadow-soft transition-all duration-200 hover:brightness-110 md:inline-flex"
            >
              Start free
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg transition hover:border-border-strong md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="bg-bg/95 backdrop-blur-xl md:hidden">
          <nav
            className="flex flex-col px-5 py-2 sm:px-8"
            aria-label="Mobile"
          >
            {/* No dropdown on a touch screen — the whole menu is already a
                vertical list, so the group just gets a heading. */}
            <span className="pt-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
              Product
            </span>
            {productNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-sm text-fg-muted transition last:border-b-0 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}

            <span className="pt-5 pb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
              More
            </span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-sm text-fg-muted transition last:border-b-0 hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 py-4">
              <a
                href={`${site.app}/login`}
                onClick={() => track("sign_in", { location: "mobile_menu" })}
                className="flex-1 rounded-full border border-border py-2.5 text-center text-sm text-fg"
              >
                Sign in
              </a>
              <a
                href={`${site.app}/signup`}
                onClick={() => track("cta_start_free", { location: "mobile_menu" })}
                className="flex-1 rounded-full bg-accent py-2.5 text-center text-sm font-medium text-accent-fg"
              >
                Start free
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
