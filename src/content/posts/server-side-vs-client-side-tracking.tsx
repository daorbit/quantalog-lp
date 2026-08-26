import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const clientSide = `<!-- Client-side: the browser reports on itself.
     Blockable, but it knows things the server never sees. -->
<script defer src="https://analytics.example.com/tracker.js"
        data-site="abc123"></script>`;

const serverSide = `// Server-side: the request handler reports the visit.
// Unblockable, but blind to everything after the response is sent.
app.get("/pricing", async (req, res) => {
  await analytics.track({
    path: req.path,
    // The client hints the browser volunteered on the request.
    userAgent: req.get("user-agent"),
    referrer: req.get("referer"),
    // Never the raw address — hash it with a daily-rotating salt.
    visitor: hashVisitor(req.ip, req.get("user-agent")),
  });
  res.render("pricing");
});`;

const hashing = `import { createHash } from "node:crypto";

// The salt rotates daily, so the same visitor produces a different id
// tomorrow. That is what makes the hash non-reversible in practice and
// keeps the identifier outside the definition of personal data.
function hashVisitor(ip: string, userAgent: string): string {
  return createHash("sha256")
    .update(\`\${DAILY_SALT}:\${ip}:\${userAgent}\`)
    .digest("hex")
    .slice(0, 32);
}`;

const hybrid = `// The pattern worth copying: the browser reports engagement,
// the server reports the events that must not be lost.

// Browser — cheap, rich, and allowed to fail.
track("video_played", { id: "intro", at: 12 });

// Server — money. Never trust the client for this one.
await analytics.track({
  event: "subscription_created",
  plan: sub.plan,
  amountCents: sub.amountCents,
});`;

