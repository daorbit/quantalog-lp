import Link from "next/link";
import { productNav, site } from "@/lib/site";
import { AppMark } from "./apps-carousel/app-marks";
import { MENU_LINK_ICONS, PRODUCT_MARKS } from "./menus/product-menu-icons";

const secondary = [
  {
    title: "Get started",
    links: [
      { href: `${site.app}/signup`, label: "Start free" },
      { href: `${site.app}/login`, label: "Try the live demo" },
      { href: "/plans", label: "Pricing" },
      { href: "/contact", label: "Talk to us" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/blog", label: "Blog" },
      { href: "/compare", label: "Comparisons" },
      { href: "/about", label: "About" },
    ],
  },
];

export function ProductMenu() {
  return (
    <div className="mx-auto grid max-w-360 grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-12 px-4 pb-12 pt-8 sm:px-6">
      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Explore {site.name}</p>
        <ul className="mt-4 grid grid-cols-2 gap-1">
          {productNav.map((item) => {
            const mark = PRODUCT_MARKS[item.href];
            return (
              <li key={item.href} className="menu-reveal">
                <Link
                  href={item.href}
                  className="flex items-start gap-3 rounded-[10px] p-2.5 transition-colors duration-200 hover:bg-bg-subtle"
                >
                  {mark && <AppMark mark={mark} name="" size="sm" />}
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold leading-tight tracking-tight text-fg">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-fg-muted">{item.blurb}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {secondary.map((col) => (
        <div key={col.title}>
          <p className="menu-reveal text-[12px] text-fg-faint">{col.title}</p>
          <ul className="mt-4 space-y-3.5">
            {col.links.map((link) => {
              const Icon = MENU_LINK_ICONS[link.label];
              return (
                <li key={link.label} className="menu-reveal">
                  <a
                    href={link.href}
                    className="group/link inline-flex items-center gap-2.5 text-[14px] font-medium text-fg transition-colors hover:text-accent"
                  >
                    {Icon && (
                      <Icon
                        className="h-4 w-4 text-fg-faint transition-colors group-hover/link:text-accent"
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
