import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout, Pre } from "@/components/prose";
import { site } from "@/lib/site";

function Body() {
  return (
    <>
      <P>
        The tracker&apos;s behaviour is controlled with <Code>data-*</Code>{" "}
        attributes on the script tag itself. Every option is off by default, so
        an existing snippet keeps working exactly as it did — add only what you
        need.
      </P>
      <P>
        You don&apos;t have to write these by hand: open a site in{" "}
        <b>Workspaces</b>, expand it, and the install snippet has a matching set
        of controls that build the tag for you.
      </P>

      <H2 id="reference">All options</H2>
      <Ul>
        <Li>
          <Code>data-site</Code> — your site key. The only required attribute.
        </Li>
        <Li>
          <Code>data-dnt=&quot;on&quot;</Code> — skip visitors whose browser
          sends Do Not Track.
        </Li>
        <Li>
          <Code>data-hash=&quot;on&quot;</Code> — treat the URL hash as the
          route, for hash-based routers.
        </Li>
        <Li>
          <Code>data-ignore-pages</Code> — comma-separated path globs to never
          report.
        </Li>
        <Li>
          <Code>data-allow-params</Code> — comma-separated query parameters to
          keep on the reported path.
        </Li>
        <Li>
          <Code>data-domain</Code> — report a different hostname than the one
          being browsed.
        </Li>
        <Li>
          <Code>data-clicks=&quot;off&quot;</Code> — turn off click tracking.
        </Li>
        <Li>
          <Code>data-errors=&quot;off&quot;</Code> — turn off JavaScript error
          tracking.
        </Li>
      </Ul>

      <Pre label="every option set">{`<script async
        src="${site.api}/tracker.js"
        data-site="YOUR_SITE_ID"
        data-dnt="on"
        data-hash="on"
        data-ignore-pages="/admin/*,/preview"
        data-allow-params="plan,ref"
        data-domain="example.com"></script>`}</Pre>

      <H2 id="dnt">Do Not Track</H2>
      <P>
        With <Code>data-dnt=&quot;on&quot;</Code>, visitors whose browser sends
        a Do Not Track signal are not tracked at all — no pageview, no
        engagement, nothing. It is off by default because Quantalog stores no
        personal data either way, but sites with a stricter policy can opt in.
      </P>

      <H2 id="hash">Hash-based routing</H2>
      <P>
        Some routers navigate with <Code>#/pricing</Code> rather than changing
        the path. Without this option every one of those routes reports the same
        pathname, and your whole site collapses into a single row.
      </P>
      <Pre label="what gets reported">{`data-hash="on"    ->  /#/pricing  becomes  /pricing
(default)         ->  /#/pricing  becomes  /`}</Pre>

      <H2 id="ignore">Ignoring pages</H2>
      <P>
        Pass path globs to leave whole sections out of your analytics. A{" "}
        <Code>*</Code> matches any run of characters; everything else is
        literal, and rules must match the full path.
      </P>
      <Pre label="matching">{`data-ignore-pages="/admin/*,/preview"

/admin          not ignored  (the glob needs a trailing segment)
/admin/users    ignored
/preview        ignored
/previewer      not ignored  (rules match the whole path)`}</Pre>

      <H2 id="params">Query parameters</H2>
      <P>
        Query strings are dropped from the reported path by default. They
        routinely carry personal data — emails, reset tokens, session ids — and
        they shatter one page into thousands of near-identical rows. Name the
        parameters that are actually worth keeping:
      </P>
      <Pre label="allowing specific params">{`data-allow-params="plan,ref"

/buy?plan=pro&email=a@b.c   ->  /buy?plan=pro
/buy?email=a@b.c            ->  /buy`}</Pre>
      <Callout>
        UTM parameters are always captured as campaign data regardless of this
        setting — they are read separately and never need to be allowed here.
      </Callout>

      <H2 id="domain">Reporting as another domain</H2>
      <P>
        Set <Code>data-domain</Code> when a staging or preview deploy should
        report into the production site&apos;s numbers rather than looking like
        separate traffic.
      </P>
    </>
  );
}

export const scriptOptions: Doc = {
  slug: "script-options",
  title: "Script options",
  description:
    "Every data-* attribute the tracker accepts: Do Not Track, hash routing, ignored pages, query parameters, and domain overrides.",
  category: "Tracking",
  order: 2,
  Body,
};
