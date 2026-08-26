import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const canonical = `<!-- Self-referential canonical on every indexable page.
     Absolute URL, one per page, matching the URL you want ranked. -->
<link rel="canonical" href="https://example.com/pricing" />`;

const conflicting = `<!-- The contradiction that quietly de-indexes pages.
     A blocked URL is never fetched, so the noindex is never read —
     and Google may index the bare URL with no snippet instead. -->

# robots.txt
Disallow: /pricing

<!-- /pricing -->
<meta name="robots" content="noindex" />

<!-- Pick one: block it OR noindex it. Never both. -->`;

const breadcrumbSchema = `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2, "name": "Docs",
      "item": "https://example.com/docs" },
    { "@type": "ListItem", "position": 3, "name": "Install",
      "item": "https://example.com/docs/install" }
  ]
}`;

const redirectChain = `# A chain costs a round trip per hop and dilutes link equity.
http://example.com/old   → 301 → https://example.com/old
https://example.com/old  → 301 → https://example.com/new
https://example.com/new  → 200

# Collapse it. One hop, always.
http://example.com/old   → 301 → https://example.com/new`;

function Body() {
  return (
    <>
      <P>
        Technical SEO has an unusually poor ratio of advice to impact. Most
        checklists are exhaustive lists of things that are true but rarely
        decisive, which leaves you auditing image alt text on a site that is
        serving two versions of every URL.
      </P>
      <P>
        This one is ordered by how much damage the problem does when it is
        present. Work down it and stop when you run out of afternoon — the
        ordering is the useful part.
      </P>

      <Callout>
        Nothing below matters if the page does not answer the query. Technical
        SEO removes obstacles between good content and its ranking; it does not
        substitute for the content.
      </Callout>

      <H2 id="indexability">First: can it be indexed at all</H2>
      <P>
        Every other item is irrelevant until this one is clean. These are the
        failures that remove pages from search entirely, and they are usually
        invisible from the browser.
      </P>

      <H3 id="robots-conflicts">Contradictory crawl directives</H3>
      <P>
        The most common serious mistake, and it looks like caution rather than
        error. Blocking a URL in <Code>robots.txt</Code> while also serving a{" "}
        <Code>noindex</Code> tag does not doubly-remove the page — it prevents
        the crawler from ever reading the tag.
      </P>
      <Pre label="the contradiction">{conflicting}</Pre>
      <P>
        Decide which you want. <Code>noindex</Code> keeps the page crawlable so
        the directive is seen and link equity still flows through it.{" "}
        <Code>Disallow</Code> saves crawl budget on pages whose content is
        genuinely irrelevant. Use <Code>noindex</Code> unless you have a crawl
        budget problem, which almost nobody under 10,000 pages does.
      </P>

      <H3 id="staging-noindex">A staging directive that shipped</H3>
      <P>
        A site-wide <Code>noindex</Code> added to protect a staging environment
        and deployed to production is the single most expensive one-line bug in
        this discipline. It is worth an automated check that fails the build.
      </P>

      <H3 id="canonicals">Canonical tags that point somewhere else</H3>
      <P>
        A canonical is a strong hint about which URL should rank. Pointing every
        page at the homepage — a surprisingly common templating error —
        instructs Google to drop the entire site from the index except one page.
      </P>
      <Pre label="head">{canonical}</Pre>
      <P>
        Every indexable page should carry a self-referential canonical with the
        absolute URL. Check a few nested pages, not just the homepage; the
        template bug only shows up below the root.
      </P>

      <H2 id="duplication">Second: one URL per thing</H2>
      <P>
        Serving identical content at several addresses splits its ranking
        signals between them. The usual culprits are mechanical:
      </P>
      <Ul>
        <Li>
          <strong>Protocol and subdomain.</strong>{" "}
          <Code>http://</Code>, <Code>https://</Code>, <Code>www.</Code> and
          bare should resolve to one canonical form with a single redirect.
        </Li>
        <Li>
          <strong>Trailing slashes.</strong> <Code>/docs</Code> and{" "}
          <Code>/docs/</Code> are different URLs. Pick one and redirect.
        </Li>
        <Li>
          <strong>Query parameters.</strong> Tracking and sort parameters
          generate infinite variants of the same page. Canonicalise to the clean
          URL.
        </Li>
        <Li>
          <strong>Pagination and filters.</strong> Faceted navigation can
          produce thousands of near-identical URLs. This is the one case where
          crawl budget genuinely matters.
        </Li>
      </Ul>
      <Pre label="redirects">{redirectChain}</Pre>
      <P>
        Collapse redirect chains while you are here. Each hop costs a round trip
        and loses a little signal, and chains accumulate silently across years
        of site restructures.
      </P>

      <H2 id="rendering">Third: what the crawler actually receives</H2>
      <P>
        Google renders JavaScript, but rendering is queued separately from
        crawling and can lag by days. Content that only exists after hydration
        is indexed late and sometimes incompletely.
      </P>
      <P>
        The test that settles it: fetch the page with JavaScript disabled, or
        run <Code>curl</Code> against it, and read what comes back. If your
        headings and body copy are absent from the raw HTML, that is what the
        crawler sees first.
      </P>
      <P>
        Server-render or statically generate anything you want ranked. Client
        rendering is fine for dashboards behind a login, which are not being
        indexed anyway.
      </P>

      <H2 id="structure">Fourth: structure and internal links</H2>
      <Ul>
        <Li>
          <strong>One <Code>h1</Code> per page</strong>, describing that page
          specifically. Headings below it should nest in order — skipping from{" "}
          <Code>h2</Code> to <Code>h4</Code> is a small signal loss and an
          accessibility problem.
        </Li>
        <Li>
          <strong>Descriptive internal links.</strong>{" "}
          &quot;Read more&quot; tells a crawler nothing about the destination.
          The anchor text is one of the stronger signals about what the target
          page is about.
        </Li>
        <Li>
          <strong>No orphan pages.</strong> A page reachable only from the
          sitemap is a page Google considers unimportant. If it matters, link to
          it from somewhere in the navigation or the body of a related page.
        </Li>
        <Li>
          <strong>Depth under four clicks.</strong> Pages buried deeper are
          crawled less often and rank worse, roughly regardless of quality.
        </Li>
      </Ul>

      <H2 id="structured-data">Fifth: structured data</H2>
      <P>
        Schema does not directly improve rankings. It determines whether your
        result gets a rich presentation — breadcrumbs instead of a bare URL,
        star ratings, FAQ dropdowns — which affects click-through rate, and it
        is increasingly how AI answer engines decide whether a page is
        attributable.
      </P>
      <Pre label="breadcrumbs.json">{breadcrumbSchema}</Pre>
      <P>
        Worth adding, in order: <Code>BreadcrumbList</Code> on every nested
        page, <Code>Organization</Code> once on the site,{" "}
        <Code>Article</Code> on editorial content with a named author and a real{" "}
        <Code>dateModified</Code>. Validate with Google&apos;s Rich Results Test
        — invalid schema is ignored silently, which is indistinguishable from
        having none.
      </P>

      <H2 id="vitals">Last: Core Web Vitals</H2>
      <P>
        Deliberately last. Vitals are a tiebreaker between otherwise comparable
        results, and a site with the problems above will not reach the tie.{" "}
        <A href="/blog/core-web-vitals-what-actually-moves-the-score">
          What actually moves the score
        </A>{" "}
        covers them properly, including why your lab score and your field data
        disagree.
      </P>

      <H2 id="cadence">How often to run this</H2>
      <P>
        The indexability checks belong in CI, because they are the ones that
        cause catastrophic, silent damage. The rest is a quarterly exercise
        unless you have shipped a restructure, in which case do it the week
        after.
      </P>

      <Callout>
        <A href="/seo-audits">Quantalog&apos;s SEO audits</A> run these checks
        against any page you track — indexability, canonicals, redirect chains,
        structured data validity, broken links and Lighthouse vitals — and
        re-run them on a schedule so a regression surfaces as a change rather
        than as a discovery months later.
      </Callout>
    </>
  );
}

export const technicalSeoAudit: Post = {
  slug: "technical-seo-audit-checklist",
  title: "A technical SEO audit ordered by what actually breaks",
  description:
    "Most checklists are alphabetical. This one is ranked by damage: indexability failures first, duplication second, rendering third — and Core Web Vitals last, on purpose.",
  date: "2026-08-22",
  tags: ["SEO", "Engineering", "Performance"],
  author: { name: "Ajay Goswami", role: "Founder" },
  readingMinutes: 11,
  Body,
};
