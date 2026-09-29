export type Faq = { q: string; a: string };

export type FaqCategory = { id: string; label: string; items: Faq[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting started",
    items: [
      {
        q: "Can I try it without signing up?",
        a: "Yes. The login page has a live demo that opens a fully populated workspace in one click — a month of sample traffic, a complete SEO audit with history, and every screen in the product. It is read-only, the data is generated in your browser, and no account or card is involved.",
      },
      {
        q: "Will it work with my React, Next.js or Vue app?",
        a: "Yes. The tracker patches history.pushState and listens for popstate, so client-side route changes are reported as pageviews with no extra code. Drop the script in your root layout and you are done.",
      },
      {
        q: "Does the script slow my site down?",
        a: "It is under a kilobyte, loads with the async attribute, and sends events with navigator.sendBeacon, so it never blocks rendering or delays navigation.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & consent",
    items: [
      {
        q: "Do I need a cookie consent banner?",
        a: "No. Quantalog sets no cookies and writes nothing to localStorage. A visitor is a salted hash of IP, user agent and site key that rotates every day, so the same person is not re-identifiable tomorrow or across any other site. There is no personal data to consent to.",
      },
      {
        q: "How is this different from Google Analytics?",
        a: "It answers fewer questions, on purpose, and it answers them immediately. There is no sampling, no 24-hour processing delay, no consent banner and no data sent to an ad network. The whole dashboard is one screen instead of a reporting suite.",
      },
    ],
  },
  {
    id: "features",
    label: "SEO & Orbit",
    items: [
      {
        q: "What do the SEO audits actually check?",
        a: "A page you already track is fetched the way a crawler reads it and run through Google Lighthouse. You get the four Lighthouse scores, meta tags measured against the lengths search results display, heading structure and readability, images missing alt text, structured data validated against schema.org, every link followed and checked for broken targets and redirect chains, and Core Web Vitals for mobile and desktop. A site crawl covers the problems a single page cannot show, and every run is kept so you can prove a fix moved the number.",
      },
      {
        q: "Can I send an SEO report to a client?",
        a: "Yes, two ways. Publish it at a link anyone can open — you choose section by section what is visible, and anything switched off is stripped on the server rather than hidden — or export the report as a print-ready page and save it as a PDF. Sharing is per report, so publishing one audit never exposes the rest of the site's history.",
      },
      {
        q: "Can Quantalog post to LinkedIn for me?",
        a: "Yes. Connect your LinkedIn account once, then write a post in the dashboard — or describe it to Orbit in a sentence and let it draft the words and work out the timing. Schedule it for a moment or on a repeating slot, and Quantalog publishes it unattended. Nothing goes out without you confirming it first, and every send is kept with a link to the post so you can see exactly what was published.",
      },
    ],
  },
  {
    id: "sharing",
    label: "Sharing & API",
    items: [
      {
        q: "What exactly is the Platform API for?",
        a: "It is for companies whose customers each have their own site — app builders, hosting platforms, agencies. With one API key you create a project per end-user, register their sites, inject the tracker automatically, and read their stats back to render inside your own product.",
      },
      {
        q: "Can I share a dashboard with a client?",
        a: "Yes. Any workspace can be published as a read-only page at a link that works without an account — useful for clients, an office screen, or open stats. You choose which of the fourteen panels are visible, and anything switched off is never sent to that page at all. Your site keys, settings, team and raw events are never shared. If a link reaches the wrong person, replacing it revokes the old one immediately.",
      },
    ],
  },
];

export const faqs: Faq[] = faqCategories.flatMap((c) => c.items);
