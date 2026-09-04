import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cookie, Database, Gauge, Mail, Scale } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const DESCRIPTION =
  "Quantalog is privacy-first web analytics built on a simple bet: you should not have to choose between understanding your traffic and respecting the people in it. No cookies, no personal data, no consent banner — and SEO audits in the same dashboard.";

const principles = [
  {
    icon: Cookie,
    title: "No cookies, no exceptions",
    body: "Not a setting you can switch off — there is nothing to switch. A visitor is a salted hash of IP, user agent and site key that rotates daily. The same person is not re-identifiable tomorrow, or on any other site, by us or by anyone with our database.",
  },
  {
    icon: Database,
    title: "Raw IP addresses are never stored",
    body: "They are hashed the moment a request arrives and discarded. We cannot reverse it, produce it under subpoena, or sell it — because it does not exist after the first millisecond.",
  },
  {
    icon: Scale,
    title: "Your data is not the business model",
    body: "Quantalog makes money from subscriptions. Nothing collected is sold, shared with an ad network, or used to build a profile that follows anyone anywhere. That is the whole reason the numbers can be honest.",
  },
  {
    icon: Gauge,
    title: "Weight is a feature",
    body: "The tracker is under a kilobyte and loads async. Analytics that slows a page down costs you the traffic it is measuring, which is a strange trade for a tool that exists to grow it.",
  },
];

const faqs = [
  {
    q: "Who is behind Quantalog?",
    a: "Quantalog is built and run by a small independent team led by DA Orbit. It is a self-funded product, not a venture-backed one, which is why the roadmap answers to customers rather than to a growth target.",
  },
  {
    q: "Is Quantalog GDPR compliant?",
    a: "Quantalog stores no cookies and no personal data. Visitors are counted using a rotating daily hash of IP address and user agent that is never persisted in reversible form, which is why no consent banner is required for it. Your own obligations still depend on everything else running on your site, so treat this as one fewer disclosure to make rather than legal advice.",
  },
  {
    q: "Where is the data stored?",
    a: "In MongoDB Atlas. Raw IP addresses are hashed on receipt and discarded rather than persisted. You can export or delete a site's data at any time from the dashboard.",
  },
  {
    q: "What does Quantalog deliberately not do?",
    a: "No session recording, no heatmaps, no cross-site tracking, no ad-platform attribution and no user-level profiles. Some of those are useful; all of them require following an individual around, which is the thing this product exists not to do.",
  },
  {
    q: "How do I get in touch?",
    a: `Email ${site.email}. It reaches a person, not a queue.`,
  },
];

export const metadata: Metadata = {

  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${site.url}/about`,
    title: "About Quantalog",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Quantalog",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
};

export default function AboutPage() {
  const jsonLd = graph(
    {
      "@type": "AboutPage",
      "@id": `${site.url}/about#page`,
      name: "About Quantalog",
      description: DESCRIPTION,
      url: `${site.url}/about`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },

      mainEntity: { "@id": ORG_ID },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/about#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ])
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <JsonLd data={jsonLd} />

      <header className="border-b border-border pb-12">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Analytics that counts everyone,
          <br className="hidden sm:block" />{" "}
          <span className="text-accent">and follows no one.</span>
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
          {DESCRIPTION}
        </p>
      </header>

      <section className="mt-14">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">Why we built it</h2>
        <div className="mt-6 space-y-5 text-pretty leading-relaxed text-fg-muted">
          <p>
            Cookie-based analytics has a problem it cannot solve from the
            inside. It needs consent to run, a large share of visitors decline,
            and the ones who decline are systematically different from the ones
            who accept. The result is not a smaller sample of your audience — it
            is a biased one, and every decision made on top of it inherits that
            bias.
          </p>
          <p>
            The usual answer is to accept the gap and add a banner. We think the
            better answer is to not need consent in the first place. If nothing
            is stored in the browser and no personal data leaves it, there is
            nothing to ask permission for, nothing to decline, and nobody
            missing from the count.
          </p>
          <p>
            The second thing we kept running into: traffic tells you who
            arrived, and says nothing about who never did. Teams end up paying
            for an analytics tool and an SEO tool and manually correlating the
            two. Quantalog puts{" "}
            <Link href="/seo-audits" className="text-accent hover:underline">
              SEO audits
            </Link>{" "}
            — meta tags, structured data, broken links, Lighthouse scores and
            Core Web Vitals — in the same dashboard as the traffic they explain,
            and sends both to whoever asked in one{" "}
            <Link href="/reports" className="text-accent hover:underline">
              scheduled report
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What we hold to
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal
              key={p.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="card card-hover group p-7"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-subtle text-accent transition-all duration-200 group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-accent/10">
                <p.icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-[15px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[1.75rem] font-bold tracking-[-0.025em]">
          What we deliberately do not build
        </h2>
        <p className="mt-6 text-pretty leading-relaxed text-fg-muted">
          No session recording. No heatmaps. No cross-site tracking. No
          ad-platform attribution. No user-level profiles. Several of those are
          genuinely useful, and if you need them, a tool that offers them is the
          right choice — our comparison pages say so plainly. But every one of
          them requires following an individual around, and that is the specific
          thing this product exists not to do. Saying no to it is not a gap in
          the roadmap; it is the roadmap.
        </p>
        <Link
          href="/compare"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          See how Quantalog compares to other tools
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="mt-14">
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

      <section className="card mt-14 flex flex-col items-center gap-5 p-8 text-center">
        <Mail className="h-6 w-6 text-accent" aria-hidden="true" />
        <div>
          <h2 className="text-[1.5rem] font-bold tracking-[-0.02em]">Talk to us</h2>
          <p className="mx-auto mt-3 max-w-lg text-pretty leading-relaxed text-fg-muted">
            Questions about how the tracking works, whether it fits your
            compliance position, or what you are trying to build on the Platform
            API — write to{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={`${site.app}/signup`}>Start free</Button>
          <Button href="/docs/privacy" variant="secondary">
            How privacy works
          </Button>
        </div>
      </section>
    </div>
  );
}
