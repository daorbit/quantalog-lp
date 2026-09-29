import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ProductFeature = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
  href?: string;
};

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

function FeatureBody({ feature: f }: { feature: ProductFeature }) {
  return (
    <>
      <span className="flex items-start justify-between gap-3">
        <f.icon className="h-7 w-7 text-accent" strokeWidth={1.6} />
        {f.href && (
          <ArrowUpRight
            className="h-4 w-4 text-fg-faint transition-colors duration-200 group-hover:text-accent"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="mt-auto block pt-8 text-[1.0625rem] font-semibold tracking-tight text-fg sm:pt-10 sm:text-[1.125rem]">
        {f.title}
      </span>
      <span className="mt-1.5 block text-pretty text-[14px] leading-relaxed text-fg-muted">{f.body}</span>
    </>
  );
}

export function ProductFeatureGrid({
  features,
  columns = 3,
}: {
  features: readonly ProductFeature[];
  columns?: keyof typeof COLUMNS;
}) {
  return (
    <ul className={`grid gap-3 sm:gap-4 ${COLUMNS[columns]}`}>
      {features.map((f, i) => (
        <li key={f.title} className={`v-rise v-d${(i % 4) + 1}`}>
          {f.href ? (
            <Link href={f.href} className="tile group flex h-full flex-col p-6 sm:p-7">
              <FeatureBody feature={f} />
            </Link>
          ) : (
            <div className="tile tile--static flex h-full flex-col p-6 sm:p-7">
              <FeatureBody feature={f} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
