import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleSlash,
  Code2,
  CreditCard,
  GitBranch,
  LayoutGrid,
  Palette,
  ShieldCheck,
  Table2,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui";
import { FeatureHero } from "@/components/feature-hero";
import { FormsHeroVisual } from "@/components/feature-hero-visuals";
import { FieldDropOff, SparkStat } from "@/components/charts";
import { FormBuilderPreview } from "@/components/form-builder-preview";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, service, article, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/blog";

/** Kept beside the Article node so the tag and the schema can never disagree. */
const PUBLISHED = "2025-11-01";
const MODIFIED = "2026-08-29";

/**
 * Forms, as a page rather than a homepage section.
 *
 * "Form builder", "Typeform alternative" and "form analytics" are queries typed
 * by people who have not heard of this product and are not shopping for
 * analytics yet. The argument this page has to make is the one no standalone
 * form builder can make back: a form is a funnel, and a form builder that
 * cannot see the funnel is guessing.
 */

/**
 * The meta description, kept inside the ~160 characters search results show.
 * Longer than that is not more information, it is a sentence cut off mid-word.
 */
const META_DESCRIPTION =
  "Drag-and-drop form builder with analytics attached. Multi-step forms, conditional logic, Razorpay payments, and per-field drop-off you can actually see.";

/**
 * The fuller line, for structured data and the page's own copy — schema has no
 * display limit to write against, so it carries the reasoning the meta tag has
 * no room for.
 */
const DESCRIPTION =
  "A drag-and-drop form builder with the analytics already attached. Build multi-step forms with conditional logic, take payments through your own Razorpay account, embed them anywhere, and see exactly which field people abandon — because a form you cannot measure is a funnel you are guessing at.";

const capabilities = [
  {
    icon: LayoutGrid,
    title: "Forty-odd field types, dragged into place",
    body: "Names, addresses, phones and emails with their own validation. Ratings, sliders, file uploads, date and time pickers, consent boxes, signature pads and generated identifiers. Multi-column layouts, so a first and last name sit side by side instead of stacked down the page.",
  },
  {
    icon: CreditCard,
    title: "Take payments, into your own account",
    body: "A payment field turns a form into a checkout: registration fees, deposits, paid applications, donations. Charge a fixed amount, a price that follows an earlier answer, or whatever the respondent chooses to pay. Money moves through your own Razorpay account and lands with you, not with us — and a response is only recorded once the payment actually clears.",
  },
  {
    icon: GitBranch,
    title: "Conditional logic",
    body: "Show a field only when an earlier answer calls for it. A support form that asks for an order number only from people who picked \"problem with an order\" is shorter for everyone else — and length is the single largest cause of abandonment.",
  },
  {
    icon: Workflow,
    title: "Multi-step, with a progress bar",
    body: "Split a long form into pages that validate as people advance. Twelve fields behind three steps convert better than twelve fields on one screen, and the step indicator is what tells someone the end is in sight.",
  },
  {
    icon: Palette,
    title: "Themed to look like your site",
    body: "Colours, backgrounds, fonts, button size and alignment, label placement — set per form. An embedded form that looks like a third-party widget gets treated like one.",
  },
  {
    icon: Code2,
    title: "Embed anywhere, or share a link",
    body: "One iframe snippet drops the form into any page on any stack. Or send the hosted link — the form works standalone, with no site required.",
  },
  {
    icon: Table2,
    title: "Entries as a board or a spreadsheet",
    body: "Responses land in a kanban board you can move through review stages, export as CSV, or open individually and save as PDF for the person who needs a copy.",
  },
];

/**
 * The argument the page exists to make. Kept as its own list rather than folded
 * into the capabilities above, because "why measure a form at all" is the part
 * a reader has usually never considered — every form builder shows a submission
 * count and stops there.
 */
const whyMeasured = [
  {
    stat: "Views, not just submissions",
    body: "Every form load is recorded, so a completion rate is a real ratio rather than a number divided by a guess. A form with 40 submissions means nothing until you know whether 60 people saw it or 6,000.",
  },
  {
    stat: "Where people stop",
    body: "Per-field drop-off shows which question ends the session. It is almost never the one you would guess — phone numbers, salary ranges and anything asking for an ID are the usual culprits.",
  },
  {
    stat: "Where they came from",
    body: "Every submission records the page it came from, so you can tell which landing page, campaign or blog post actually produces responses rather than traffic.",
  },
];

const included = [
  "Per-form views, submissions and completion rate",
  "Per-field drop-off, so you can see which question loses people",
  "Source URL on every submission",
  "Payments through your own Razorpay account — fixed, priced by answer, or respondent-chosen",
  "Conditional logic — show or hide a field on an earlier answer",
  "Multi-step forms with per-step validation and a progress indicator",
  "Honeypot spam trap and per-IP rate limiting on every public form",
  "CSV export of all entries, PDF export of any single submission",
  "Kanban review board for moving entries through stages",
  "Full theming — colours, fonts, backgrounds, layout and button styling",
  "Embed by iframe, or share the hosted link",
];

