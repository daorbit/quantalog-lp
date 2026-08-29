import { SectionHeading, GlowCard } from "../ui";
import {
  CohortGrid,
  Donut,
  Funnel,
  Gauge,
  GeoBars,
  HourBars,
  SparkStat,
} from "../charts";

/**
 * The chart wall.
 *
 * The hero already shows one dashboard; this section exists to answer the
 * next question — "and what else can it draw?" — with the panels a buyer
 * would otherwise have to sign up to see: funnels, cohorts, the device split,
 * time of day, geography and goal progress.
 *
 * Every figure is a constant. Nothing here is sampled or fetched, so the
 * section renders identically on the server and stays statically exportable.
 */

const KPIS = [
  {
    label: "Visitors",
    value: "128,470",
    delta: "+18.2%",
    series: [42, 48, 45, 53, 61, 58, 66, 72, 69, 78, 84, 81, 92, 99],
  },
  {
    label: "Conversion rate",
    value: "4.8%",
    delta: "+0.9pt",
    series: [28, 31, 30, 34, 33, 38, 41, 39, 44, 47, 45, 52, 56, 61],
  },
  {
    label: "Avg. session",
    value: "2m 41s",
    delta: "+9.8%",
    series: [50, 52, 49, 55, 54, 58, 57, 62, 60, 66, 64, 70, 68, 74],
  },
  {
    label: "Bounce rate",
    value: "34.2%",
    delta: "−6.1%",
    up: false,
    series: [72, 70, 71, 66, 64, 65, 60, 58, 59, 54, 51, 49, 44, 41],
  },
];

const FUNNEL = [
  { label: "Landing page", count: 41203 },
  { label: "Pricing viewed", count: 18740 },
  { label: "Signup started", count: 7412 },
  { label: "Account created", count: 3186 },
  { label: "Tracker installed", count: 1974 },
];

const COHORTS = [
  { label: "Jul 07", size: 1840, values: [100, 62, 51, 44, 39, 36] },
  { label: "Jul 14", size: 2104, values: [100, 66, 55, 47, 42] },
  { label: "Jul 21", size: 2380, values: [100, 71, 58, 50] },
  { label: "Jul 28", size: 2612, values: [100, 74, 61] },
  { label: "Aug 04", size: 2947, values: [100, 78] },
];

const DEVICES = [
  { label: "Desktop", value: 5820 },
  { label: "Mobile", value: 4110 },
  { label: "Tablet", value: 720 },
  { label: "Other", value: 190 },
];

// A working day shaped curve: quiet overnight, a morning ramp, a lunch dip and
// an afternoon peak.
const HOURS = [
  12, 9, 7, 6, 6, 9, 18, 34, 56, 72, 84, 79, 63, 71, 88, 96, 91, 77, 62, 51,
  43, 34, 25, 17,
];

const GEO = [
  { flag: "🇺🇸", label: "United States", views: 5218, pct: 100 },
  { flag: "🇮🇳", label: "India", views: 3104, pct: 60 },
  { flag: "🇩🇪", label: "Germany", views: 1842, pct: 35 },
  { flag: "🇬🇧", label: "United Kingdom", views: 1390, pct: 27 },
  { flag: "🇧🇷", label: "Brazil", views: 902, pct: 17 },
];

/** A panel title, shared by every card in the wall so the grid reads as one. */
function PanelHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
        {title}
      </h3>
      {note && (
        <span className="shrink-0 text-[11px] tabular-nums text-fg-faint">{note}</span>
      )}
    </div>
  );
}

export function Analytics() {
  return (
    <section id="analytics" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Analytics"
          dot
          align="left"
          className="v-rise"
          title={
            <>
              Not a counter.
              <br className="hidden sm:block" /> A room full of charts.
            </>
          }
          body="Funnels, retention cohorts, device splits, time of day and geography — every panel below is a view you get on day one, drawn from the same event stream, with no extra tags to place."
        />

        {/* KPI strip: four numbers with their fourteen-day shape, so the row
            says which way each one is going and not only where it stands. */}
        <div className="card v-rise v-d2 mt-14 grid overflow-hidden divide-y divide-border sm:mt-16 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 [&>*:not(:last-child)]:sm:border-r [&>*]:sm:border-border">
          {KPIS.map((k, i) => (
            <SparkStat key={k.label} {...k} delay={i * 0.1} />
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {/* The funnel gets two columns: it is the panel a buyer is actually
              shopping for, and five stacked bars need the width to stay
              comparable. */}
          <GlowCard className="v-rise v-d1 p-6 sm:p-7 lg:col-span-2">
            <PanelHead title="Signup funnel · last 30 days" note="4.8% end to end" />
            <Funnel steps={FUNNEL} />
          </GlowCard>

          <GlowCard className="v-rise v-d2 flex flex-col justify-center p-6 sm:p-7">
            <PanelHead title="Goals" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              <Gauge pct={78} label="Trial → paid" caption="78 of 100 monthly target" />
              <Gauge pct={41} label="Docs → install" caption="41 of 100 monthly target" />
            </div>
          </GlowCard>

          <GlowCard className="v-rise v-d1 p-6 sm:p-7 lg:col-span-2">
            <PanelHead title="Weekly retention cohorts" note="% still active" />
            <CohortGrid
              rows={COHORTS}
              weeks={["W0", "W1", "W2", "W3", "W4", "W5"]}
            />
          </GlowCard>

          <GlowCard className="v-rise v-d2 p-6 sm:p-7">
            <PanelHead title="Devices" note="10,840" />
            <Donut slices={DEVICES} centerLabel="Sessions" centerValue="10.8k" />
          </GlowCard>

          <GlowCard className="v-rise v-d1 p-6 sm:p-7">
            <PanelHead title="Top countries" note="Views" />
            <GeoBars rows={GEO} />
          </GlowCard>

          <GlowCard className="v-rise v-d2 p-6 sm:p-7 lg:col-span-2">
            <PanelHead title="Traffic by hour · local time" note="Peak 15:00" />
            <HourBars values={HOURS} peakHour={15} />
          </GlowCard>
        </div>

        <p className="v-rise v-d3 mt-6 text-sm text-fg-faint">
          Sample data. Every panel is a standard view — none of it needs a
          custom dashboard build.
        </p>
      </div>
    </section>
  );
}
