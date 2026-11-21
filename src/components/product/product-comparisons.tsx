import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllComparisons, type ComparisonCategory } from "@/lib/comparisons";
import { site } from "@/lib/site";
import { RivalGlyph } from "../compare/brand-badge";

export function ProductComparisons({
  category,
  title,
  body,
}: {
  category: ComparisonCategory;
  title: string;
  body: string;
}) {
  const comparisons = getAllComparisons().filter((c) => c.category === category);
  if (!comparisons.length) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Compared</p>
            <h2 className="mt-3 text-balance text-[1.75rem] font-semibold tracking-tight text-fg sm:text-[2.25rem]">
              {title}
            </h2>
            <p className="mt-3 text-pretty text-[16px] leading-relaxed text-fg-muted sm:text-[17px]">{body}</p>
          </div>
          <Link
            href="/compare"
            className="inline-flex shrink-0 items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
          >
            All comparisons
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-x-10 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.map((c) => (
            <li key={c.slug} className="border-t border-border">
              <Link href={`/compare/${c.slug}`} className="group flex items-center gap-3 py-5">
                <RivalGlyph rival={c} size={20} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] text-fg-muted">{site.name} vs</span>
                  <span className="block truncate text-[1.0625rem] font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                    {c.rival}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-fg-faint transition-colors group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
