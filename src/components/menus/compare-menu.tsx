import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getAllComparisons } from "@/lib/comparisons";
import { site } from "@/lib/site";
import { BrandGlyph } from "../compare/brand-badge";

const REASONS = [
  "No cookie banner to lose visitors to",
  "Live numbers, not a 24-hour delay",
  "SEO audits and forms in the same plan",
  "Every visitor counted, never sampled",
];

const NEXT_STEPS = [
  { href: "/compare", label: "All comparisons" },
  { href: "/plans", label: "Pricing" },
  { href: `${site.app}/login`, label: "Try the live demo" },
  { href: "/contact", label: "Talk to us" },
];

export function CompareMenu() {
  return (
    <div className="mx-auto grid max-w-360 grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-12 px-4 pb-14 pt-8 sm:px-8 lg:px-12">
      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">{site.name} vs</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
          {getAllComparisons().map((c) => (
            <li key={c.slug} className="menu-reveal">
              <Link
                href={`/compare/${c.slug}`}
                className="inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-fg transition-colors hover:text-accent"
              >
                <BrandGlyph icon={c.logo} size={18} />
                {c.rival}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Why teams switch</p>
        <ul className="mt-4 space-y-3">
          {REASONS.map((reason) => (
            <li key={reason} className="menu-reveal flex items-start gap-2 text-[14px] text-fg-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="menu-reveal text-[12px] text-fg-faint">Next steps</p>
        <ul className="mt-4 space-y-3">
          {NEXT_STEPS.map((link) => (
            <li key={link.label} className="menu-reveal">
              <a
                href={link.href}
                className="group/item inline-flex items-center gap-1.5 text-[14px] font-medium text-fg transition-colors hover:text-accent"
              >
                {link.label}
                <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover/item:opacity-100" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
