import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileSpreadsheet,
  MessageCircle,
  MessageSquareText,
  PauseCircle,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { SparkStat, GeoBars } from "@/components/charts";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * Scheduled reports, as a page rather than a homepage section.
 *
 * "Automated analytics reports" and "white label client reporting" are queries
 * an agency types before it has heard of this product, and a section anchor on
 * a homepage about something else cannot rank for them. This page carries the
 * feature on its own title, description and H1.
 */

const DESCRIPTION =
  "Automated analytics reports by email and WhatsApp. Send a scheduled traffic and SEO summary to clients or your team — opening with a plain-language AI read of what changed and why, headline numbers in the body, the full breakdown attached as an XLSX spreadsheet, no dashboard login required.";

const capabilities = [
  {
    icon: MessageSquareText,
    title: "It reads the numbers for them",
    body: "Every report opens with two or three sentences in plain language: what moved, the likely reason, and one thing worth doing about it. A client who would never interpret a bounce rate still learns their traffic spike came from Reddit and did not stick. Labelled as an AI summary, and switchable off per report.",
  },
  {
    icon: Users,
    title: "For the people who never log in",
    body: "Send to a client, a manager, a stakeholder — no account, no seat, no licence. The recipient reads the numbers in their inbox and never touches the dashboard. Every email carries its own unsubscribe link.",
  },
  {
    icon: FileSpreadsheet,
    title: "The full detail, attached",
    body: "A spreadsheet rides along with every send. Top pages, referrers, channels, countries, devices, goals and SEO scores, each on its own sheet — ready to pivot, chart or paste into a deck.",
  },
  {
    icon: CalendarClock,
    title: "Daily, weekly or monthly",
    body: "Pick the rhythm the work is actually reviewed on. A daily pulse during a launch, a monthly summary for a retainer client — each report keeps its own schedule and recipient list.",
  },
  {
    icon: MessageCircle,
    title: "Email and WhatsApp",
    body: "The full report and its spreadsheet go by email. A short version lands on your own WhatsApp the moment it sends, so you know what your client just read before they reply.",
  },
  {
    icon: PauseCircle,
    title: "Pause without losing setup",
    body: "A project goes quiet, the report pauses and keeps every setting — recipients, sections, schedule. Resume it months later and nothing needs rebuilding.",
  },
  {
    icon: Send,
    title: "Send yourself a test first",
    body: "Fire a one-off copy to your own address and read exactly what the client will get, before a schedule ever runs.",
  },
];

const included = [
  "A plain-language AI summary of what changed and why, above the numbers",
  "Visitors, pageviews, sessions and bounce rate, each against the previous period",
  "Top pages and entry pages",
  "Referrers, channels and UTM campaigns",
  "Countries, devices and browsers",
  "Conversion goals and their rates",
  "Custom events, with revenue where you send it",
  "SEO audit scores and what changed since the last run",
  "Core Web Vitals for mobile and desktop",
];

const faqs = [
  {
    q: "Can I send analytics reports to clients without giving them a login?",
    a: "Yes — that is what the feature is for. A recipient needs no account and occupies no seat. They receive the email, read the headline numbers and open the attached spreadsheet if they want the detail.",
  },
  {
    q: "What is the AI summary in a report?",
    a: "Two or three sentences at the top of the email explaining what changed over the period, the most likely reason for it, and one thing worth doing. It is written by a language model reading only your own figures from that report, and it is labelled as an AI summary so recipients know it is interpretation rather than measurement. It is on by default and can be switched off per report.",
  },
  {
    q: "Is my analytics data sent anywhere to generate the summary?",
    a: "Only the figures already in that report — the headline numbers and the top breakdowns — are sent to the model that writes the paragraph. No raw visitor records, nothing from other workspaces, and nothing that identifies an individual visitor. Turning the AI summary off for a report means nothing from it is sent at all.",
  },
  {
    q: "What format is the attachment?",
    a: "XLSX, readable by Excel, Numbers, LibreOffice and Google Sheets. Each dimension gets its own sheet rather than one flat dump, so a client can sort and pivot without cleaning the file first.",
  },
  {
    q: "How often can reports go out?",
    a: "Daily, weekly or monthly. Each report has its own schedule, so a daily pulse for one site and a monthly summary for another can run side by side from the same workspace.",
  },
  {
    q: "Do reports include SEO data as well as traffic?",
    a: "Yes. Audit scores, what changed since the previous run, and Core Web Vitals for mobile and desktop sit in the same report as the traffic numbers — which is the point of having both in one tool.",
  },
  {
    q: "Can I stop a report without deleting it?",
    a: "Pause it. Recipients, sections and schedule are all kept, and resuming picks up exactly where it left off.",
  },
];

