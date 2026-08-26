import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const tenantScoping = `// The rule with no exceptions: the tenant comes from the session,
// never from the request. A tenant id in the query string is a
// cross-tenant data leak waiting for someone to try it.

// Wrong — the client chooses whose data it reads.
app.get("/api/stats", (req, res) => {
  return db.stats({ siteId: req.query.siteId });
});

// Right — the token decides, and the client cannot argue.
app.get("/api/stats", requireAuth, (req, res) => {
  return db.stats({ siteId: req.session.siteId });
});`;

const iframeEmbed = `<!-- Fastest path: a scoped, short-lived token in the URL.
     Minutes of work, and it inherits none of your CSS. -->
<iframe
  src="https://analytics.example.com/embed?token=eyJ..."
  style="width:100%;height:480px;border:0"
  loading="lazy"
  title="Traffic for acme.com"
></iframe>`;

const apiEmbed = `// The other end: pull the numbers and render them yourself.
// More work, and the only option if it has to look like your product.
const res = await fetch("https://api.example.com/v1/stats", {
  headers: { authorization: \`Bearer \${serverSideKey}\` },
  // Aggregate windows, not raw events — see "what to expose" below.
  body: JSON.stringify({ siteId, from: "2026-08-01", to: "2026-08-31" }),
});

const { pageviews, visitors, topPages } = await res.json();`;

const tokenMinting = `// Mint the embed token on YOUR server, from the session you
// already trust. It expires quickly and carries exactly one site.
function mintEmbedToken(session) {
  return jwt.sign(
    { siteId: session.siteId, scope: "read:stats" },
    process.env.EMBED_SECRET,
    // Short enough that a leaked URL in a support ticket is harmless.
    { expiresIn: "15m" }
  );
}`;

