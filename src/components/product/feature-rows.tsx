import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type FeatureRow = {
  eyebrow: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
  visual: ReactNode;
};

export function FeatureRows({ rows }: { rows: readonly FeatureRow[] }) {
  return (
    <div className="space-y-20 sm:space-y-28">
      {rows.map((row, i) => (
        <article
          key={row.title}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
        >
          <div className={i % 2 ? "lg:order-2" : undefined}>
            <p className="text-[15px] font-semibold text-accent">{row.eyebrow}</p>
            <h3 className="mt-3 text-balance text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em] text-fg sm:text-[2.25rem]">
              {row.title}
            </h3>
            <p className="mt-4 max-w-md text-pretty text-[16px] leading-relaxed text-fg-muted sm:text-[17px]">{row.body}</p>
            {row.link && (
              <Link
                href={row.link.href}
                className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
              >
                {row.link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="min-w-0">{row.visual}</div>
        </article>
      ))}
    </div>
  );
}
