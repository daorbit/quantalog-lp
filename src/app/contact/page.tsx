import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { EmbeddedForm } from "@/components/embedded-form";
import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs, ORG_ID, SITE_ID } from "@/lib/schema";
import { site } from "@/lib/site";

const DESCRIPTION =
  "Get in touch with the Quantalog team about pricing, the Platform API, privacy and compliance, or help with your account. Messages reach a person, usually answered within a working day.";

/**
 * Contact.
 *
 * Structurally this is the `ContactPage` node a search engine expects to find
 * for an organisation, referencing the same org id the rest of the site uses.
 * For a reader it is the answer to "is there a human here" — which, for a tool
 * asking to sit in your page's critical path, is a fair question to have.
 */

/** What someone can expect, stated before they spend effort on the form. */
const promises = [
  { icon: Clock, text: "A reply within one working day" },
  { icon: Mail, text: "A receipt in your inbox straight away" },
  { icon: ShieldCheck, text: "No mailing list, ever" },
];

const elsewhere = [
  {
    icon: MessageSquare,
    title: "Try it before you ask",
    body: "The live demo opens a fully populated workspace in one click — no account, no card, every screen in the product.",
    href: `${site.app}/login`,
    cta: "Open the demo",
    external: true,
  },
  {
    icon: BookOpen,
    title: "The answer may be written down",
    body: "Installation, custom events, the Platform API reference and how the privacy model works are all documented.",
    href: "/docs",
    cta: "Browse the docs",
  },
];

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${site.url}/contact`,
    title: "Contact Quantalog",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Quantalog",
    description: DESCRIPTION,
    images: ["/OgImage.png"],
  },
};

export default function ContactPage() {
  const jsonLd = graph(
    {
      "@type": "ContactPage",
      "@id": `${site.url}/contact#page`,
      name: "Contact Quantalog",
      description: DESCRIPTION,
      url: `${site.url}/contact`,
      isPartOf: { "@id": SITE_ID },
      publisher: { "@id": ORG_ID },
      mainEntity: { "@id": ORG_ID },
      inLanguage: "en",
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ])
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <JsonLd data={jsonLd} />

      <header className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Contact</Eyebrow>
        </div>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Talk to a <span className="text-accent">person</span>.
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
          Questions about pricing, whether the tracking model fits your
          compliance position, or what you are trying to build on the Platform
          API — send it over. No ticket queue, no chatbot in front of it.
        </p>

        {/* Set expectations before the form, not after it: the cost of filling
            this in is decided here, and "we'll reply in a day" is the thing
            that makes it worth the effort. */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {promises.map((p) => (
            <li key={p.text} className="flex items-center gap-2 text-sm text-fg-muted">
              <p.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {p.text}
            </li>
          ))}
        </ul>
      </header>

      {/* The form is the page. It gets the full column and the sidebar becomes
          a footer, rather than two half-width columns where neither reads well. */}
      <div className="mx-auto mt-14 max-w-2xl">
        <EmbeddedForm
          src="https://forms.daorbit.in/form/6a89a4af44a2ed606590a54a/view"
          title="Contact form"
          eager
        />

        <p className="mt-5 text-center text-sm text-fg-muted">
          Prefer your own mail client? Write to{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>{" "}
          — it reaches the same place.
        </p>
      </div>

      <div className="mx-auto mt-20 max-w-3xl border-t border-border pt-12">
        <h2 className="text-center text-sm font-semibold uppercase tracking-[0.1em] text-fg-faint">
          Might be faster
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {elsewhere.map((item) => (
            <div key={item.title} className="card p-6">
              <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {item.cta}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                >
                  {item.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