const faqs = [
  {
    q: "How is this different from Google Forms or Typeform?",
    a: "The analytics. Standalone form builders report how many people submitted; they cannot tell you how many arrived and left, or which field they left on, because they do not measure the page the form sits in. Quantalog records views and per-field drop-off alongside the rest of your site traffic, so a form is a funnel you can actually see rather than a submission counter.",
  },
  {
    q: "Do forms need a cookie consent banner?",
    a: "No. Forms follow the same cookieless model as the rest of Quantalog — nothing is stored in the visitor's browser to measure a view or a submission. The data a respondent types is of course stored, because that is what they filled the form in for, and IP collection for submissions is off by default and switchable per form.",
  },
  {
    q: "Can I embed a form on a site that Quantalog does not track?",
    a: "Yes. The embed is a plain iframe and works on any stack, tracked or not. Form views and submissions are recorded either way; the form's own analytics do not depend on the page around it running the tracker.",
  },
  {
    q: "What stops spam submissions?",
    a: "Two things, both on by default: a honeypot field that is invisible to people and irresistible to bots, and per-IP rate limiting on the public submission endpoint. Neither shows a CAPTCHA to a real respondent, because a CAPTCHA is itself a drop-off point.",
  },
  {
    q: "How do payments work, and do you take a cut?",
    a: "You connect your own Razorpay account once per workspace, and every paid form in it charges through those keys. The money goes directly to you — it never passes through Quantalog, and we take nothing beyond your normal plan. Your Razorpay fees are between you and Razorpay.",
  },
  {
    q: "What happens if someone abandons the payment?",
    a: "Nothing is charged and no response is recorded. Their answers stay on screen so they can try again without retyping, and the abandoned attempt is cleared automatically rather than sitting in your entries as a lead that never paid. A response is only confirmed once Razorpay tells us the money arrived — not when the browser says so.",
  },
  {
    q: "Can respondents upload files?",
    a: "Yes — file, image and media upload fields are available, and uploads arrive attached to the submission alongside the rest of the answers.",
  },
  {
    q: "Can I see an individual response rather than a table?",
    a: "Yes. Any entry opens on its own, and exports to PDF from there — which is what you want when someone asks for a copy of what a particular person submitted. The full set exports as CSV.",
  },
];

export const metadata: Metadata = {
  title: "Form builder with built-in form analytics",
  description: META_DESCRIPTION,
  alternates: { canonical: "/forms" },
  keywords: [
    "form builder",
    "online form builder",
    "form analytics",
    "form drop-off tracking",
    "form abandonment analytics",
    "conditional logic forms",
    "multi-step form builder",
    "embeddable forms",
    "Typeform alternative",
    "Google Forms alternative",
  ],
  other: {
    "article:published_time": PUBLISHED,
    "article:modified_time": MODIFIED,
  },
  openGraph: {
    type: "website",
    url: `${site.url}/forms`,
    title: "Form builder with built-in form analytics",
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Form builder with built-in form analytics",
    description: META_DESCRIPTION,
  },
};