export const metadata: Metadata = {
  title: "Automated analytics reports by email and WhatsApp",
  description: DESCRIPTION,
  alternates: { canonical: "/reports" },
  openGraph: {
    type: "website",
    url: `${site.url}/reports`,
    title: "Automated analytics reports by email and WhatsApp",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated analytics reports by email and WhatsApp",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
};

export default function ReportsPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/reports#page`,
      name: "Automated analytics reports by email and WhatsApp",
      description: DESCRIPTION,
      url: `${site.url}/reports`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/OgImage.png` },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/reports#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Reports", path: "/reports" },
    ])
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <JsonLd data={jsonLd} />

      <header className="max-w-3xl border-b border-border pb-12">
        <Eyebrow>Reports</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Automated analytics reports,
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">delivered where people read.</span>
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
          {DESCRIPTION}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`} size="lg">
            Start free — no card
          </Button>
          <Button href="/docs/email-reports" variant="secondary" size="lg">
            Read the docs
          </Button>
        </div>
      </header>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What a scheduled report does
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal
              key={c.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <c.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What is in every report
        </h2>
        <ul className="card mt-8 grid gap-x-8 gap-y-3 p-7 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* The list above says what a report contains; this shows it. Static
          sample figures — the page is statically exported, so nothing here
          fetches or randomises. */}
      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What lands in the inbox
        </h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          A monthly report for one site, with every number stated against the
          period before it — so a client reads the direction, not just the total.
        </p>

        <div className="card mt-8 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4">
            <p className="text-sm font-semibold tracking-tight">
              Monthly summary — acme.com
            </p>
            <p className="text-[11px] text-fg-faint">1–31 August vs 1–31 July</p>
          </div>

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

          <div className="border-t border-border p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-fg-faint">
              Top countries
            </p>
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
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Sharing without oversharing
        </h2>
        <div className="card mt-8 flex gap-5 p-7">
          <ShieldCheck className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-pretty leading-relaxed text-fg-muted">
            A report contains what you chose to put in it and nothing else. Your
            site keys, workspace settings, team members and raw event data are
            never part of a send. Recipients cannot reach the dashboard from the
            email, and removing someone from the list stops the next report
            immediately — there is no link to revoke afterwards.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Traffic and SEO in one send
        </h2>
        <p className="mt-6 text-pretty leading-relaxed text-fg-muted">
          A report is not two attachments from two tools. Audit scores and what
          moved since the last run sit in the same email as the visitor numbers,
          because the person reading it wants one answer about how the site is
          doing — not a reconciliation exercise.
        </p>
        <Link
          href="/seo-audits"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          What the SEO audit checks
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Common questions
        </h2>
        <dl className="mt-8 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-semibold tracking-tight">{f.q}</dt>
              <dd className="mt-2.5 text-pretty leading-relaxed text-fg-muted">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="card mt-16 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          Set one up in a couple of minutes
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          Scheduled reports are included on every plan, including the free tier.
          Pick a site, a rhythm and a recipient list, and send yourself a test
          copy before the first one goes out.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href={`${site.app}/login`} variant="secondary">
            See the live demo
          </Button>
        </div>
      </section>
    </div>
  );
}
