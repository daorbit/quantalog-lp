import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
// import { SocialLinks } from "./social-links";
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
      { href: "/social", label: "Scheduled posts" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Why Quantalog",
    links: [
      { href: "/#consent-gap", label: "The consent gap" },
      { href: "/social", label: "Orbit AI" },
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
  { href: "/dpa", label: "Data Processing Addendum" },
  { href: "/contact", label: "Contact" },
  { href: "/docs", label: "Docs" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-6 sm:pt-16 lg:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
          <div className="col-span-2">
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

        <p className="footer-wordmark mt-12 sm:mt-20" aria-hidden="true">
          {site.name}
        </p>

        <div className="flex flex-col gap-5 border-t border-border py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-8">
          <nav aria-label="Legal" className="lg:order-2">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center lg:gap-x-8">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-fg transition-colors hover:text-fg-muted lg:text-[14px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-4 lg:contents">
            <p className="text-[13px] text-fg-muted lg:order-1 lg:text-[14px]">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-3 lg:order-3">
              {/* <SocialLinks /> */}
              <ThemeToggle />
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-4xl pb-8 text-[11px] leading-relaxed text-fg-faint sm:pb-10 sm:text-center">
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
