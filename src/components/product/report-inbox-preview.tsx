import { GeoBars, SparkStat } from "../charts";

export function ReportInboxPreview() {
  return (
    <div className="tile tile--static overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4 sm:px-8">
        <p className="text-[15px] font-semibold tracking-tight text-fg">Monthly summary — acme.com</p>
        <p className="text-[12px] text-fg-faint">1–31 August vs 1–31 July</p>
      </div>

      <p className="border-b border-border px-6 py-5 text-pretty text-[15px] leading-relaxed text-fg-muted sm:px-8">
        <span className="mr-2 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
          AI summary
        </span>
        Visitors rose 12% on the back of the August launch post, and bounce rate improved as more people
        arrived on the pricing page directly. Worth adding a signup prompt to the launch post.
      </p>

      <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <SparkStat
          label="Visitors"
          value="48,210"
          delta="+12.4%"
          series={[28, 31, 30, 34, 33, 38, 36, 41, 39, 44, 43, 46, 45, 48]}
        />
        <SparkStat
          label="Pageviews"
          value="121,880"
          delta="+8.1%"
          series={[70, 74, 72, 78, 77, 82, 80, 86, 84, 89, 88, 93, 91, 95]}
          delay={0.1}
        />
        <SparkStat
          label="Bounce rate"
          value="41.3%"
          delta="−3.2%"
          up={false}
          series={[52, 51, 51, 49, 50, 48, 47, 47, 45, 44, 44, 43, 42, 41]}
          delay={0.2}
        />
      </div>

      <div className="border-t border-border p-6 sm:p-8">
        <p className="text-[13px] font-medium text-fg-faint">Top countries</p>
        <div className="mt-4">
          <GeoBars
            rows={[
              { flag: "🇺🇸", label: "United States", views: 19420, pct: 40 },
              { flag: "🇩🇪", label: "Germany", views: 8630, pct: 18 },
              { flag: "🇬🇧", label: "United Kingdom", views: 6270, pct: 13 },
              { flag: "🇮🇳", label: "India", views: 4810, pct: 10 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
