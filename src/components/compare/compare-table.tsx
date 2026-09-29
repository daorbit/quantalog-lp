import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import type { ComparisonRow } from "@/lib/comparisons";
import { site } from "@/lib/site";
import { BrandGlyph } from "./brand-badge";
import { VerdictBadge } from "./verdict-badge";

export function CompareTable({
  rows,
  rival,
  logo,
}: {
  rows: ComparisonRow[];
  rival: string;
  logo: SimpleIcon;
}) {
  return (
    <div className="tile tile--static overflow-hidden">
      <div className="hidden border-b border-border md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <p className="px-6 py-4 text-[13px] font-medium text-fg-faint">What you&apos;re comparing</p>
        <p className="flex items-center gap-2 bg-accent/6 px-6 py-4 text-[13px] font-semibold text-accent">
          <Image src="/favicon.png" alt="" width={16} height={16} />
          {site.name}
        </p>
        <p className="flex items-center gap-2 px-6 py-4 text-[13px] font-semibold text-fg-muted">
          <BrandGlyph icon={logo} />
          {rival}
        </p>
      </div>

      <ul className="divide-y divide-border">
        {rows.map((row) => (
          <li
            key={row.point}
            className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-0 md:p-0"
          >
            <div className="md:px-6 md:py-5">
              <p className="text-[15px] font-semibold tracking-tight text-fg">{row.point}</p>
              <p className="mt-2">
                <VerdictBadge verdict={row.verdict} rival={rival} />
              </p>
            </div>
            <div className="rounded-xl bg-accent/6 p-3.5 md:rounded-none md:px-6 md:py-5">
              <p className="text-[12px] font-semibold text-accent md:hidden">{site.name}</p>
              <p className="mt-1 text-pretty text-[14.5px] leading-relaxed text-fg md:mt-0">{row.ours}</p>
            </div>
            <div className="rounded-xl bg-bg-subtle p-3.5 md:rounded-none md:bg-transparent md:px-6 md:py-5 dark:bg-surface md:dark:bg-transparent">
              <p className="text-[12px] font-semibold text-fg-muted md:hidden">{rival}</p>
              <p className="mt-1 text-pretty text-[14.5px] leading-relaxed text-fg-muted md:mt-0">{row.theirs}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
