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

  const [menuDismissed, setMenuDismissed] = useState(false);

  const dismissMenu = () => {
    setMenuDismissed(true);
    window.setTimeout(() => setMenuDismissed(false), 400);
  };

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
      data-scrolled={scrolled || open || undefined}
      className="site-header sticky top-0 z-50 transition-colors duration-200"
    >

      <div>

        <div className="flex h-13 items-center gap-4 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <nav
            className="hidden shrink-0 items-center gap-0.5 lg:flex"
            aria-label="Main"
          >

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

            <a
              href={`${site.app}/login`}
              onClick={() => track("sign_in", { location: "header" })}
              className="glass hidden whitespace-nowrap rounded-lg px-3 py-1.5 text-[13px] text-fg-muted transition-all duration-200 hover:text-fg lg:inline-flex"
            >
              Sign in
            </a>
            <a
              href={`${site.app}/signup`}
              onClick={() => track("cta_start_free", { location: "header" })}
              className="group hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-cta px-3 py-1.5 text-[13px] font-medium text-cta-fg shadow-soft transition-all duration-200 hover:bg-cta-hover lg:inline-flex"
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
                className="flex-1 rounded-lg border border-border py-2 text-center text-[13px] text-fg"
              >
                Sign in
              </a>
              <a
                href={`${site.app}/signup`}
                onClick={() => track("cta_start_free", { location: "mobile_menu" })}
                className="flex-1 rounded-lg bg-cta py-2 text-center text-[13px] font-medium text-cta-fg"
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
