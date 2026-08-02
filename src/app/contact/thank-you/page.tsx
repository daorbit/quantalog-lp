import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui";
import { site } from "@/lib/site";

/**
 * Where the contact form lands after a successful send.
 *
 * A real page rather than swapping the form for a success card: the visitor
 * gets a URL they can be sent back to, a back button that does something
 * sensible, and — the reason it matters commercially — a distinct page to
 * count. A conversion you cannot see in your own analytics is one you cannot
 * improve.
 *
 * Deliberately `noindex`. It is only meaningful immediately after a submission,
 * and a thank-you page in search results is a dead end for whoever clicks it.
 */
export const metadata: Metadata = {
  title: "Thanks — your message is on its way",
  description: "Your message reached the Quantalog team. We reply within one working day.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/contact/thank-you" },
};

const next = [
  {
    icon: Mail,
    title: "Check your inbox",
    body: "A receipt is already on its way, quoting what you sent so you have a copy.",
  },
  {
    icon: Clock,
    title: "We reply within a working day",
    body: "A person reads every message. No ticket queue, no chatbot triage in between.",
  },
];

export default function ContactThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        </div>

        <h1 className="mt-8 text-balance text-[2rem] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[2.75rem]">
          Thanks — that reached us.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-lg leading-relaxed text-fg-muted">
          Your message is in front of a person, not a queue. Here is what
          happens next.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {next.map((item) => (
          <div key={item.title} className="card p-6">
            <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="mt-4 text-[15px] font-semibold tracking-tight">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Someone who just asked a question is the most engaged visitor the site
          will see today. Sending them back to the homepage wastes that. */}
      <div className="card mt-8 p-8 text-center">
        <h2 className="text-[1.25rem] font-semibold tracking-tight">
          While you wait — try it
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-fg-muted">
          The live demo opens a fully populated workspace in one click. No
          account, no card, every screen in the product.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`${site.app}/login`}>Open the live demo</Button>
          <Button href="/docs" variant="secondary">
            Read the docs
          </Button>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition hover:text-fg"
        >
          Back to the homepage
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
