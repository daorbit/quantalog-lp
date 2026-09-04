import type { Post } from "@/lib/blog";
import { A, Callout, H2, H3, Li, P, Pre, Ul } from "@/components/prose";
import { site } from "@/lib/site";

const appRouter = `// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="${site.api}/tracker.js"
          data-site="YOUR_SITE_KEY"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}`;

const pagesRouter = `// pages/_app.tsx
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        src="${site.api}/tracker.js"
        data-site="YOUR_SITE_KEY"
        strategy="afterInteractive"
      />
    </>
  );
}`;

const goal = `// Anywhere in a client component
window.quantalog?.("signup_completed");`;

function Body() {
  return (
    <>
      <P>
        Adding analytics to a Next.js app is one script tag and one decision:
        where it goes so that client-side route changes are counted. This covers
        both the App Router and the Pages Router, cookieless, with no consent
        banner to add.
      </P>

      <Callout>
        You do not need an npm package for this. A package pulls the same script
        in with extra weight and a React wrapper you do not need — the tag
        below is the whole integration.
      </Callout>

      <H2 id="app-router">App Router</H2>
      <P>
        Put the tag in <code>app/layout.tsx</code>, after{" "}
        <code>{"{children}"}</code>, using{" "}
        <code>next/script</code> with{" "}
        <code>strategy=&quot;afterInteractive&quot;</code> so it loads once
        hydration is done and does not block the first paint.
      </P>
      <Pre label="app/layout.tsx">{appRouter}</Pre>
      <P>
        That is it. The tracker patches{" "}
        <code>history.pushState</code>, so every client-side navigation the App
        Router does is reported as a pageview without any extra wiring.
      </P>

      <H2 id="pages-router">Pages Router</H2>
      <P>
        Same tag, placed in <code>pages/_app.tsx</code>. Do not put it in{" "}
        <code>_document.tsx</code> — scripts there run before hydration and miss
        the route-change hook.
      </P>
      <Pre label="pages/_app.tsx">{pagesRouter}</Pre>
      <P>
        The Pages Router fires <code>routeChangeComplete</code> on navigation
        and also calls <code>pushState</code>, so the same automatic pageview
        counting applies.
      </P>

      <H3 id="route-changes">Why route changes are the catch</H3>
      <P>
        A naive analytics tag counts the first server-rendered page and nothing
        after it, because a Next.js navigation never reloads the document. Any
        tracker that hooks <code>pushState</code> — this one does — reports SPA
        navigations on its own. If you were using a tool that does not, you had
        to call its page function manually in a router event; here you do not.
      </P>

      <H2 id="events">Custom events and goals</H2>
      <P>
        Call the global from any client component — a form submit handler, a
        button <code>onClick</code>, a <code>useEffect</code>.
      </P>
      <Pre label="signup-form.tsx">{goal}</Pre>
      <P>
        The optional chaining matters: during SSR and before the script loads
        the global is undefined, and <code>window.quantalog?.()</code> is a
        no-op in that window rather than a crash.
      </P>

      <H2 id="no-banner">No consent banner needed</H2>
      <P>
        The tracker sets no cookies and stores nothing in the browser, so there
        is no analytics cookie to disclose. If your Next.js app also runs ad
        pixels or a session recorder, those still need a banner — it covers
        every cookie on the site, not just one. See{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>
        .
      </P>

      <Callout>
        The <A href="/docs">docs</A> cover the script options — custom domains,
        SPA behaviour, excluding your own traffic — and{" "}
        <A href="/analytics">the analytics page</A> shows what lands in the
        dashboard.
      </Callout>
    </>
  );
}

export const addAnalyticsToNextjs: Post = {
  slug: "add-analytics-to-nextjs",
  title: "Add cookieless analytics to a Next.js app",
  description:
    "One script tag for the App Router and the Pages Router, why route changes are the only catch, and how to fire custom events — no npm package, no consent banner.",
  date: "2026-08-27",
  tags: ["Analytics", "Next.js", "Guide"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 5,
  Body,
};
