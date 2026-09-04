import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const serverCompare = `# Unique-ish requests to HTML pages in your access log for one day.
# Crude, but it is measured before anything client-side can interfere.
awk '$9 == 200 && $7 !~ /\\.(js|css|png|jpg|svg|ico|woff2?)$/ { print $1 }' \\
  access.log | sort -u | wc -l

# Compare with the "users" figure your analytics reports for the same day.
# A gap of a few percent is normal. A gap of a third is a measurement problem.`;

const blockedCheck = `// Does the request even leave the page?
// Run in the console with the Network tab open.
fetch("https://www.google-analytics.com/g/collect", { method: "HEAD", mode: "no-cors" })
  .then(() => console.log("request left the browser"))
  .catch((e) => console.log("blocked before sending:", e.message));`;

function Body() {
  return (
    <>
      <P>
        Every analytics tool undercounts. The question is by how much, in which
        direction, and whether the loss is random — because a number that is
        uniformly 10% low is a scaling problem, while a number that is missing a
        specific kind of visitor is a reasoning problem. The second kind is far
        more common and much harder to notice.
      </P>
      <P>
        Here are the five mechanisms that remove visitors from your reports,
        roughly in order of how much traffic they account for, and what you can
        do about each.
      </P>

      <H2 id="consent">1. Consent declines</H2>
      <P>
        If your tool needs a cookie banner, measurement starts only after
        someone clicks accept. Everyone who declines, ignores the banner, or
        leaves before it renders is invisible — not estimated, not sampled,
        absent.
      </P>
      <P>
        The size varies enormously by region and by how the banner is built, so
        treat any single published figure with suspicion. The structural point
        holds regardless: the visitors who decline are disproportionately
        privacy-conscious, technical, and on desktop Firefox or Safari. You are
        not losing a random tenth of your audience. You are losing a specific
        slice of it, and then computing conversion rates on what remains.
      </P>
      <Callout>
        This is the single largest source of loss for most sites in Europe, and
        it is the one with a clean fix: a tool that needs no banner has no
        consent gap. <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
        Whether yours needs one</A> depends on what it stores.
      </Callout>

      <H2 id="blockers">2. Content blockers</H2>
      <P>
        uBlock Origin, AdGuard, Brave&apos;s shields, Safari&apos;s Intelligent
        Tracking Prevention and most privacy-focused DNS resolvers all ship with
        filter lists that include the major analytics endpoints by default. The
        script never loads, or it loads and the request to the collector is
        dropped.
      </P>
      <P>
        Blocking is heavily skewed by audience. A developer-tools product and a
        recipe blog do not have remotely comparable rates — if your visitors are
        technical, this is your dominant loss; if they are not, it may be
        marginal. Measure it rather than assuming.
      </P>
      <Pre label="Browser console">{blockedCheck}</Pre>
      <P>
        Two things reduce this. A first-party endpoint on your own domain is not
        on the generic filter lists, though it can still be caught by
        heuristics. And a small, single-purpose script that does not also power
        ad retargeting is less likely to be listed in the first place — the
        lists target the ad-tech graph, not measurement as such.
      </P>

      <H2 id="sampling">3. Sampling</H2>
      <P>
        Once a property passes certain thresholds, Google Analytics may answer a
        query from a subset of sessions and scale the result up. The report
        looks the same; there is a small note that says the data is based on a
        percentage of sessions.
      </P>
      <P>
        For a headline traffic number, extrapolation is usually fine. For
        anything segmented it is not: the narrower the segment, the fewer real
        sessions underlie it, and a funnel step or a small campaign can end up
        resting on a handful of actual events. Rows that swing wildly when you
        change the date range by a day are the tell.
      </P>

      <H2 id="thresholding">4. Data thresholding</H2>
      <P>
        Distinct from sampling and less well known. When a report could
        potentially identify an individual — a rare browser, a small city, a
        narrow segment — rows are withheld entirely rather than shown. The
        report renders successfully with data silently missing, and no total
        anywhere tells you how much.
      </P>
      <P>
        This is why segment totals sometimes fail to add up to the unsegmented
        number, and why long-tail geography reports look emptier than your
        server logs suggest. It is a deliberate privacy protection, working as
        intended. It is still absent data.
      </P>

      <H2 id="client-side">5. The request never fires</H2>
      <P>
        The last category is technical rather than policy-driven, and it is the
        one you can fix in your own code.
      </P>
      <Ul>
        <Li>
          <strong>Bounce before load.</strong> A visitor who leaves after two
          seconds on a page whose analytics script is loaded late may never be
          counted. Scripts that load after everything else lose the fastest
          bounces — which are exactly the sessions worth knowing about.
        </Li>
        <Li>
          <strong>Single-page app route changes.</strong> If your tracker counts
          only the initial page load, every in-app navigation is missing.
          Frameworks that swap routes client-side need the tracker to hook the
          router.
        </Li>
        <Li>
          <strong>JavaScript errors earlier on the page.</strong> An exception
          before the analytics snippet runs takes measurement down with it, and
          the sessions you lose are the broken ones.
        </Li>
        <Li>
          <strong>Unloading before the beacon sends.</strong> Exit events fired
          with a normal request get cancelled when the page goes away.{" "}
          <Code>navigator.sendBeacon</Code> exists for this and survives the
          unload.
        </Li>
      </Ul>

      <H2 id="measure-the-gap">Measuring your own gap</H2>
      <P>
        Server logs are the closest thing to ground truth available to you: they
        are written before any client-side blocking or consent logic can
        interfere. They over-count in their own way — bots, prefetches, crawlers
        — so the comparison is a sanity check, not an audit.
      </P>
      <Pre label="Terminal">{serverCompare}</Pre>
      <P>
        Filter out obvious bot user agents first, then compare a full week
        rather than a day. A gap under roughly 10% is ordinary. A gap of a third
        or more means the majority of what you are reporting on is a sample you
        did not choose, and any conclusion drawn from segment comparisons is
        resting on it.
      </P>

      <H2 id="what-helps">What actually closes the gap</H2>
      <Ul>
        <Li>
          <strong>Remove the consent requirement</strong> by removing the
          storage that creates it. This is the largest single win in the EU and
          the only one that eliminates a category of loss rather than reducing
          it.
        </Li>
        <Li>
          <strong>Serve the tracker first-party</strong> so it is not matched by
          filter lists targeting known ad-tech hosts.
        </Li>
        <Li>
          <strong>Keep the script small and load it early.</strong> Under a
          kilobyte, loaded async in the head, costs nothing and catches the fast
          bounces.
        </Li>
        <Li>
          <strong>Use <Code>sendBeacon</Code> for anything on unload</strong> so
          exit events survive the navigation.
        </Li>
        <Li>
          <strong>Avoid sampled reporting</strong> for any decision made on a
          segment rather than a total.
        </Li>
      </Ul>

      <P>
        <A href="/">Quantalog</A> is built around the first four of those: no
        cookie and therefore no banner, a sub-kilobyte tracker, automatic route
        change handling for React and Next, and no sampling at any traffic
        volume. The <A href="/docs/tracking">tracking documentation</A> covers
        the script options, and the{" "}
        <A href="/compare/google-analytics-alternative">
          comparison with Google Analytics
        </A>{" "}
        goes through the differences in detail.
      </P>
    </>
  );
}

export const whyAnalyticsUndercountsTraffic: Post = {
  slug: "why-your-analytics-undercounts-traffic",
  title: "Why your analytics undercounts traffic",
  description:
    "Consent declines, content blockers, sampling, thresholding and beacons that never fire — the five mechanisms that remove visitors from your reports, and how to measure your own gap against server logs.",
  date: "2026-08-04",
  tags: ["Analytics", "Privacy", "Engineering"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 9,
  Body,
};