function Body() {
  return (
    <>
      <P>
        The choice between server-side and client-side tracking is usually
        presented as a question about ad blockers, which undersells it. They
        measure genuinely different things, fail in different directions, and
        the interesting answer is not which one wins but which parts of your
        data belong on each side.
      </P>

      <Callout>
        Short version: client-side sees the visitor, server-side sees the truth.
        Anything tied to revenue belongs on the server. Anything tied to
        behaviour has to come from the browser, because the server cannot see
        it.
      </Callout>

      <H2 id="what-each-sees">What each one can actually observe</H2>
      <P>
        A server knows that a request arrived, what it asked for, what it sent
        back and how long that took. That is the complete list. Once the
        response leaves, the server is blind — it does not know whether the page
        rendered, whether anyone scrolled, whether the visitor read for four
        minutes or closed the tab in two seconds.
      </P>
      <Pre label="server.ts">{serverSide}</Pre>
      <P>
        A browser knows all the things the server cannot: viewport size, whether
        the tab was ever visible, how far down the page someone got, which
        button they clicked, how long they stayed, and the real Core Web Vitals
        the visit produced. It also knows the referrer with more nuance, and it
        can tell a prefetch from a human.
      </P>
      <Pre label="index.html">{clientSide}</Pre>
      <P>
        This is the part that matters and gets skipped: server-side tracking is
        not a more reliable version of client-side tracking. It is a narrower
        one. Moving your analytics to the server does not recover the pageviews
        an ad blocker cost you — it changes what a &quot;pageview&quot; means.
      </P>

      <H2 id="failure-modes">They fail in opposite directions</H2>
      <H3 id="client-undercounts">Client-side undercounts</H3>
      <P>
        Blockers, strict privacy modes, JavaScript errors before the tracker
        loads, and visitors who leave before the script executes all remove real
        humans from your numbers. Depending on your audience this ranges from
        negligible to about a third of traffic — a developer-tools audience is
        the worst case, and a consumer audience the mildest.
      </P>

      <H3 id="server-overcounts">Server-side overcounts</H3>
      <P>
        The opposite problem, and the one people are unprepared for. Your server
        logs every request, including the ones no human made: bots, uptime
        monitors, prefetchers, security scanners, link previews from every chat
        app someone pasted your URL into, and your own health checks. Raw
        server-side numbers are reliably inflated, sometimes dramatically, and
        the filtering that fixes it is work you now own.
      </P>
      <P>
        Neither number is correct. One is missing humans, the other is counting
        machines. What you want is to know which is which — see{" "}
        <A href="/blog/why-your-analytics-undercounts-traffic">
          why your analytics undercounts traffic
        </A>{" "}
        for the client-side half of that.
      </P>

      <H2 id="privacy">The privacy trade is not what it looks like</H2>
      <P>
        Server-side tracking is often sold as the privacy-friendly option
        because no third-party script runs in the browser. That is true and it
        is not the whole picture: your server receives the visitor&apos;s IP
        address on every single request, whether you wanted it or not.
      </P>
      <P>
        An IP address is personal data under GDPR. Storing it, or storing
        anything derived from it that could be reversed, puts you squarely in
        scope. The fix is to never persist it — derive an identifier at the edge
        and discard the input.
      </P>
      <Pre label="hash.ts">{hashing}</Pre>
      <P>
        The daily rotation is the load-bearing part. Without it the hash is a
        stable pseudonymous identifier that follows someone indefinitely, which
        is the thing regulators actually object to. With it, cross-day
        correlation is impossible even for you.
      </P>
      <P>
        Done this way, neither approach needs a consent banner — the analysis in{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>{" "}
        applies to both, because it turns on storage and identifiers rather than
        on where the code runs.
      </P>

      <H2 id="hybrid">The arrangement that actually works</H2>
      <P>
        Split by consequence rather than by preference. Ask what happens if a
        given event is silently lost.
      </P>
      <Ul>
        <Li>
          <strong>If losing it costs money, put it on the server.</strong>{" "}
          Purchases, signups, subscription changes, refunds. These must be
          exact, and the client is both blockable and forgeable.
        </Li>
        <Li>
          <strong>
            If it describes what a person did, it has to be client-side.
          </strong>{" "}
          Scroll depth, time on page, clicks, video engagement, form abandonment
          — the server has no visibility into any of it.
        </Li>
        <Li>
          <strong>Pageviews can be either, and should be one.</strong> Counting
          both without deduplicating produces double counts that look like
          growth. Pick the client for engagement accuracy or the server for
          completeness, and be consistent.
        </Li>
        <Li>
          <strong>Never trust a client-reported amount.</strong> Anything a
          browser sends can be edited by whoever is holding the browser.
        </Li>
      </Ul>
      <Pre label="checkout.ts">{hybrid}</Pre>

      <H2 id="choosing">If you only want one</H2>
      <P>
        Most sites should start client-side. The undercount is a known, roughly
        constant bias — and a constant bias still shows you trends correctly,
        which is what the majority of analytics decisions actually need. It is
        also a script tag rather than a change to your request handlers.
      </P>
      <P>
        Add server-side when a specific number needs to be exact rather than
        directional, which in practice means when it appears in a financial
        report or an invoice. That is a narrower moment than it sounds, and
        recognising it is most of the skill.
      </P>

      <Callout>
        <A href="/docs">Quantalog</A> takes both: a script tag for engagement,
        and an{" "}
        <A href="/platform-api">HTTP endpoint</A> for events you send from your
        own backend. They land in the same timeline and deduplicate on the
        visitor hash, so a hybrid setup does not produce two disagreeing sets of
        numbers.
      </Callout>
    </>
  );
}

export const serverSideVsClientSide: Post = {
  slug: "server-side-vs-client-side-analytics",
  title: "Server-side vs client-side analytics: what each one can see",
  description:
    "Not a reliability contest. Server-side overcounts bots, client-side undercounts humans, and they observe different things — how to split events between them by consequence.",
  date: "2026-08-12",
  tags: ["Analytics", "Engineering", "Privacy"],
  author: { name: "Ajay Goswami", role: "Founder" },
  readingMinutes: 9,
  Body,
};
