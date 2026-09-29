"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ProductMenu } from "./product-menu";
import { nav, productNav, site } from "@/lib/site";
import { track } from "@/lib/track";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDocs = pathname === "/docs" || pathname.startsWith("/docs/");

  const [menuDismissed, setMenuDismissed] = useState(false);

  const dismissMenu = () => {
    setMenuDismissed(true);
    window.setTimeout(() => setMenuDismissed(false), 400);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (

    <header className="site-header sticky top-0 z-50" data-docs={isDocs || undefined}>

      <div>

        <div className="site-header__bar mx-auto flex h-12 max-w-360 items-center gap-4 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <nav
            className="hidden shrink-0 items-center gap-1 self-stretch lg:flex"
            aria-label="Main"
          >

          <div className={`mega group flex h-full items-center ${menuDismissed ? "mega--dismissed" : ""}`}>
            <button
              type="button"
              aria-haspopup="true"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[13px] text-fg transition-colors duration-200 group-hover:text-fg-muted group-focus-within:text-fg-muted"
            >
              Product
              <ChevronDown
                className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                aria-hidden="true"
              />
            </button>

            <div className="mega__panel">
              <ProductMenu
                onNavigate={(el) => {
                  el.blur();
                  dismissMenu();
                }}
              />
            </div>
            <div className="mega__scrim" aria-hidden="true" />
          </div>

          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3.5 py-1.5 text-[13px] text-fg transition-colors duration-200 hover:text-fg-muted"
            >
              {item.label}
            </Link>
          ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2">

            <a
              href={`${site.app}/login`}
              onClick={() => track("sign_in", { location: "header" })}
              className="hidden h-8 items-center whitespace-nowrap rounded-full px-3.5 text-[13px] font-medium text-fg transition-colors duration-200 hover:bg-bg-subtle lg:inline-flex"
            >
              Sign in
            </a>
            <a
              href={`${site.app}/signup`}
              onClick={() => track("cta_start_free", { location: "header" })}
              className="group hidden h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-cta px-3.5 text-[13px] font-semibold text-cta-fg transition-colors duration-200 hover:bg-cta-hover lg:inline-flex"
            >
              Start free
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg transition lg:hidden"
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

            <span className="pt-3 pb-1 text-[13px] font-semibold text-fg-faint">
              Product
            </span>
            {productNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-[15px] font-medium text-fg transition last:border-b-0 hover:text-fg-muted"
              >
                {item.label}
              </Link>
            ))}

            <span className="pt-5 pb-1 text-[13px] font-semibold text-fg-faint">
              More
            </span>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-[15px] font-medium text-fg transition last:border-b-0 hover:text-fg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 py-4">
              <a
                href={`${site.app}/login`}
                onClick={() => track("sign_in", { location: "mobile_menu" })}
                className="flex-1 rounded-full border border-border py-2.5 text-center text-[14px] font-medium text-fg"
              >
                Sign in
              </a>
              <a
                href={`${site.app}/signup`}
                onClick={() => track("cta_start_free", { location: "mobile_menu" })}
                className="flex-1 rounded-full bg-cta py-2.5 text-center text-[14px] font-semibold text-cta-fg"
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
