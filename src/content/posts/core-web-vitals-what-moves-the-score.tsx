import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const preload = `<!-- The LCP image, discoverable in the initial HTML -->
<link
  rel="preload"
  as="image"
  href="/hero.avif"
  fetchpriority="high"
/>

<!-- And on the element itself -->
<img src="/hero.avif" fetchpriority="high" decoding="async" alt="" />`;

const reserveSpace = `/* Reserve the box before the image arrives.
   width and height attributes give the browser the aspect ratio,
   so it can allocate the space during the first layout. */
img {
  aspect-ratio: attr(width) / attr(height);
  height: auto;
  max-width: 100%;
}`;

const fontDisplay = `@font-face {
  font-family: "Inter";
  src: url("/inter.woff2") format("woff2");
  /* swap: show fallback immediately, swap when ready.
     The layout shift this causes is why the metrics below matter. */
  font-display: swap;
  /* Match the fallback's metrics so the swap does not move anything. */
  size-adjust: 107%;
  ascent-override: 90%;
}`;

const measureINP = `// Real INP from real visitors, not a lab number.
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Interactions above 200ms are the ones costing you the score.
    if (entry.duration > 200) {
      console.log(entry.name, Math.round(entry.duration), entry.target);
    }
  }
}).observe({ type: "event", durationThreshold: 200, buffered: true });`;

