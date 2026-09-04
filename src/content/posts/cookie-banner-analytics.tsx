import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const cookieCheck = `// Open the console on your own site and run this.
// Anything listed here is a cookie you are responsible for.
document.cookie.split(";").map((c) => c.trim().split("=")[0]);

// Google Analytics 4 typically leaves: _ga, _ga_<container-id>`;

const dailyHash = `visitorHash = sha256(ip + userAgent + siteId + dailySalt)

// dailySalt is regenerated every 24 hours and the old one is destroyed.
// Yesterday's hashes cannot be recomputed, so the same person is a
// different value tomorrow — and no value maps back to an IP address.`;

function Body() {
  return (
    <>
      <P>
        The honest answer is: it depends on what your analytics tool does, not on
        what it is called. &ldquo;Analytics&rdquo; is not a legal category. The
        law cares about two questions — are you storing something on the
        visitor&apos;s device, and are you processing personal data — and a tool
        either triggers those or it does not.
      </P>
      <P>
        This post walks through both questions, what the actual texts say, and
        how to check your own setup in about a minute. It is written by people
        who build an analytics tool, so treat the framing as informed but
        interested — and treat the primary sources as the authority.
      </P>

      <Callout>
        Not legal advice. Regulators differ on the edges and enforcement varies
        by country. If you handle sensitive data or operate at scale, ask a
        lawyer who knows your jurisdiction.
      </Callout>

      <H2 id="two-laws">Two different laws, commonly confused</H2>
      <P>
        Almost every argument about cookie banners is really two laws being
        treated as one.
      </P>

      <H3 id="eprivacy">The ePrivacy Directive governs the storage</H3>
      <P>
        Article 5(3) is the rule that produced the banner. It says that storing
        information on, or reading information from, a user&apos;s device
        requires consent — regardless of whether that information is personal
        data. That last part is what surprises people: a purely technical
        identifier still needs consent if it lives on the device.
      </P>
      <P>
        There are two exemptions. Storage that is strictly necessary to deliver
        a service the user explicitly requested, and storage whose sole purpose
        is carrying out a transmission. A session cookie that keeps someone
        logged in is exempt. An analytics cookie is not: the visitor did not ask
        for measurement.
      </P>
      <P>
        The key point for this question:{" "}
        <strong>
          if your tool writes nothing to the device, Article 5(3) does not apply
          at all
        </strong>
        . No cookie, no <Code>localStorage</Code> entry, no fingerprint stored
        client-side — no consent requirement under this law. There is nothing to
        consent to.
      </P>

      <H3 id="gdpr">The GDPR governs the data</H3>
      <P>
        Clearing the storage question does not end the analysis. If your tool
        processes personal data, the GDPR applies whether or not anything was
        stored on the device — and an IP address is personal data. The Court of
        Justice settled that in{" "}
        <A href="https://curia.europa.eu/juris/liste.jsf?num=C-582/14">
          Breyer (C-582/14)
        </A>
        : a dynamic IP is personal data in the hands of someone who has legal
        means to identify the subscriber behind it.
      </P>
      <P>
        The GDPR, however, does not demand consent for everything. It offers six
        lawful bases, and Article 6(1)(f) — legitimate interests — is available
        for analytics where the processing is proportionate and the visitor
        would reasonably expect it. That is precisely the basis a cookieless,
        aggregate-only tool is designed to sit on.
      </P>

      <H2 id="the-test">The practical test</H2>
      <P>
        For a given analytics tool, work down this list. The first
        &ldquo;yes&rdquo; means you need a consent banner.
      </P>
      <Ul>
        <Li>
          <strong>Does it set a cookie?</strong> Any cookie, including a
          first-party one. Yes means consent, under ePrivacy.
        </Li>
        <Li>
          <strong>
            Does it write to <Code>localStorage</Code>,{" "}
            <Code>sessionStorage</Code> or IndexedDB?
          </strong>{" "}
          Same rule. The directive says &ldquo;information stored on the
          terminal equipment,&rdquo; not &ldquo;cookies.&rdquo; Swapping the
          storage mechanism changes nothing legally, which is a trap several
          &ldquo;cookieless&rdquo; vendors fall into.
        </Li>
        <Li>
          <strong>Does it store a raw IP address, ever?</strong> Personal data
          under Breyer. You may still be able to rely on legitimate interests,
          but you owe a balancing test, a retention period, and a privacy notice
          entry.
        </Li>
        <Li>
          <strong>Does it build a cross-site or persistent profile?</strong> If
          the same identifier follows someone across sites or across weeks, you
          are past what legitimate interests will comfortably carry.
        </Li>
        <Li>
          <strong>Does it send data to a third country without safeguards?</strong>{" "}
          A separate Chapter V problem, and the reason several EU regulators
          ruled against Google Analytics in 2022 — Austria, France and Italy
          each found the transfers unlawful as configured at the time.
        </Li>
      </Ul>

      <H2 id="check-yours">Checking your own site in one minute</H2>
      <P>
        Do not take a vendor&apos;s marketing page at face value, including
        ours. Open your site in a private window, accept nothing, and look.
      </P>
      <Pre label="Browser console">{cookieCheck}</Pre>
      <P>
        Then open DevTools → Application → Storage and check Local Storage and
        Session Storage for the tool&apos;s keys. A tool that calls itself
        cookieless while writing a visitor ID to <Code>localStorage</Code> has
        solved a marketing problem, not a legal one.
      </P>

      <H2 id="how-cookieless-works">How measurement works without storage</H2>
      <P>
        The objection is reasonable: if you store nothing, how do you know
        whether two pageviews are one person or two? The answer is that you
        derive a value instead of storing one, and you make it expire by
        construction.
      </P>
      <Pre label="Daily rotating hash">{dailyHash}</Pre>
      <P>
        Within a day, the same visitor produces the same hash, so sessions and
        unique visitors are countable. Across days, the salt has rotated and the
        old one is gone, so nobody — including us — can link today&apos;s
        activity to yesterday&apos;s. The trade is real and worth stating
        plainly: you lose true cross-day cohorts and individual user journeys.
        You keep every number most sites actually use.
      </P>

      <Callout>
        This is how <A href="/">Quantalog</A> works. No cookie, no{" "}
        <Code>localStorage</Code>, no raw IP retained — the address is hashed on
        receipt and discarded. See the{" "}
        <A href="/docs/privacy">privacy documentation</A> for exactly what is
        stored.
      </Callout>

      <H2 id="banner-cost">What a banner actually costs you</H2>
      <P>
        The legal question has a measurement consequence that gets discussed far
        less. Every visitor who declines, or who closes the banner without
        answering, is a visitor your analytics never sees.
      </P>
      <P>
        Published consent rates vary widely by geography and by banner design,
        and anyone quoting you a single universal figure is guessing. What is
        not in dispute is the direction: a meaningful share of European traffic
        does not opt in, those sessions are missing from your reports entirely,
        and they are not missing at random. Privacy-conscious and technical
        visitors decline more often, so the traffic you lose is skewed, not just
        smaller.
      </P>
      <P>
        That is the part worth sitting with. A 30% decline rate does not mean
        your numbers are 30% low — it means your conversion rates, your channel
        mix and your device split are all computed on a non-representative
        sample, and you have no way to correct for it.
      </P>

      <H2 id="summary">The short version</H2>
      <Ul>
        <Li>
          Cookie banners come from ePrivacy Article 5(3), which is about storing
          things on a device — not from the GDPR.
        </Li>
        <Li>
          A tool that writes nothing to the device does not trigger that rule.{" "}
          <Code>localStorage</Code> counts as writing.
        </Li>
        <Li>
          The GDPR still applies to any personal data you process, but analytics
          can often rest on legitimate interests rather than consent.
        </Li>
        <Li>
          Check your own site rather than trusting a claim. It takes a minute.
        </Li>
        <Li>
          Banners are not only a compliance cost — they put a hole in your data
          that no amount of analysis repairs.
        </Li>
      </Ul>
      <P>
        If you want measurement with no banner in the path,{" "}
        <A href="/docs/overview">Quantalog takes about three minutes to wire
        up</A>{" "}
        and the free plan does not ask for a card. The{" "}
        <A href="/analytics">analytics dashboard</A> shows what you get in
        return, and the{" "}
        <A href="/compare/google-analytics-alternative">
          comparison with Google Analytics
        </A>{" "}
        covers how the no-banner model changes the numbers.
      </P>
    </>
  );
}

export const cookieBannerAnalytics: Post = {
  slug: "do-you-need-a-cookie-banner-for-analytics",
  title: "Do you need a cookie banner for analytics?",
  description:
    "ePrivacy governs storage, the GDPR governs data, and the two get confused constantly. A practical test for whether your analytics needs consent — and how to check your own site.",
  date: "2026-08-04",
  tags: ["Privacy", "GDPR", "Analytics"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 8,
  Body,
};
