"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { nav, productNav, site } from "@/lib/site";
import { track } from "@/lib/track";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
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
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[13.5px] text-fg-muted transition-colors duration-200 group-hover:bg-bg-subtle group-hover:text-fg group-focus-within:bg-bg-subtle group-focus-within:text-fg"
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
              className="rounded-md px-3 py-1.5 text-[13.5px] text-fg-muted transition-colors duration-200 hover:bg-bg-subtle hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={`${site.app}/login`}
            onClick={() => track("sign_in", { location: "header" })}
            className="hidden rounded-md px-3 py-2 text-[13.5px] text-fg-muted transition-colors hover:text-fg md:inline-flex"
          >
            Sign in
          </a>
          <a
            href={`${site.app}/signup`}
            onClick={() => track("cta_start_free", { location: "header" })}
            className="group hidden items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[13.5px] font-medium text-accent-fg shadow-soft transition duration-200 hover:brightness-110 md:inline-flex"
          >
            Start free
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-fg transition hover:border-border-strong md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2" aria-label="Mobile">
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
                className="border-b border-border py-3.5 text-sm text-fg-muted transition hover:text-fg"
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
                className="border-b border-border py-3.5 text-sm text-fg-muted transition hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 py-4">
              <a
                href={`${site.app}/login`}
                onClick={() => track("sign_in", { location: "mobile_menu" })}
                className="flex-1 rounded-lg border border-border py-2.5 text-center text-sm text-fg"
              >
                Sign in
              </a>
              <a
                href={`${site.app}/signup`}
                onClick={() => track("cta_start_free", { location: "mobile_menu" })}
                className="flex-1 rounded-lg bg-accent py-2.5 text-center text-sm font-medium text-accent-fg"
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
