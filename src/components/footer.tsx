import Link from "next/link";
import {
  BookOpen, Bot, Building2, CalendarClock, Code2, EyeOff, FileText,
  LayoutGrid, Lock, Mail, Newspaper, PlayCircle, Scale, Scroll, Search, Tag,
} from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

/**
 * The footer's columns.
 *
 * Four narrow ones rather than three wide: a footer is where someone goes when
 * the page has not answered their question, and a column per intent — what it
 * does, how it compares, what to read, who we are — is faster to scan than the
 * same links pooled under two headings.
 *
 * Each link carries an icon for the same reason the header's menu does: at this
 * size the icons are the thing the eye lands on, and a column of bare text is
 * read as a list rather than as a set of choices.
 */
const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features", icon: LayoutGrid },
      { href: "/seo-audits", label: "SEO audits", icon: Search },
      { href: "/reports", label: "Reports", icon: FileText },
      { href: "/platform-api", label: "Platform API", icon: Code2 },
      { href: "/#scheduling", label: "Scheduled posts", icon: CalendarClock },
      { href: "/#pricing", label: "Pricing", icon: Tag },
    ],
  },
  {
    title: "Why Quantalog",
    links: [
      { href: "/#consent-gap", label: "The consent gap", icon: EyeOff },
      { href: "/#orbit", label: "Orbit AI", icon: Bot },
      { href: "/compare", label: "Comparisons", icon: Scale },
      { href: "/#demo", label: "Live demo", icon: PlayCircle },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/docs", label: "Documentation", icon: BookOpen },
      { href: "/blog", label: "Blog", icon: Newspaper },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About", icon: Building2 },
      { href: "/contact", label: "Contact", icon: Mail },
      { href: "/privacy", label: "Privacy", icon: Lock },
      { href: "/terms", label: "Terms", icon: Scroll },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.description}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1 text-[11px] text-fg-muted">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
              All systems operational
            </p>
            <a
              href="https://www.producthunt.com/products/quantalog?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-quantalog"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block transition-opacity hover:opacity-80"
            >
              <img
                alt="Quantalog - Your analytics miss up to half your traffic. | Product Hunt"
                width="250"
                height="54"
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1212963&theme=light&t=1787486723092"
              />
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const Icon = link.icon;
                  const body = (
                    <>
                      <Icon
                        className="h-3.5 w-3.5 shrink-0 text-fg-faint transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                      {link.label}
                    </>
                  );
                  const cls =
                    "group inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg";

                  return (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a href={link.href} className={cls}>
                          {body}
                        </a>
                      ) : (
                        <Link href={link.href} className={cls}>
                          {body}
                        </Link>
                      )}
                    </li>
                  );
                })}
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