export default function FormsPage() {
  const jsonLd = graph(
    {
      "@type": "WebPage",
      "@id": `${site.url}/forms#page`,
      name: "Form builder with built-in form analytics",
      description: DESCRIPTION,
      url: `${site.url}/forms`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/OgImage.png` },
    },
    service({
      path: "/forms",
      name: "Form builder with built-in form analytics",
      description: DESCRIPTION,
      serviceType: "Form builder",
    }),
    article({
      path: "/forms",
      headline: "Form builder with built-in form analytics",
      description: DESCRIPTION,
      published: PUBLISHED,
      modified: MODIFIED,
    }),
    {
      "@type": "FAQPage",
      "@id": `${site.url}/forms#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Forms", path: "/forms" },
    ])
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <JsonLd data={jsonLd} />

      <FeatureHero
        eyebrow="Forms"
        title={
          <>
            Every form is a funnel.
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">Most are invisible ones.</span>
          </>
        }
        description={DESCRIPTION}
        primary={{ label: "Build a form free" }}
        secondary={{ label: "Read the docs", href: "/docs" }}
        visual={<FormsHeroVisual />}
      />

      {/* Shown before anything is claimed about it: the builder is the part a
          reader wants to see, and a wall of text about drag-and-drop is a poor
          substitute for a picture of it. */}
      <section className="mt-14">
        <FormBuilderPreview />
      </section>

      {/* The argument, before the feature list. A reader who does not accept
          this section has no reason to care about the one after it. */}
      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          Why a form needs measuring at all
        </h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          A form builder tells you how many people submitted. That number cannot
          tell you whether the form is working, because it is missing the
          denominator and everything in between.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {whyMeasured.map((w, i) => (
            <Reveal
              key={w.stat}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card p-6"
            >
              <h3 className="text-[15px] font-semibold tracking-tight">
                {w.stat}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {w.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sample figures, static — the page is statically exported, so nothing
          here fetches or randomises at render time. */}
      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What form analytics actually shows you
        </h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">
          A contact form that looks healthy on submissions alone. The drop-off
          chart is where the problem is: almost half of everyone who reaches the
          phone number field leaves at it.
        </p>

        <div className="card mt-8 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4">
            <p className="text-sm font-semibold tracking-tight">
              Contact form — last 30 days
            </p>
            <p className="text-[11px] text-fg-faint">Sample data</p>
          </div>

          <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <SparkStat
              label="Views"
              value="2,480"
              delta="+9.2%"
              series={[62, 66, 64, 71, 69, 74, 72, 78, 76, 81, 79, 84, 83, 87]}
            />
            <SparkStat
              label="Submissions"
              value="412"
              delta="+4.1%"
              series={[11, 12, 12, 13, 12, 14, 13, 15, 14, 15, 15, 16, 16, 17]}
              delay={0.1}
            />
            <SparkStat
              label="Completion rate"
              value="16.6%"
              delta="−2.8%"
              up={false}
              series={[21, 21, 20, 20, 19, 19, 18, 18, 18, 17, 17, 17, 17, 16]}
              delay={0.2}
            />
          </div>

          <div className="border-t border-border p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-fg-faint">
                Drop-off by field
              </p>
              <p className="text-[11px] text-fg-faint">
                2,480 opened the form · 412 finished it
              </p>
            </div>
            <div className="mt-5">
              <FieldDropOff
                rows={[
                  { label: "Name", reached: 2480, abandoned: 190 },
                  { label: "Email", reached: 2290, abandoned: 240 },
                  { label: "Phone number", reached: 2050, abandoned: 980 },
                  { label: "Company size", reached: 1070, abandoned: 310 },
                  { label: "Message", reached: 760, abandoned: 348 },
                ]}
              />
            </div>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-relaxed text-fg-muted">
              <span className="font-medium text-fg">
                Phone number loses 48% of everyone who reaches it
              </span>{" "}
              — more than the other four fields combined. The fix is one setting,
              and it is only findable because the chart exists: make it optional,
              or show it conditionally to the people who actually want a callback.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What you can build
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
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What comes with every form
        </h2>
        <ul className="card mt-8 grid gap-x-8 gap-y-3 p-7 sm:grid-cols-2">
          {included.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-sm leading-relaxed text-fg-muted"
            >
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
          Spam handled without a CAPTCHA
        </h2>
        <div className="card mt-8 flex gap-5 p-7">
          <ShieldCheck className="h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-pretty leading-relaxed text-fg-muted">
            Every public form carries a honeypot field that people never see and
            bots reliably fill, plus per-IP rate limiting on the submission
            endpoint. Both are on by default and invisible to a real respondent
            — which is the point, because a CAPTCHA is itself a field people
            abandon at.
          </p>
        </div>
      </section>

      {/* The honest limit. Stated for the same reason the comparison pages
          carry a "when the other tool wins" section. */}
      <section className="mt-16">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What forms do not do
        </h2>
        <div className="card mt-8 flex gap-5 p-7">
          <CircleSlash className="h-6 w-6 shrink-0 text-fg-muted" aria-hidden="true" />
          <p className="text-pretty leading-relaxed text-fg-muted">
            There is no approval workflow with assignees and due dates, no
            recurring billing, and no legally binding e-signature — the
            signature field captures a drawn signature, which is not the same as
            a document routed for signing and audited. Payments are one-off, and
            refunds are issued from your Razorpay dashboard rather than here. If
            you need subscriptions or a document sent for countersigning, a
            dedicated tool will serve you better.
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

      {/* The dates are already in this page's Article schema, but only as
          JSON-LD. A `<time datetime>` element states them in the markup too,
          which is what a crawler reading the page rather than its structured
          data looks for — and what tells a reader how current this is. */}
      <p className="mt-16 text-sm text-fg-muted">
        Published{" "}
        <time dateTime={PUBLISHED}>{formatDate(PUBLISHED)}</time>. Last updated{" "}
        <time dateTime={MODIFIED}>{formatDate(MODIFIED)}</time>.
      </p>

      <section className="card mt-16 p-8 text-center">
        <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">
          Build one and watch what happens
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
          The free tier includes forms, their analytics and everything on this
          page. No card, and no separate subscription from your analytics.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href="/docs" variant="secondary">
            Read the docs
          </Button>
        </div>
        <p className="mt-6 text-sm text-fg-muted">
          Already measuring your traffic?{" "}
          <Link href="/seo-audits" className="text-accent hover:underline">
            See what else is in the same dashboard
          </Link>
          <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
        </p>
      </section>
    </div>
  );
}