function Body() {
  return (
    <>
      <P>
        Core Web Vitals occupy an awkward position in SEO advice: important
        enough that every audit tool reports them, weak enough as a ranking
        factor that chasing a perfect score is usually a poor use of a week.
        Google has been consistent that they are a tiebreaker rather than a
        primary signal — relevance and content quality dominate, and a fast page
        about the wrong thing still loses.
      </P>
      <P>
        That is not an argument for ignoring them. It is an argument for knowing
        which changes move the number and which are theatre, because the
        distance between those two is enormous and most advice does not
        distinguish.
      </P>

      <Callout>
        The three current metrics are LCP (loading), INP (responsiveness) and
        CLS (visual stability). INP replaced FID in March 2024 and is
        substantially harder to pass — if you have not looked since, your scores
        may have moved without your code changing.
      </Callout>

      <H2 id="lab-vs-field">Lab scores and field data are different things</H2>
      <P>
        This is the distinction that wastes the most time. Running Lighthouse
        gives you a <strong>lab</strong> score: one simulated load, on a
        throttled connection, on your machine. The Chrome User Experience Report
        gives you <strong>field</strong> data: the 75th percentile of what real
        visitors actually experienced over 28 days.
      </P>
      <P>
        Search Console reports field data. That is what is tied to the ranking
        signal. A green Lighthouse score with failing field data is common and
        means your visitors are on slower devices and networks than your laptop
        — optimising against the lab number will not fix it.
      </P>
      <P>
        Use the lab for iteration, because it is fast and deterministic. Judge
        yourself on the field, because that is what is measured.
      </P>

      <H2 id="lcp">LCP: find the element first</H2>
      <P>
        Largest Contentful Paint is the render time of the largest text block or
        image in the viewport. The target is 2.5 seconds at the 75th percentile.
      </P>
      <P>
        Almost every LCP problem is one of four things, and they need different
        fixes — so identify which before changing anything. In DevTools, the
        Performance panel marks the LCP element directly.
      </P>

      <H3 id="lcp-discovery">Late discovery</H3>
      <P>
        The browser cannot request an image it has not found yet. An LCP image
        set by CSS <Code>background-image</Code>, injected by JavaScript, or
        sitting behind a lazy-load attribute is discovered late and starts
        downloading late. This is the most common cause and the cheapest fix.
      </P>
      <Pre label="index.html">{preload}</Pre>
      <P>
        Never put <Code>loading=&quot;lazy&quot;</Code> on the LCP image. It is
        good advice for everything below the fold and actively harmful for the
        one element the metric measures.
      </P>

      <H3 id="lcp-server">Slow server response</H3>
      <P>
        LCP cannot be faster than the document it lives in. If time to first
        byte is over about 800ms, that is the ceiling and no amount of image
        optimisation moves it. Static generation, edge caching, and not blocking
        the HTML response on a database query are the levers.
      </P>

      <H3 id="lcp-render-blocking">Render-blocking resources</H3>
      <P>
        Synchronous stylesheets and scripts in the head delay first paint.
        Inline the critical CSS, defer the rest, and load third-party scripts
        with <Code>async</Code> — a tag manager in the head, blocking, is
        frequently the entire problem.
      </P>

      <H2 id="inp">INP: the one that got harder</H2>
      <P>
        Interaction to Next Paint measures the delay between a visitor
        interacting and the screen updating in response, across the whole
        session, at the 75th percentile. The target is 200ms.
      </P>
      <P>
        FID, its predecessor, only measured the delay before the handler
        started, and only for the first interaction — which meant a page could
        pass while feeling terrible. INP measures the full interaction to the
        next paint, every time. Long tasks that used to be invisible now score.
      </P>
      <Pre label="Console">{measureINP}</Pre>
      <P>What actually moves INP:</P>
      <Ul>
        <Li>
          <strong>Break up long tasks.</strong> Anything over 50ms on the main
          thread blocks the response to input. Yield with{" "}
          <Code>scheduler.yield()</Code> where available, or{" "}
          <Code>setTimeout(fn, 0)</Code> as a fallback.
        </Li>
        <Li>
          <strong>Stop doing layout work in the handler.</strong> Reading a
          layout property and then writing one, in a loop, forces synchronous
          reflow per iteration. Batch the reads, then the writes.
        </Li>
        <Li>
          <strong>Cut hydration cost.</strong> On a framework page, the largest
          single main-thread block is usually hydration. Server components,
          islands, or simply shipping less JavaScript all attack this directly.
        </Li>
        <Li>
          <strong>Audit third-party scripts.</strong> Chat widgets, session
          recorders and tag managers execute on your main thread and are
          frequently the dominant cost. This is measurable: load the page
          without them and compare.
        </Li>
      </Ul>

      <H2 id="cls">CLS: reserve the space</H2>
      <P>
        Cumulative Layout Shift measures how much visible content moves during
        the page&apos;s lifetime. The target is 0.1, and it is the most
        mechanically fixable of the three — almost every shift traces to
        something whose size was not declared before it arrived.
      </P>
      <Pre label="styles.css">{reserveSpace}</Pre>
      <Ul>
        <Li>
          <strong>Images without dimensions.</strong> Always set{" "}
          <Code>width</Code> and <Code>height</Code> attributes, even with
          responsive CSS. They give the browser the aspect ratio at parse time.
        </Li>
        <Li>
          <strong>Web fonts.</strong> A fallback font with different metrics
          reflows the text when the real font swaps in.{" "}
          <Code>size-adjust</Code> and the override descriptors make the
          fallback occupy the same space.
        </Li>
        <Li>
          <strong>Injected banners.</strong> Cookie notices, promo bars and
          consent dialogs that push content down are pure CLS. Overlay them, or
          reserve the space in the initial layout.
        </Li>
        <Li>
          <strong>Ads and embeds.</strong> Reserve a fixed slot even when the
          slot may go unfilled.
        </Li>
      </Ul>
      <Pre label="fonts.css">{fontDisplay}</Pre>

      <H2 id="priority">Where to actually spend the time</H2>
      <P>
        If your field data is failing and you have one afternoon, in this order:
      </P>
      <Ul>
        <Li>
          Fix CLS first. It is the most deterministic — the causes are findable
          and the fixes do not regress.
        </Li>
        <Li>
          Then LCP discovery. Preloading the hero image and removing a
          render-blocking stylesheet are small changes with large effects.
        </Li>
        <Li>
          Then third-party JavaScript, which usually helps INP and LCP at once.
        </Li>
        <Li>
          Only then micro-optimise your own code. This is where effort goes
          furthest into diminishing returns.
        </Li>
      </Ul>
      <P>
        And keep the weighting in mind. If the page does not answer the query it
        ranks for, none of the above matters. Vitals decide close contests.
      </P>

      <Callout>
        <A href="/seo-audits">Quantalog&apos;s SEO audits</A> run Lighthouse
        against any page you track and report the three vitals alongside meta
        tags, structured data and broken links — and the tracker collects real
        field vitals from your actual visitors, so you can compare the lab
        number against what people experience.
      </Callout>
    </>
  );
}

export const coreWebVitals: Post = {
  slug: "core-web-vitals-what-actually-moves-the-score",
  title: "Core Web Vitals: what actually moves the score",
  description:
    "LCP, INP and CLS explained by cause rather than by definition — why lab scores mislead, why INP is harder than FID was, and the fixes worth an afternoon.",
  date: "2026-08-04",
  tags: ["SEO", "Performance", "Engineering"],
  author: { name: "Ajay Goswami", role: "Founder" },
  readingMinutes: 10,
  Body,
};
