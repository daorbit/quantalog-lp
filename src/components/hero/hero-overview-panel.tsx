import Image from "next/image";
import { ChevronDown, Share2 } from "lucide-react";
import { KPIS, PAGES } from "./hero-data";
import { HeroLineChart } from "./hero-line-chart";
import { HeroSparkline } from "./hero-sparkline";

const TABS = ["Overview", "Pages", "Sources", "Goals", "Funnels"];
const RANGES = ["24h", "7d", "30d"];

function deltaClass(good: boolean) {
  return good ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400";
}

export function HeroOverviewPanel() {
  return (
    <div className="hero-panel hero-in hero-in--main min-w-0 overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
        <Image src="/favicon-rounded.png" alt="" width={20} height={20} className="rounded-md" />
        <span className="flex items-center gap-1 text-[12.5px] font-medium">
          acme.com
          <ChevronDown className="h-3.5 w-3.5 text-fg-faint" />
        </span>
        <span className="text-[12.5px] text-fg-faint">/</span>
        <span className="text-[12.5px] text-fg-muted">Overview</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden gap-0.5 rounded-md border border-border p-0.5 sm:flex">
            {RANGES.map((range) => (
              <span
                key={range}
                className={`rounded px-2 py-0.5 text-[11px] ${range === "7d" ? "bg-fg/8 font-medium text-fg" : "text-fg-faint"}`}
              >
                {range}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[11px] font-medium text-fg-muted">
            <Share2 className="h-3 w-3" />
            Share
          </span>
        </div>
      </div>

      <div className="flex gap-5 border-b border-border px-4">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className={`-mb-px border-b py-2.5 text-[12px] ${
              i === 0 ? "border-fg font-medium text-fg" : "border-transparent text-fg-faint"
            } ${i > 2 ? "hidden sm:inline" : ""}`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
        {KPIS.map(({ label, value, delta, good }, i) => (
          <div
            key={label}
            style={{ ["--i" as string]: i }}
            className={`hero-kpi px-4 py-3.5 ${i % 2 === 1 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}
          >
            <p className="text-[11.5px] text-fg-faint">{label}</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-[19px] font-semibold tracking-[-0.02em] tabular-nums">{value}</span>
              <span className={`text-[11px] font-medium tabular-nums ${deltaClass(good)}`}>{delta}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="border-b border-border px-4 pb-3 pt-4">
        <div className="mb-3 flex items-center gap-4 text-[11px] text-fg-faint">
          <span className="text-[12px] font-medium text-fg">Visitors</span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 rounded-full bg-accent" />
            This week
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 border-t border-dashed border-fg-faint" />
            Last week
          </span>
        </div>
        <HeroLineChart />
      </div>

      <table className="hidden w-full text-[12px] sm:table">
        <thead>
          <tr className="text-left text-[11px] text-fg-faint">
            <th className="px-4 py-2 font-normal">Page</th>
            <th className="px-4 py-2 text-right font-normal">Visitors</th>
            <th className="px-4 py-2 text-right font-normal">Change</th>
            <th className="px-4 py-2 text-right font-normal">Last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {PAGES.map(({ path, visitors, delta, trend }, i) => (
            <tr key={path} className="hero-row border-t border-border" style={{ ["--i" as string]: i }}>
              <td className="px-4 py-2 font-mono text-[11.5px]">{path}</td>
              <td className="px-4 py-2 text-right font-medium tabular-nums">{visitors}</td>
              <td className={`px-4 py-2 text-right tabular-nums ${deltaClass(true)}`}>{delta}</td>
              <td className="px-4 py-2">
                <span className="flex justify-end">
                  <HeroSparkline values={trend} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
