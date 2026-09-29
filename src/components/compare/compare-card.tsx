import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VerdictBar } from "../charts";
import type { Comparison } from "@/lib/comparisons";
import { site } from "@/lib/site";
import { BrandBadge } from "./brand-badge";
import { tally } from "./compare-utils";

export function CompareCard({ comparison: c }: { comparison: Comparison }) {
  const t = tally(c);

  return (
    <Link href={`/compare/${c.slug}`} className="tile group flex h-full flex-col p-6 sm:p-8">
      <span className="flex items-center gap-3">
        <BrandBadge icon={c.logo} />
        <span className="min-w-0">
          <span className="block text-[13px] text-fg-muted">{site.name} vs</span>
          <span className="block truncate text-[1.25rem] font-semibold tracking-tight text-fg sm:text-[1.375rem]">
            {c.rival}
          </span>
        </span>
      </span>

      <span className="mt-6 block">
        <span className="text-[2.25rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-fg">
          {t.ours}
          <span className="text-fg-faint">/{t.total}</span>
        </span>
        <span className="mt-1.5 block text-[14px] text-fg-muted">points in {site.name}&apos;s favour</span>
      </span>

      <span className="mt-5 block">
        <VerdictBar ourName={site.name} rival={c.rival} ours={t.ours} tied={t.tied} theirs={t.theirs} />
      </span>

      <span className="mt-auto inline-flex items-center gap-1 pt-7 text-[15px] font-medium text-accent">
        Read the comparison
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
