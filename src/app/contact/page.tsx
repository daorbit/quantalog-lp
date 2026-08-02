import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Github, Mail, MessageSquare } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
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

const elsewhere = [
  {
    icon: BookOpen,
    title: "Read the docs first",
    body: "Installation, custom events, the Platform API reference and how the privacy model works are all documented.",
    href: "/docs",
    cta: "Browse the docs",
  },
  {
    icon: MessageSquare,
    title: "Try it before you ask",
    body: "The live demo opens a fully populated workspace in one click — no account, no card, every screen in the product.",
    href: `${site.app}/login`,
    cta: "Open the demo",
    external: true,
  },
  {
    icon: Github,
    title: "Something broken?",
    body: "Bug reports and feature requests are welcome on GitHub, where they stay visible instead of disappearing into an inbox.",
    href: site.github,
    cta: "Open an issue",
    external: true,
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

      <header className="max-w-2xl">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 text-balance text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Talk to a <span className="text-accent">person</span>.
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">
          Questions about pricing, whether the tracking model fits your
          compliance position, or what you are trying to build on the Platform
          API — send it over. There is no ticket queue and no chatbot in front
          of it.
        </p>
      </header>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <aside className="space-y-4">
          <div className="card p-6">
            <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="mt-4 text-[15px] font-semibold tracking-tight">
              Prefer your own mail client?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Write to{" "}
              <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                {site.email}
              </a>{" "}
              — it reaches the same place as the form.
            </p>
          </div>

          {elsewhere.map((item) => (
            <div key={item.title} className="card p-6">
              <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 text-[15px] font-semibold tracking-tight">{item.title}</h2>
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
        </aside>
      </div>
    </div>
  );
}
