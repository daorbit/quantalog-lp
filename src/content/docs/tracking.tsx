import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

function Body() {
  return (
    <>
      <P>
        The tracker is a single async script tag. Drop it into the{" "}
        <Code>&lt;head&gt;</Code> of any site and it starts reporting pageviews,
        engagement time, scroll depth, and clicks — including SPA route changes,
        with no extra code.
      </P>

      <H2 id="html">Plain HTML</H2>
      <Pre label="index.html">{`<head>
  <!-- ...the rest of your head... -->
  <script async
          src="${site.api}/tracker.js"
          data-site="YOUR_SITE_ID"></script>
</head>`}</Pre>

      <H2 id="react">React</H2>
      <P>Mount the script once at the app root:</P>
      <Pre label="App.tsx">{`useEffect(() => {
  const s = document.createElement("script");
  s.src = "${site.api}/tracker.js";
  s.async = true;
  s.dataset.site = "YOUR_SITE_ID";
  document.head.appendChild(s);
  return () => { document.head.removeChild(s); };
}, []);`}</Pre>

      <H2 id="nextjs">Next.js</H2>
      <Pre label="app/layout.tsx">{`import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="${site.api}/tracker.js"
          data-site={process.env.NEXT_PUBLIC_QUANTALOG_SITE_ID}
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`}</Pre>

      <H2 id="vue">Vue</H2>
      <Pre label="main.ts">{`const s = document.createElement("script");
s.src = "${site.api}/tracker.js";
s.async = true;
s.dataset.site = import.meta.env.VITE_QUANTALOG_SITE_ID;
document.head.appendChild(s);`}</Pre>

      <H2 id="clicks">Click tracking</H2>
      <P>
        Buttons, links, and anything tagged with <Code>data-va-cta</Code> are
        tracked automatically. Control it per element or globally:
      </P>
      <Ul>
        <Li>
          <Code>data-va-cta=&quot;signup&quot;</Code> — give an element a stable
          label instead of its visible text.
        </Li>
        <Li>
          <Code>data-va-ignore</Code> — skip a single element.
        </Li>
        <Li>
          <Code>data-clicks=&quot;off&quot;</Code> on the script tag — disable click
          tracking entirely.
        </Li>
      </Ul>

      <Callout>
        The tracker is cookieless. Visitors are a rotating daily hash of IP and
        user agent, so nothing persists in the browser and no consent banner is
        needed.
      </Callout>
    </>
  );
}

export const tracking: Doc = {
  slug: "tracking",
  title: "Install the tracker",
  description:
    "Add the tracking script to plain HTML, React, Next.js, or Vue — plus click tracking options.",
  category: "Tracking",
  order: 1,
  Body,
};
