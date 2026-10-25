"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { ProductMenu } from "./product-menu";
import { MenuToggle } from "./mobile-nav/menu-toggle";
import { MobileMenu } from "./mobile-nav/mobile-menu";
import { LanguageMenu } from "./language/language-menu";
import { MobileLanguageTrigger } from "./language/mobile-language-trigger";
import { MobileLanguageMenu } from "./language/mobile-language-menu";
import { useActiveLanguage } from "./use-active-language";
import { nav, site } from "@/lib/site";
import { track } from "@/lib/track";

type MobilePanel = "menu" | "language" | null;

export function Header({ menus = {} }: { menus?: Partial<Record<string, ReactNode>> }) {
  const [panel, setPanel] = useState<MobilePanel>(null);
  const open = panel !== null;
  const closePanel = useCallback(() => setPanel(null), []);
  const activeLanguage = useActiveLanguage();
  const pathname = usePathname();
  const isDocs = pathname === "/docs" || pathname.startsWith("/docs/");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setPanel(null);
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

          <MegaMenu label="Product">
            <ProductMenu />
          </MegaMenu>

          {nav.map((item) => menus[item.href] ? (
            <MegaMenu key={item.href} label={item.label} href={item.href}>
              {menus[item.href]}
            </MegaMenu>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3.5 py-1.5 text-[13px] text-fg transition-colors duration-200 hover:text-fg-muted"
            >
              {item.label}
            </Link>
          ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2 self-stretch">
            <div className="hidden self-stretch lg:flex">
              <LanguageMenu />
            </div>
            <MobileLanguageTrigger
              active={activeLanguage}
              open={panel === "language"}
              onToggle={() => setPanel((p) => (p === "language" ? null : "language"))}
            />

            <a
              href={`${site.app}/signup`}
              onClick={() => track("cta_start_free", { location: "header" })}
              className="group hidden h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-cta px-3.5 text-[13px] font-semibold text-cta-fg transition-colors duration-200 hover:bg-cta-hover lg:inline-flex"
            >
              Start free
              <ArrowRight className="h-3 w-3" />
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
            <MenuToggle open={open} onToggle={() => setPanel((p) => (p ? null : "menu"))} />
          </div>
        </div>
      </div>

      {panel === "menu" && <MobileMenu onClose={closePanel} />}
      {panel === "language" && <MobileLanguageMenu active={activeLanguage} onClose={closePanel} />}
    </header>
  );
}
