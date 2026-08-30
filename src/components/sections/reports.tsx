import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarClock, FileSpreadsheet, MessageCircle, Users } from "lucide-react";
import { SectionHeading, GlowCard } from "../ui";

const points = [
  {
    icon: Users,
    title: "For the people who never log in",
    body: "Send to a client, a manager, anyone — no account needed, no seat to pay for. Every email carries its own unsubscribe, so nobody is stuck on a list.",
  },
  {
    icon: FileSpreadsheet,
    title: "The detail, attached",
    body: "A spreadsheet rides along with every send: top pages, referrers, channels, countries, devices, goals and SEO scores, each on its own sheet.",
  },
  {
    icon: CalendarClock,
    title: "Daily, weekly or monthly",
    body: "Pick the rhythm that matches how the work is reviewed. Pause a report when a project goes quiet and it keeps every setting for when it comes back.",
  },
  {
    icon: MessageCircle,
    title: "Email or WhatsApp",
    body: "Share the full report and its spreadsheet by email, and get a short version on your own WhatsApp the moment it goes out. Send yourself a copy first to check it.",
  },
];

const preview = [
  { label: "Visitors", value: "12,480", change: "+18%", up: true },
  { label: "Pageviews", value: "31,207", change: "+12%", up: true },
  { label: "Sessions", value: "15,932", change: "+9%", up: true },

  { label: "Bounce rate", value: "38%", change: "−4%", up: true },
];

function EmailPreview() {
  return (
    <div className="card overflow-hidden p-0">

      <div className="flex items-center gap-2 border-b border-border bg-bg-subtle px-5 py-3">
        <div className="text-[13px] font-semibold tracking-tight">
          Quantalog<span className="text-accent">.</span>
        </div>
        <div className="ml-auto text-[11px] text-fg-muted">Monday, 08:00</div>
      </div>

      <div className="p-5">
        <div className="text-[15px] font-semibold tracking-tight">Acme Store</div>
        <div className="mt-0.5 text-xs text-fg-muted">1 — 7 Jan 2026</div>

        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
          {preview.map((m) => (
            <div key={m.label} className="bg-bg p-3.5">
              <div className="text-[10px] uppercase tracking-wide text-fg-muted">{m.label}</div>
              <div className="mt-1 text-xl font-bold tracking-tight">{m.value}</div>
              <div
                className={`mt-0.5 flex items-center gap-1 text-[11px] ${
                  m.up ? "text-accent" : "text-red-400"
                }`}
              >
                {m.up ? (
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                )}
                {m.change}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-2.5">
          <FileSpreadsheet className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate text-xs text-fg-muted">acme-store-report.xlsx</span>
        </div>

        <div className="mt-3 rounded-lg bg-accent px-3 py-2 text-center text-xs font-semibold text-bg">
          Open live dashboard
        </div>
      </div>
    </div>
  );
}

export function Reports() {
  return (
    <section id="reports" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Reports"
          align="left"
          className="v-rise"
          title={
            <>
              The people who need the numbers
              <br className="hidden sm:block" />{" "}
              <span className="text-accent">rarely open dashboards.</span>
            </>
          }
          body="Send your traffic and SEO summary on a schedule — to yourself, your client, or whoever asked. Headline numbers up front, the full breakdown attached as a spreadsheet, and a copy on your own WhatsApp if you want one."
        />

        <div className="mt-12 grid sm:mt-14 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-3 sm:grid-cols-2">
            {points.map((p, i) => (
              <GlowCard
                key={p.title}
                className={`v-rise v-d${(i % 3) + 1} group p-6 sm:p-7`}
              >
                <p.icon
                  className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-h3 font-medium tracking-[-0.02em]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </GlowCard>
            ))}
          </div>

          <div className="v-rise v-d2" aria-hidden="true">
            <EmailPreview />
          </div>
        </div>

        <Link
          href="/reports"
          className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          Everything scheduled reports can do
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
