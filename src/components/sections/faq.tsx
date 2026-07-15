import { Plus } from "lucide-react";
import { SectionHeading } from "../ui";

export const faqs = [
  {
    q: "Do I need a cookie consent banner?",
    a: "No. Quantalog sets no cookies and writes nothing to localStorage. A visitor is a salted hash of IP, user agent and site key that rotates every day, so the same person is not re-identifiable tomorrow or across any other site. There is no personal data to consent to.",
  },
  {
    q: "How is this different from Google Analytics?",
    a: "It answers fewer questions, on purpose, and it answers them immediately. There is no sampling, no 24-hour processing delay, no consent banner and no data sent to an ad network. The whole dashboard is one screen instead of a reporting suite.",
  },
  {
    q: "Will it work with my React, Next.js or Vue app?",
    a: "Yes. The tracker patches history.pushState and listens for popstate, so client-side route changes are reported as pageviews with no extra code. Drop the script in your root layout and you are done.",
  },
  {
    q: "What exactly is the Platform API for?",
    a: "It is for companies whose customers each have their own site — app builders, hosting platforms, agencies. With one API key you create a project per end-user, register their sites, inject the tracker automatically, and read their stats back to render inside your own product.",
  },
  {
    q: "Where is the data stored?",
    a: "In MongoDB Atlas. Raw IP addresses are never persisted; they are hashed on receipt and discarded. You can export or delete a site's data at any time from the dashboard.",
  },
  {
    q: "Does the script slow my site down?",
    a: "It is under a kilobyte, loads with the async attribute, and sends events with navigator.sendBeacon, so it never blocks rendering or delays navigation.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-5 py-28">
        <SectionHeading centered eyebrow="FAQ" title="Questions people actually ask" />

        <div className="card mt-14 divide-y divide-border overflow-hidden">
          {faqs.map((item) => (
            <details key={item.q} className="group px-6 py-5 transition-colors open:bg-bg-subtle">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-[14.5px] font-medium text-fg transition-colors group-hover:text-accent">
                  {item.q}
                </span>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-fg-muted transition-all duration-200 group-open:rotate-45 group-open:border-accent/40 group-open:text-accent"
                  aria-hidden="true"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="mt-3.5 max-w-prose text-pretty text-sm leading-relaxed text-fg-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-fg-muted">
          Still stuck?{" "}
          <a
            href="mailto:daorbit2k25@gmail.com"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Email us
          </a>{" "}
          — a human replies.
        </p>
      </div>
    </section>
  );
}
