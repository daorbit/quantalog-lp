"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { nav, productNav, site } from "@/lib/site";
import { track } from "@/lib/track";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // The product menu opens on hover and has no close state — after clicking an
  // item the cursor is still on the panel, so it hangs over the new page until
  // you move away. This dismisses it for a moment on click, long enough for the
  // route to change and the pointer to leave.
  const [menuDismissed, setMenuDismissed] = useState(false);

  const dismissMenu = () => {
    setMenuDismissed(true);
    window.setTimeout(() => setMenuDismissed(false), 400);
  };

  /* The bar only earns a background once there is content behind it. At the
     top of the page it stays transparent so the hero reads as one ground. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      data-scrolled={scrolled || open || undefined}
      className="site-header sticky top-0 z-50 transition-colors duration-200"
    >
      {/* Solid rather than frosted once scrolled: the bar passes over the
          dashboard preview and the chart fills, and a translucent surface lets
          those shapes slide through the nav links as the page moves. */}
      <div>
        {/* Three flex columns rather than an absolutely positioned centre.
            Absolute took the nav out of flow, so it reserved no width and the
            account buttons ran straight over the top of it on any viewport
            narrow enough for the two to meet. The outer columns share the
            leftover space equally, which keeps the pill optically centred
            while every group still occupies real layout. */}
        <div className="flex h-13 items-center gap-4 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Plain links now that the bar itself carries a surface. The pill
              they used to sit in was a second frosted layer on top of a
              frosted bar, which read as two panes of glass rather than one. */}
          <nav
            className="hidden shrink-0 items-center gap-0.5 lg:flex"
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
            <div
              className={`invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
                menuDismissed ? "invisible! opacity-0! pointer-events-none" : ""
              }`}
            >
              <div className="glass-strong overflow-hidden rounded-2xl p-1.5 shadow-float">
                {productNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.currentTarget.blur();
                      dismissMenu();
                    }}
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
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13.5px] text-fg-muted transition-colors duration-200 hover:bg-surface hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2">
            {/* Paired with the primary CTA as two adjacent chips, the way the
                reference does it — a bare text link beside a solid button
                reads as an afterthought rather than the second option. */}
            <a
              href={`${site.app}/login`}
              onClick={() => track("sign_in", { location: "header" })}
              className="glass hidden whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] text-fg-muted transition-all duration-200 hover:text-fg lg:inline-flex"
            >
              Sign in
            </a>
            <a
              href={`${site.app}/signup`}
              onClick={() => track("cta_start_free", { location: "header" })}
              className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[13.5px] font-medium text-accent-fg shadow-soft transition-all duration-200 hover:brightness-110 lg:inline-flex"
            >
              Start free
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="glass inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-fg transition lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100svh-3rem)] overflow-y-auto border-t border-border bg-bg lg:hidden">
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
