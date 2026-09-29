import Link from "next/link";
import { productNav, site } from "@/lib/site";

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

export function ProductMenu({ onNavigate }: { onNavigate: (el: HTMLElement) => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => onNavigate(e.currentTarget);

  return (
    <div className="mx-auto grid max-w-360 grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-12 px-4 pb-14 pt-8 sm:px-8 lg:px-12">
      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Explore {site.name}</p>
        <ul className="mt-4 space-y-2.5">
          {productNav.map((item) => (
            <li key={item.href} className="menu-reveal">
              <Link
                href={item.href}
                onClick={handleClick}
                className="text-[24px] font-semibold leading-tight tracking-tight text-fg transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {secondary.map((col) => (
        <div key={col.title}>
          <p className="menu-reveal text-[12px] text-fg-faint">{col.title}</p>
          <ul className="mt-4 space-y-3">
            {col.links.map((link) => (
              <li key={link.label} className="menu-reveal">
                <a
                  href={link.href}
                  onClick={handleClick}
                  className="text-[14px] font-medium text-fg transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
