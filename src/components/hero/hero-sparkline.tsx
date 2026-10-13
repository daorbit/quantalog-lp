import { linePath, plot } from "@/lib/chart-path";

export function HeroSparkline({ values }: { values: number[] }) {
  return (
    <svg viewBox="0 0 56 18" className="h-4.5 w-14" preserveAspectRatio="none">
      <path
        d={linePath(plot(values, 56, 18, Math.max(...values), 2))}
        fill="none"
        stroke="var(--fg-muted)"
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
