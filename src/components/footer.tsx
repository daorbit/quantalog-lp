import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/seo-audits", label: "SEO audits" },
      { href: "/reports", label: "Reports" },
      { href: "/platform-api", label: "Platform API" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/docs", label: "Docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/compare", label: "Comparisons" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: site.github, label: "GitHub", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.description}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1 text-[11px] text-fg-muted">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
              All systems operational
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-xs text-fg-faint">
              No cookies. No cross-site tracking. GDPR-ready.
            </p>
            {/* Appearance is a preference you set once, not a primary action —
                it belongs down here rather than beside the sign-up CTA. */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
