import { SectionHeading } from "../ui";
import { CohortGrid, Funnel } from "../charts";
import { GoalsVisual } from "../dashboards/goals-visual";
import { FeatureRows, type FeatureRow } from "../product/feature-rows";
import { RevealOnView } from "../product/reveal-on-view";

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

const ROWS: FeatureRow[] = [
  {
    eyebrow: "Funnels",
    title: "See the exact step people give up.",
    body: "Line up pages and events in order and Quantalog shows how many reach each one, and how many leave between them.",
    link: { label: "How funnels work", href: "/docs/funnels" },
    visual: (
      <RevealOnView className="min-h-96">
        <Funnel steps={FUNNEL} />
      </RevealOnView>
    ),
  },
  {
    eyebrow: "Goals",
    title: "Targets that fill in by themselves.",
    body: "Set a monthly or quarterly number for visitors, signups or form responses, and watch it track against your live data, with pace built in.",
    link: { label: "Set your first goal", href: "/docs/goals" },
    visual: (
      <RevealOnView className="flex min-h-80 items-center justify-center">
        <GoalsVisual />
      </RevealOnView>
    ),
  },
  {
    eyebrow: "Retention",
    title: "Find out who comes back.",
    body: "Weekly cohorts show what share of each week's visitors return, so you can tell a launch spike from an audience that sticks.",
    link: { label: "Reading cohorts", href: "/docs/retention" },
    visual: (
      <RevealOnView className="min-h-64">
        <CohortGrid rows={COHORTS} weeks={["W0", "W1", "W2", "W3", "W4", "W5"]} />
      </RevealOnView>
    ),
  },
];

export function Analytics() {
  return (
    <section id="analytics" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading
          eyebrow="Built in"
          title="The answers, not just the counts."
          body="Funnels, goals and retention come with every plan, drawn from the same event stream with no extra tags."
          centered
        />
        <div className="mt-16 sm:mt-24">
          <FeatureRows rows={ROWS} />
        </div>
      </div>
    </section>
  );
}
