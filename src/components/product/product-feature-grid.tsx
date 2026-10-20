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
      <f.icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
      <span className="mt-4 flex items-center gap-1.5 text-[16px] font-semibold tracking-tight text-fg">
        {f.title}
        {f.href && (
          <ArrowUpRight
            className="h-3.5 w-3.5 text-fg-faint transition-colors duration-200 group-hover:text-accent"
            aria-hidden="true"
          />
        )}
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
    <ul className={`grid gap-x-10 gap-y-10 sm:gap-y-12 ${COLUMNS[columns]}`}>
      {features.map((f) => (
        <li key={f.title} className="border-t border-border pt-6">
          {f.href ? (
            <Link href={f.href} className="group block">
              <FeatureBody feature={f} />
            </Link>
          ) : (
            <div>
              <FeatureBody feature={f} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