function Body() {
  return (
    <>
      <P>
        Sooner or later a customer asks to see their own numbers. If you run an
        agency, a site builder, a storefront platform or anything else where
        your users have users, analytics stops being an internal tool and
        becomes a feature you ship.
      </P>
      <P>
        That transition is where most teams underestimate the work — not because
        charting is hard, but because the moment data becomes multi-tenant the
        interesting problems are about isolation, not visualisation.
      </P>

      <Callout>
        The decision that matters is not which chart library. It is whether the
        tenant boundary is enforced by your database queries or by your UI. Only
        one of those survives someone editing a URL.
      </Callout>

      <H2 id="build-vs-buy">Building it yourself is a pipeline, not a chart</H2>
      <P>
        Analytics looks like a frontend problem and behaves like a data
        engineering one. If you build it, the chart is the last and easiest
        part. Ahead of it:
      </P>
      <Ul>
        <Li>
          <strong>Ingestion that survives spikes.</strong> Event volume is
          bursty and correlated — your customers&apos; traffic peaks together.
          Writing every event straight to your primary database will take the
          rest of your product down with it.
        </Li>
        <Li>
          <strong>Storage that answers range queries cheaply.</strong> Row-per-
          event in a relational table works until it does not, and the failure
          arrives as a dashboard that takes eleven seconds to load.
        </Li>
        <Li>
          <strong>Rollups.</strong> Nobody queries raw events twice. You need
          pre-aggregated hourly and daily tables, and a backfill story for when
          the aggregation logic changes.
        </Li>
        <Li>
          <strong>Retention and deletion.</strong> When a tenant leaves, or
          exercises a GDPR erasure request, their events have to actually go —
          including from the rollups.
        </Li>
        <Li>
          <strong>Bot filtering.</strong> Otherwise you are showing customers
          inflated numbers, and they will eventually check against something
          else and find you wrong.
        </Li>
      </Ul>
      <P>
        This is a quarter of engineering time to do properly and an ongoing
        operational commitment afterwards. Worth it if analytics <em>is</em>{" "}
        your product. Rarely worth it if it is a tab in your product.
      </P>

      <H2 id="isolation">Tenant isolation is the whole security model</H2>
      <P>
        Whatever you build or buy, this is the part where mistakes are
        catastrophic rather than annoying. Showing tenant A the numbers for
        tenant B is a breach disclosure, not a bug report.
      </P>
      <Pre label="api.ts">{tenantScoping}</Pre>
      <P>
        The scoping belongs in the data layer, not the controller. A query
        function that cannot be called without a tenant id, and takes it from an
        authenticated context, makes the safe path the only path. Filtering in
        the frontend — fetching everything and displaying a subset — is not
        isolation at all; the data already left your server.
      </P>

      <H3 id="test-it">Test the boundary explicitly</H3>
      <P>
        Write the test that authenticates as tenant A, requests tenant B&apos;s
        resources by id, and asserts a 404 rather than a 403. A 403 confirms the
        resource exists, which is itself a small leak. This test should exist
        for every endpoint that takes an id.
      </P>

      <H2 id="embedding">Two ways to put it in your product</H2>
      <H3 id="iframe">An iframe with a scoped token</H3>
      <P>
        The pragmatic option. You render someone else&apos;s dashboard inside
        your page, scoped by a token you mint. Styling control is limited to
        whatever theming the provider exposes, and it will never quite look like
        your product.
      </P>
      <Pre label="dashboard.html">{iframeEmbed}</Pre>
      <P>
        Mint the token server-side, from a session you already trust, with a
        short expiry. A long-lived embed token in a URL ends up in browser
        history, support tickets and screenshots.
      </P>
      <Pre label="token.ts">{tokenMinting}</Pre>

      <H3 id="api">An API you render yourself</H3>
      <P>
        More work, complete control. You fetch aggregates and draw them with
        your own components, so it looks like the rest of your product because
        it <em>is</em> the rest of your product.
      </P>
      <Pre label="stats.ts">{apiEmbed}</Pre>
      <P>
        Keep the API key server-side. A key in client-side JavaScript is a
        public key, whatever the documentation calls it — and if it is scoped to
        your whole account rather than one tenant, that is the breach again.
      </P>

      <H2 id="what-to-expose">Expose aggregates, not events</H2>
      <P>
        A tempting shortcut is to give customers a raw event feed and let them
        do what they like with it. Resist it for two reasons.
      </P>
      <P>
        The first is practical: raw events are enormous, and every consumer will
        re-implement the same aggregation slightly differently, then file bugs
        when their number disagrees with your dashboard.
      </P>
      <P>
        The second is legal. Raw events carry more identifying signal than
        aggregates — timestamps, paths and user agents combine into something
        close to a fingerprint. Handing that to a customer makes them a data
        processor and drags both of you into a conversation about data
        processing agreements. Aggregate windows sidestep this entirely.
      </P>

      <H2 id="privacy">The compliance story is your customers&apos; too</H2>
      <P>
        When you embed analytics for your users, their compliance obligations
        become your feature requirements. If your embedded analytics sets
        cookies, every one of your customers now needs a consent banner on their
        site — because of a choice you made.
      </P>
      <P>
        Cookieless, hash-based measurement avoids inheriting that. The reasoning
        is in{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>
        , and it applies with more force here: you are making the decision on
        behalf of everyone downstream of you.
      </P>

      <H2 id="shortlist">What to check before you commit</H2>
      <Ul>
        <Li>
          Can one account hold many isolated sites, created programmatically?
          Provisioning a tenant by hand does not scale past twenty.
        </Li>
        <Li>
          Are there scoped, short-lived tokens — or only one account-wide key?
        </Li>
        <Li>
          Can you white-label it enough that it does not advertise a third party
          inside your product?
        </Li>
        <Li>
          Is per-tenant deletion supported, including from aggregates?
        </Li>
        <Li>
          Does pricing scale on total events rather than per-tenant seats? Seat
          pricing gets punishing the moment you have a thousand small tenants.
        </Li>
      </Ul>

      <Callout>
        <A href="/platform-api">Quantalog&apos;s platform API</A> is built for
        exactly this: sites created over the API, per-site scoped keys, embed
        tokens that expire, and cookieless collection so your customers do not
        inherit a banner from you. The{" "}
        <A href="/docs">docs</A> have the endpoints.
      </Callout>
    </>
  );
}

export const embeddedAnalyticsForSaas: Post = {
  slug: "embedded-analytics-for-saas",
  title: "Embedding analytics in your product without leaking tenants",
  description:
    "When your users have users, analytics becomes a multi-tenant data problem. Isolation, embed tokens, why to expose aggregates instead of raw events, and when building it yourself is a mistake.",
  date: "2026-08-25",
  tags: ["API", "Engineering", "Product"],
  author: { name: "Ajay Goswami", role: "Founder" },
  readingMinutes: 10,
  Body,
};
