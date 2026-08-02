import type { Metadata } from "next";
import {
  CalendarClock,
  CheckCircle2,
  FileSpreadsheet,
  MessageCircle,
  PauseCircle,
  Send,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
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
  "Automated analytics reports by email and WhatsApp. Send a scheduled traffic and SEO summary to clients or your team — headline numbers in the body, the full breakdown attached as an XLSX spreadsheet, no dashboard login required.";

const capabilities = [
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
    <div className="mx-auto max-w-5xl px-5 py-16">
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
