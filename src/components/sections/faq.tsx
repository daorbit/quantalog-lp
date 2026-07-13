import { Plus } from "lucide-react";

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
    <section className="border-t border-border bg-bg-subtle">
      <div className="mx-auto max-w-3xl px-5 py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Questions people actually ask
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {faqs.map((item) => (
            <details key={item.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-medium text-fg">{item.q}</span>
                <Plus
                  className="h-4 w-4 shrink-0 text-fg-muted transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
