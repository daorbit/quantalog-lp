"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { ProductMenu } from "./product-menu";
import { MenuToggle } from "./mobile-nav/menu-toggle";
import { MobileMenu } from "./mobile-nav/mobile-menu";
import { nav, site } from "@/lib/site";
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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (

    <header
      className="site-header sticky top-0 z-50"
      data-docs={isDocs || undefined}
      data-menu-open={open || undefined}
    >

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
            {!open && (
              <a
                href={`${site.app}/signup`}
                onClick={() => track("cta_start_free", { location: "mobile_header" })}
                className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full bg-cta px-3.5 text-[13px] font-semibold text-cta-fg transition-colors duration-200 hover:bg-cta-hover lg:hidden"
              >
                Start free
              </a>
            )}
            <MenuToggle open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
        </div>
      </div>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
