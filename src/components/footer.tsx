import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { SocialLinks } from "./social-links";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/seo-audits", label: "SEO audits" },
      { href: "/search-visibility", label: "Search visibility" },
      { href: "/reports", label: "Reports" },
      { href: "/platform-api", label: "Platform API" },
      { href: "/#scheduling", label: "Scheduled posts" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Why Quantalog",
    links: [
      { href: "/#consent-gap", label: "The consent gap" },
      { href: "/#orbit", label: "Orbit AI" },
      { href: "/compare", label: "Comparisons" },
      { href: "/#demo", label: "Live demo" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
  { href: "/docs", label: "Docs" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-muted">
              {site.description}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-fg-muted">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
              All systems operational
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-[13px] font-semibold text-fg">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="footer-wordmark mt-16 sm:mt-20" aria-hidden="true">
          {site.name}
        </p>

        <div className="flex flex-col items-center gap-6 border-t border-border py-8 lg:flex-row lg:justify-between">
          <p className="text-[14px] text-fg-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-fg transition-colors hover:text-fg-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <SocialLinks />
            <ThemeToggle />
          </div>
        </div>

        <p className="mx-auto max-w-4xl pb-10 text-center text-[11px] leading-relaxed text-fg-faint">
          {site.name} is operated by {site.legalName}. No cookies, no
          cross-site tracking and no personal data stored — GDPR-ready by
          design. For questions about the company or the service, contact{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-fg">
            {site.email}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
