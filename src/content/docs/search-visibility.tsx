import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, A } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Search visibility connects Google Search Console to Quantalog. It shows the searches your site appeared for,
        the clicks and impressions it earned, where it ranks, and whether Google has indexed a page — alongside the
        traffic you already track. The only thing it changes in your Search Console account is a sitemap you choose to
        submit or remove.
      </P>

      <H2 id="before-you-start">Before you start: add and verify your site in Search Console</H2>
      <P>
        Quantalog only reads data that already exists in Google Search Console — it does not create a property for
        you. If your site is not there yet, add it first:
      </P>
      <Ul>
        <Li>
          Open <A href="https://search.google.com/search-console">Google Search Console</A> and press{" "}
          <b>Add property</b>.
        </Li>
        <Li>
          Choose <b>Domain</b> and enter your bare domain (<code>example.com</code>), then verify it with a DNS TXT
          record through your domain registrar. This covers every subdomain and both http and https, and is what
          Quantalog expects when it looks for a matching property. If you cannot edit DNS, use <b>URL prefix</b>{" "}
          instead and verify with the HTML file, meta tag, or Google Analytics option Search Console offers —
          this only covers the exact address you enter.
        </Li>
        <Li>
          Once verification succeeds, submit your sitemap so Google starts crawling and reporting on your pages. You
          can do this from the <b>Sitemaps</b> tab in Quantalog after connecting, or under <b>Sitemaps</b> in Search
          Console.
        </Li>
      </Ul>
      <Callout>
        Google only collects data from the day a property is verified, so a brand-new property shows little to
        nothing for the first few days — this is expected, not a connection problem.
      </Callout>
      <P>Two more things to have ready before connecting:</P>
      <Ul>
        <Li>You need admin access to the Quantalog workspace to connect Google or change a property.</Li>
        <Li>The Google account you sign in with must be an owner or full user of the property you just verified.</Li>
      </Ul>

      <H2 id="connecting">Connecting Google</H2>
      <P>
        Open <b>Search visibility</b> in the sidebar and press <b>Connect with Google</b>, or open{" "}
        <b>Apps</b>, find <b>Google Search Console</b> under <b>Search &amp; SEO</b> and press{" "}
        <b>Continue to Google</b>. A Google window opens:
      </P>
      <Ul>
        <Li>Choose the Google account that owns your Search Console property.</Li>
        <Li>
          Tick <b>View and manage Search Console data for your verified sites</b>, then press <b>Continue</b>.
        </Li>
      </Ul>
      <Callout variant="warn">
        Google sometimes shows that permission unticked. If you continue without ticking it, the connection fails with
        a message asking you to tick it — press Connect again and tick the box.
      </Callout>
      <P>
        One Google connection covers the whole workspace. Each site in the workspace is then linked to its own property.
        The Google Search Console page in Apps lists every website with its property: use{" "}
        <b>Link property</b>, <b>Change</b> or <b>Unlink</b> on any row, switch Google account, or <b>Disconnect</b>.
      </P>

      <H2 id="linking">Linking a property</H2>
      <P>
        After connecting, Quantalog lists every Search Console property that Google account can see and marks the ones
        that cover your site&apos;s domain. The best match is selected for you; press <b>Link property</b> to finish.
      </P>
      <H3 id="property-types">Domain or URL-prefix?</H3>
      <Ul>
        <Li>
          <b>Domain property</b> (<code>sc-domain:example.com</code>) covers every subdomain and both http and https.
          It gives the most complete data and is the one to pick when you have it.
        </Li>
        <Li>
          <b>URL-prefix property</b> (<code>https://example.com/</code>) covers only addresses that start with that
          exact URL. <code>https://www.example.com/</code> and <code>https://example.com/</code> are different
          properties.
        </Li>
      </Ul>
      <P>
        Properties on a different domain are listed under <b>Other properties on this account</b>. You can link one
        with <b>Link anyway</b> — useful when a site&apos;s domain changed — but its Google data will then show for
        this site.
      </P>
      <P>
        To use a different property later, open the <b>⋯</b> menu on the Search visibility page and choose{" "}
        <b>Change property</b>.
      </P>

      <H2 id="reports">The reports</H2>
      <P>
        The toolbar sets the search type and the date range for every tab. Each range is compared with the
        equal-length period before it. Search types:
      </P>
      <Ul>
        <Li>
          <b>Web</b>, <b>Image</b>, <b>Video</b> and <b>News tab</b> — the tabs of Google Search.
        </Li>
        <Li>
          <b>Lens and image search</b> — results from Google Lens, Circle to Search and image uploads.
        </Li>
        <Li>
          <b>Discover</b> — your pages shown in the Google app&apos;s Discover feed.
        </Li>
        <Li>
          <b>Google News</b> — news.google.com and the Google News app.
        </Li>
      </Ul>
      <Callout>
        The Queries tab is hidden for Lens and image search, Discover and Google News, because they aren&apos;t based
        on typed queries. Pages, countries and devices work as usual.
      </Callout>
      <Ul>
        <Li>
          <b>Overview</b> — total clicks, impressions, average click-through rate and average position, with the change
          against the previous period. Tick the cards to overlay those metrics on the chart. Below it, the{" "}
          <b>Last 48 hours</b> chart shows clicks or impressions hour by hour in your time zone, with the last 24 hours
          compared to the 24 before — useful right after publishing. Then how your branded and
          non-branded searches compare, your top queries and your top pages.
        </Li>
        <Li>
          <b>Insights</b> — a ranked list of actions: queries in positions 4–20 that could reach page one, page-one
          results earning fewer clicks than their position usually gets, and pages or queries losing clicks. Each item
          shows the numbers behind it and an estimated impact. The <b>Top movers</b> chart shows the biggest gains and
          losses.
        </Li>
        <Li>
          <b>Queries</b> and <b>Pages</b> — every query and page with clicks, change, impressions, CTR and position.
          Search, sort any column, and page through up to 25,000 rows. Pages also show <b>Views</b>: the visits
          Quantalog tracked for that page in the same period, from every source.
        </Li>
        <Li>
          <b>Countries</b> — where the people searching are.
        </Li>
        <Li>
          <b>Devices</b> — each device&apos;s share of clicks and how they compare on clicks, impressions, CTR and
          position.
        </Li>
        <Li>
          <b>Appearance</b> — the special result types Google shows your pages in, such as product snippets, reviews or
          videos. Click one to see the pages behind it.
        </Li>
        <Li>
          <b>Web vitals</b> — how fast and steady your site is for real Chrome visitors. See{" "}
          <A href="#web-vitals">Web vitals</A>.
        </Li>
        <Li>
          <b>Indexing</b> — which of your pages are on Google, and why the rest aren&apos;t. See{" "}
          <A href="#indexing">Indexing</A>.
        </Li>
        <Li>
          <b>Links</b> — the sites linking to you, your most linked pages and the words used. See{" "}
          <A href="#links">Links</A>.
        </Li>
        <Li>
          <b>Sitemaps</b> — every sitemap submitted to Search Console, its status, errors and warnings, and when Google
          last read it. Submit a new sitemap or remove one from here.
        </Li>
      </Ul>

      <H3 id="branded">Branded and non-branded searches</H3>
      <P>
        Google sorts searches into ones for your brand and everything else. The Overview compares the two; click a row
        to see its queries. Google provides this from 21 February 2026, and only for top-level properties with enough
        searches, so smaller sites may not see it.
      </P>

      <H2 id="filters">Filters</H2>
      <P>
        Press <b>Add filter</b> to narrow every report except Web vitals, Indexing, Links and Sitemaps by query, page, country, device or
        brand. Query and page filters can match text, exclude it, or use a regular expression. Add several to combine
        them, such as one country on mobile, and click a filter to remove it.
      </P>
      <Ul>
        <Li>Google can&apos;t combine a query filter with a brand filter, so adding one replaces the other.</Li>
        <Li>Page views, Orbit and a page&apos;s own detail view are not filtered.</Li>
      </Ul>

      <H2 id="web-vitals">Web vitals</H2>
      <P>
        This tab uses the Chrome UX Report, the data behind the Core Web Vitals report in Search Console. Switch between
        mobile, desktop and all devices to see whether your site passes, each vital with its four-week change, up to 40
        weeks of history, and the result for your 10 pages with the most Google clicks.
      </P>
      <Ul>
        <Li>Each figure covers 28 days of visits, whatever date range the toolbar shows. Google updates it weekly.</Li>
        <Li>
          Your site passes when LCP and CLS, plus INP where Google has it, are good for at least 75% of visits.
        </Li>
        <Li>
          Google only reports sites and pages with enough Chrome visits. When your site has too few, the tab shows the
          vitals measured by your own visitors instead.
        </Li>
      </Ul>

      <H2 id="indexing">Indexing</H2>
      <P>
        Quantalog lists up to 500 pages from your sitemap and your Google results. Press <b>Check pages</b> and choose
        10, 25 or 50 to ask Google about the next ones. Pages that don&apos;t appear in your top results are checked
        first, because they are the most likely to be missing. Nothing is checked until you ask.
      </P>
      <Ul>
        <Li>Each page uses one of your plan&apos;s monthly index checks. Editors and above can run checks.</Li>
        <Li>Results are kept for 90 days. Pages checked more than 7 days ago join the end of the queue.</Li>
        <Li>Pages that aren&apos;t on Google are grouped by Google&apos;s reason; click one to see its pages.</Li>
        <Li>Structured data found on checked pages is grouped by type, with any issues.</Li>
      </Ul>
      <Callout>
        Google doesn&apos;t share its full Page indexing report, so this covers the pages checked here rather than every
        address Google knows.
      </Callout>

      <H2 id="links">Links</H2>
      <P>
        Google doesn&apos;t share its Links report either, so this tab uses the links Quantalog tracks in{" "}
        <b>Backlinks</b>: your top linked pages, top linking sites and top linking text. <b>Find new links</b> looks
        through your last 90 days of referrers and confirms each link. The numbers differ from Google&apos;s.
      </P>

      <H2 id="submitting-sitemaps">Submitting a sitemap</H2>
      <P>
        On the <b>Sitemaps</b> tab, enter the full sitemap address, such as{" "}
        <code>https://example.com/sitemap.xml</code>, and press <b>Submit</b>. Google queues it and reads it within a
        few hours to a few days; until then it shows as <b>Pending</b>. Submitting a sitemap that is already listed
        asks Google to read it again. Use the remove button on a row to stop Google from reading that sitemap; the
        pages it listed stay in Google.
      </P>
      <Ul>
        <Li>You need admin access to the Quantalog workspace.</Li>
        <Li>The connected Google account must be an owner or full user of the property. Restricted users can only view.</Li>
        <Li>The sitemap must sit inside the linked property, for example on the same domain.</Li>
      </Ul>
      <Callout>
        Connected before sitemap submission was added? The tab shows <b>Reconnect Google</b>. Press it and allow the
        new permission once; your linked properties are kept.
      </Callout>
      <Callout>
        Clicks and visits measure different things. Google counts a click on your search result; Quantalog counts a page
        that actually loaded, from any source. A page with far more views than clicks gets most of its traffic from
        somewhere other than Google.
      </Callout>

      <H2 id="page-detail">Page detail and index status</H2>
      <P>
        Click any page — in a table, an insight, or the <b>Find a page</b> search (press <code>/</code>) — to open its
        detail view: its own clicks, impressions, CTR, position and views, the daily trend, and the queries that bring
        people to it.
      </P>
      <P>
        The <b>index status</b> card asks Google&apos;s URL Inspection API about that exact URL:
      </P>
      <Ul>
        <Li>
          whether the page is <b>on Google</b>, <b>not on Google</b>, or <b>blocked</b> (robots.txt or{" "}
          <code>noindex</code>)
        </Li>
        <Li>Google&apos;s own reason, such as &ldquo;Submitted and indexed&rdquo; or &ldquo;Crawled — currently not indexed&rdquo;</Li>
        <Li>when Google last crawled it, and whether the fetch succeeded</Li>
      </Ul>
      <P>
        Each new check uses one of your plan&apos;s monthly index checks. A result is kept for a few hours, so
        re-opening the same page does not use another check.
      </P>

      <H2 id="query-detail">Query detail</H2>
      <P>
        Click a query to open it in a side panel: its trend, its totals against the previous period, and every page
        that ranks for it. Opening one of those pages takes you to its page detail.
      </P>

      <H2 id="orbit">Orbit AI</H2>
      <P>
        On the Pro plan, Orbit can read your Google search data for the selected period:
      </P>
      <Ul>
        <Li>
          <b>Orbit summary</b> on the Overview writes a short read of what changed and what to do next.
        </Li>
        <Li>
          The Orbit button on each metric card explains <b>why that metric changed</b>.
        </Li>
        <Li>
          <b>Ask Orbit</b> opens a chat to ask anything about your search data — on a page&apos;s detail view it answers
          about that page.
        </Li>
      </Ul>
      <P>
        Orbit answers only from your Search Console numbers and says so when the data cannot answer a question. Each
        answer counts as one Orbit question. See <A href="/docs/orbit-ai">Orbit AI</A>.
      </P>

      <H2 id="plans">What each plan includes</H2>
      <Ul>
        <Li>
          <b>Every plan</b> — Web vitals, search appearance, branded searches, links and filters.
        </Li>
        <Li>
          <b>Free</b> — connect Search Console; the last 7 days; top 10 queries, pages and countries.
        </Li>
        <Li>
          <b>Starter</b> — up to 3 months; every row; search insights (top 5 per insight); Google clicks beside
          Quantalog views; the Indexing tab with 100 index checks a month.
        </Li>
        <Li>
          <b>Pro</b> — up to 16 months; full insights; 1,000 index checks a month.
        </Li>
      </Ul>
      <P>
        Index checks reset with each billing period. Anything beyond your plan shows a lock and an upgrade option rather
        than an error. See <A href="/docs/billing">Plans and billing</A>.
      </P>

      <H2 id="freshness">How fresh the data is</H2>
      <P>
        Google publishes performance data with a delay of about two to three days, and the most recent days can still
        rise as Google finalises them. Quantalog caches each report for a few hours; <b>Refresh</b> in the toolbar
        fetches the latest from Google. Google keeps 16 months of performance history, which is the longest range
        available.
      </P>

      <H2 id="privacy">Access and disconnecting</H2>
      <Ul>
        <Li>
          Quantalog requests Google&apos;s Search Console permission. The only change it makes is submitting or
          removing a sitemap when you ask it to. It never requests indexing, removes URLs, or changes users or
          settings.
        </Li>
        <Li>Google tokens are encrypted at rest and are never shown in the dashboard.</Li>
        <Li>
          <b>Disconnect Search visibility</b> in the <b>⋯</b> menu revokes Quantalog&apos;s access with Google and
          deletes the search data stored for every site in the workspace.
        </Li>
      </Ul>

      <H2 id="troubleshooting">Troubleshooting</H2>
      <H3 id="not-configured">Search visibility isn&apos;t available</H3>
      <P>
        If the page shows that Google Search Console isn&apos;t set up on this deployment, the integration hasn&apos;t
        been enabled yet — check with your Quantalog administrator. This is separate from connecting your own Google
        account, which is the next step once it is enabled.
      </P>
      <H3 id="no-property">No property matches my site</H3>
      <P>
        The signed-in Google account cannot see a property for your domain. Verify the site in Search Console, or use{" "}
        <b>Switch account</b> to sign in with the Google account that owns it, then press <b>Refresh</b>.
      </P>
      <H3 id="no-data">The reports are empty</H3>
      <P>
        A newly verified property has no data yet, and a site with very little search traffic may have nothing for a
        7-day range. Try a longer range, and check that you linked the property that matches the address visitors
        actually use (with or without <code>www</code>).
      </P>
      <H3 id="index-unavailable">Index status is unavailable</H3>
      <P>
        Google could not inspect that URL — usually because it is not part of the linked property, for example a{" "}
        <code>www</code> address on a property without it. Use <b>Inspect in Search Console</b> on the card to check it
        directly.
      </P>
      <H3 id="reconnect">&ldquo;Reconnect Search visibility&rdquo;</H3>
      <P>
        Google access stopped working — the permission was removed from the Google account, or the account lost access
        to the property. Press <b>Reconnect Google</b>; your linked properties are kept.
      </P>
    </>
  );
}

export const searchVisibility: Doc = {
  slug: "search-visibility",
  title: "Search visibility",
  description:
    "Connect Google Search Console to see clicks, impressions, rankings, insights and index status next to your traffic.",
  category: "Tracking",
  order: 13.5,
  Body,
};
