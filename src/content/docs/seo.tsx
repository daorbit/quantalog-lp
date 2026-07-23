import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        The SEO page audits a page on one of your tracked sites. It reads the page
        the way a search engine would, runs it through Google Lighthouse, and
        reports what is holding it back — meta tags, content structure, technical
        setup and crawler files, in one place.
      </P>

      <H2 id="running">Running an audit</H2>
      <P>
        Open <b>SEO</b> in the sidebar, pick a site, and enter the path you want
        checked — <code>/</code> for the homepage, <code>/pricing</code> for a
        specific page. Hit <b>Analyze</b>.
      </P>
      <P>
        Audits are scoped to sites in your workspace: the URL has to be on that
        site&apos;s domain. This is a tool for the properties you own, not a
        general-purpose scanner.
      </P>
      <Callout>
        A full run takes 20-60 seconds, most of it waiting on Lighthouse. Results
        are stored, so re-opening the page is instant — use <b>Re-run audit</b>{" "}
        when you want fresh numbers after shipping a fix.
      </Callout>

      <H2 id="scores">The scores</H2>
      <P>
        Four rings come straight from Lighthouse, measured on the mobile profile
        Google indexes with. They use Lighthouse&apos;s own thresholds: 90 and
        above is good, 50-89 needs work, below 50 is failing.
      </P>
      <Ul>
        <Li>
          <b>SEO</b> — crawlability, meta tags, link text, mobile friendliness.
        </Li>
        <Li>
          <b>Performance</b> — load speed and Core Web Vitals.
        </Li>
        <Li>
          <b>Accessibility</b> — contrast, labels, landmarks.
        </Li>
        <Li>
          <b>Best practices</b> — security, deprecated APIs, console errors.
        </Li>
      </Ul>
      <P>
        The <b>Overall</b> ring is half Lighthouse and half the on-page issues
        found by the audit itself. When Lighthouse is unavailable it falls back to
        the on-page half alone.
      </P>

      <H2 id="tabs">What each tab covers</H2>
      <Ul>
        <Li>
          <b>Overview</b> — every issue found, sorted with the critical ones
          first. Start here.
        </Li>
        <Li>
          <b>Meta tags</b> — title and description with length meters against the
          lengths search results actually display, canonical URL, Open Graph and
          Twitter Card tags, and the full tag list.
        </Li>
        <Li>
          <b>Content</b> — word count, heading structure, keyword density with
          common words filtered out, readability, and every image with its alt
          text.
        </Li>
        <Li>
          <b>Technical</b> — HTTPS, viewport, structured data, status code and
          response time, robots.txt and sitemap, plus Core Web Vitals for mobile
          and desktop side by side.
        </Li>
        <Li>
          <b>Suggestions</b> — the Lighthouse audits this page failed, each with a
          plain-language fix, estimated savings, and the specific files
          responsible.
        </Li>
      </Ul>

      <H2 id="history">History</H2>
      <P>
        Every audit is kept. The history table under the report lists past runs
        with their score and issue count, so you can confirm a fix moved the
        number and see when a regression crept in. Click a row to open that
        report.
      </P>

      <Callout>
        Lighthouse scores vary a few points between runs on the same page — that
        is the audit&apos;s own measurement noise, not your site changing. Judge
        trends across several runs rather than single-point differences.
      </Callout>
    </>
  );
}

export const seo: Doc = {
  slug: "seo",
  title: "SEO audits",
  description:
    "Audit a tracked site's meta tags, content, technical setup and Lighthouse scores, with history across runs.",
  category: "Tracking",
  order: 13,
  Body,
};
