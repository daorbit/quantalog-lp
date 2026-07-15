import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, Li, P, Pre, Ul } from "@/components/prose";

const provision = `curl -X POST https://api.quantalog.com/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Jane'\\''s Store", "extUserId": "user_8812" }'

curl -X POST https://api.quantalog.com/v1/projects/prj_31f/sites \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{ "name": "Store", "domain": "jane.shop", "framework": "next" }'`;

const readStats = `const res = await fetch(
  \`https://api.quantalog.com/v1/sites/\${siteId}/stats?range=24h\`,
  { headers: { Authorization: \`Bearer \${process.env.QUANTALOG_KEY}\` } }
);

const { visitors, pageviews, live, topPages, countries } = await res.json();`;

const tag = `<script
  async
  src="https://cdn.quantalog.com/tracker.js"
  data-site="qs_7f3a9c21"
></script>`;

const hash = `visitorHash = sha256(ip + userAgent + siteId + dailySalt)`;

function Body() {
  return (
    <>
      <P>
        Most analytics tools are built for one audience: the person who owns the
        website. You paste a script, you open a dashboard, you look at a number.
        That model works right up until the moment your product <em>is</em> a
        platform — a site builder, an app generator, an agency portal — and
        suddenly the person who needs the numbers isn&apos;t you. It&apos;s your
        customer, and their customer after that.
      </P>
      <P>That is the gap Quantalog was built to close.</P>

      <H2 id="two-products">Two products in one</H2>
      <P>
        Quantalog is a normal web analytics tool. Add one script tag, get visitors,
        pageviews, referrers, campaigns, devices and countries, updating live.
      </P>
      <P>
        It is also a <strong>platform API</strong>. One API key lets your backend
        create a project per end-user, register the sites they deploy, get an embed
        snippet back, and read those stats into your own UI. Your users see your
        dashboard. They never have to know we exist.
      </P>

      <Callout>
        If you have ever wanted to offer &ldquo;Analytics&rdquo; as a tab inside your
        own product without building an ingestion pipeline, that is exactly the thing
        this replaces.
      </Callout>

      <H2 id="no-cookies">No cookies, and we mean it</H2>
      <P>
        There is no cookie. There is no <Code>localStorage</Code> entry. There is no
        cross-site identifier. A visitor is a hash:
      </P>

      <Pre>{hash}</Pre>

      <P>
        The salt rotates every day. That has three consequences worth being explicit
        about:
      </P>
      <Ul>
        <Li>
          The same person visiting tomorrow is a <strong>new</strong> visitor to us.
          We cannot build a profile across days.
        </Li>
        <Li>
          The same person on two different customer sites produces two unrelated
          hashes. There is no cross-site graph to sell, or to leak.
        </Li>
        <Li>
          The raw IP is hashed on receipt and discarded. It is never written to disk.
        </Li>
      </Ul>
      <P>
        Because there is no personal identifier stored on the device, there is nothing
        for a visitor to consent to — so there is no consent banner to add.
      </P>

      <H2 id="live">Live means live</H2>
      <P>
        The tracker sends events with <Code>navigator.sendBeacon</Code>, the collector
        writes them straight to MongoDB, and the dashboard polls every three seconds.
        There is no batch window and no sampling. If someone lands on your pricing page
        while you are watching, you see it while you are watching.
      </P>
      <P>
        The tracker itself is under a kilobyte and loads with <Code>async</Code>, so it
        never blocks rendering:
      </P>

      <Pre label="app/layout.tsx">{tag}</Pre>

      <P>
        It patches <Code>history.pushState</Code> and listens for <Code>popstate</Code>,
        which means React Router and the Next.js App Router report route changes as
        pageviews with no extra code from you.
      </P>

      <H2 id="platform">Shipping analytics to your own users</H2>
      <P>
        Here is the whole integration, from the platform&apos;s side. First, provision a
        project and a site for one of your end-users:
      </P>

      <Pre label="provision.sh">{provision}</Pre>

      <P>
        That second call returns a <Code>snippet</Code>. Inject it into the{" "}
        <Code>&lt;head&gt;</Code> of the app you generate for Jane, and her site is now
        reporting. Then read her numbers back and render them wherever you like:
      </P>

      <Pre label="dashboard.ts">{readStats}</Pre>

      <P>
        <Code>extUserId</Code> is whatever your system already calls Jane. We store it
        as an opaque string and never try to authenticate her — you own that
        relationship, and every key is hard-scoped to its own workspace, so one
        customer&apos;s key can never read another&apos;s data.
      </P>

      <H2 id="next">What is next</H2>
      <P>
        The collector, the dashboard and the <Code>/v1</Code> API are live today. Next
        up: funnels, custom events, and a white-label tracker domain so the script tag
        can be served from <em>your</em> hostname.
      </P>
      <P>
        If you want to try it, the Hobby plan is free forever and takes about three
        minutes to wire up. If you are a platform and want the API,{" "}
        <A href="mailto:daorbit2k25@gmail.com">tell us what you are building</A>.
      </P>
    </>
  );
}

export const introducingQuantalog: Post = {
  slug: "introducing-quantalog",
  title: "Introducing Quantalog: real-time analytics you can embed",
  description:
    "Why we built a cookieless analytics engine with a multi-tenant API — and how to ship analytics to your own users in an afternoon.",
  date: "2026-07-13",
  tags: ["Product", "Privacy", "API"],
  author: { name: "Ajay Goswami", role: "Founder" },
  readingMinutes: 5,
  Body,
};
