import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const dailyHash = `// A daily-rotating visitor id. No storage on the device,
// nothing to consent to, and it stops being linkable at midnight.
const visitorHash = sha256(
  dailySalt +        // regenerated every 24h, old salt discarded
  siteId +
  clientIp +         // hashed here, never stored raw
  userAgent
);

// What this buys: unique visitors per day, sessions, entry pages.
// What it costs: a returning visitor next week is a new visitor.`;

const fingerprintSignals = `// A fingerprint. Every line here is a signal that persists
// across days, which is precisely what makes it a legal problem
// rather than a technical one.
canvas.toDataURL()          // GPU + driver + font rendering
audioContext                // hardware audio stack
navigator.hardwareConcurrency
screen.width + screen.height + colorDepth
Intl.DateTimeFormat().resolvedOptions().timeZone
installedFonts              // enumerated via measurement

// Stable for months. Survives clearing cookies. Requires consent
// under ePrivacy in exactly the same way a cookie does.`;

const firstPartyProxy = `# Serving the tracker from your own domain.
# Fixes blocker evasion. Fixes nothing legal.

/js/script.js      ->  proxied to your analytics vendor
/api/event         ->  proxied to your analytics vendor`;

function Body() {
  return (
    <>
      <P>
        Third-party cookies are effectively finished, and the replacements have
        sorted themselves into two groups that get discussed as though they were
        one. The first group measures without identifying anyone. The second
        identifies people through a mechanism that is not a cookie, and is
        marketed as &quot;cookieless&quot; on that technicality.
      </P>
      <P>
        Both are cookieless. Only one of them removes the compliance obligation,
        and the difference is worth understanding before choosing a vendor on
        the strength of the word.
      </P>

      <Callout>
        The regulation that governs cookie banners in the EU is not about
        cookies. ePrivacy Article 5(3) covers storing information on, or
        accessing information from, a user&apos;s device — by any means. A
        technique that avoids cookies but reads device characteristics to build
        a persistent id is inside the same rule.
      </Callout>

      <H2 id="what-broke">What actually broke</H2>
      <P>
        Worth being precise, because the deprecation was narrower than the
        coverage suggested. What ended was the <strong>third-party</strong>{" "}
        cookie — one set by a domain other than the one in the address bar, which
        is what made cross-site tracking work.
      </P>
      <P>
        First-party cookies still function. Safari&apos;s ITP caps
        JavaScript-set ones at seven days, and Firefox partitions them, so
        &quot;still function&quot; means something weaker than it did — a
        returning-visitor measurement built on a first-party cookie is
        substantially wrong on Safari and has been for years, quietly.
      </P>

      <H2 id="the-substitutes">The four substitutes</H2>

      <H3 id="rotating-hash">Rotating hashes</H3>
      <P>
        Derive an id from request characteristics, salt it with a value that is
        thrown away and regenerated daily, and never store anything on the
        device.
      </P>
      <Pre label="Server-side">{dailyHash}</Pre>
      <P>
        Nothing is written to the device and nothing is read from it beyond what
        the browser volunteers in an ordinary request, which is what keeps this
        outside 5(3). The cost is real and should be stated plainly: a visitor
        returning after the salt rotates is counted as new. Daily uniques are
        accurate. Monthly uniques are inflated, and cross-day retention is not
        available at all.
      </P>
      <P>
        That is a genuine loss. It is also the honest price of not tracking
        people, and for most sites the metrics it costs were being read less
        often than the ones it preserves.
      </P>

      <H3 id="fingerprinting">Fingerprinting</H3>
      <P>
        Combine enough device characteristics and the combination is unique. No
        storage is involved, which is the basis for calling it cookieless.
      </P>
      <Pre label="Client-side">{fingerprintSignals}</Pre>
      <P>
        This is the one to be careful about. It is stable across days, survives
        clearing site data, and cannot be opted out of by the visitor — which
        makes it more invasive than the cookie it replaced, not less. Regulators
        have addressed it directly and the position is settled: it needs consent.
      </P>
      <P>
        A vendor selling &quot;cookieless, no banner required&quot; on top of
        fingerprinting is selling you a compliance position that does not hold.
        Ask what generates the identifier, and whether it is stable across days.
        That single question separates the two groups.
      </P>

      <H3 id="server-side">Server-side and first-party proxying</H3>
      <P>
        Route collection through your own domain so requests are same-origin.
      </P>
      <Pre label="Proxy routes">{firstPartyProxy}</Pre>
      <P>
        This genuinely helps with blocker evasion, and it changes nothing about
        your legal position — the obligation attaches to what you do with the
        data, not to which hostname received it. Proxying a fingerprinting
        vendor through your own domain gives you a fingerprinting vendor on your
        own domain.
      </P>

      <H3 id="aggregate">Aggregate-only measurement</H3>
      <P>
        Store counts rather than rows. No visitor identifier of any kind: a
        pageview increments a counter for a path, a referrer, a country, a
        device class.
      </P>
      <P>
        This is the strongest position available and it is more usable than it
        sounds, because the questions most sites actually ask — which pages grew,
        where traffic came from, what converts — are answered by aggregates.
        Cohort retention and individual journeys are not, and if you need those,
        you need an identifier and should choose one deliberately.
      </P>

      <H2 id="choosing">Choosing between them</H2>
      <P>
        The decision reduces to one question: does your analytics need to
        recognise the same person on a later day?
      </P>
      <Ul>
        <Li>
          <strong>No.</strong> Rotating hashes or aggregates. No banner, no
          consent dependency, no undercount from declines, and the numbers are
          the numbers.
        </Li>
        <Li>
          <strong>Yes, for logged-in users.</strong> Use your own account id.
          You already have a lawful basis for processing your customers&apos;
          data, and it is far more accurate than any inferred identifier.
        </Li>
        <Li>
          <strong>Yes, for anonymous visitors.</strong> You are asking for
          persistent identification of people who have not identified
          themselves. That needs consent, and you should build for a consent
          rate around a third rather than assume the banner is a formality.
        </Li>
      </Ul>

      <H2 id="the-trade">The trade, stated plainly</H2>
      <P>
        Cookieless measurement done honestly loses cross-day identity. Anyone
        claiming otherwise is either fingerprinting or measuring logged-in users
        and describing it imprecisely.
      </P>
      <P>
        What it gains is worth more than it is usually credited for. Consent
        declines stop removing a third of your traffic. Blocker rates fall
        because there is no third-party request to block. And every number is a
        count of something that happened rather than a model of what probably
        happened — which, for anyone who has tried to reconcile two analytics
        tools, is not a small thing.
      </P>

      <Callout>
        <A href="/analytics">Quantalog</A> uses a daily-rotating hash with no
        device storage and no fingerprinting signals, which is why it ships
        without a banner requirement. The reasoning behind that is in{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>
        , and the accuracy consequences in{" "}
        <A href="/blog/why-your-analytics-undercounts-traffic">
          why your analytics undercounts traffic
        </A>
        .
      </Callout>
    </>
  );
}

export const cookielessTracking2026: Post = {
  slug: "cookieless-tracking-what-still-works",
  title: "Cookieless tracking in 2026: what actually still works",
  description:
    "Rotating hashes, fingerprinting, server-side proxying and aggregate-only measurement compared — which ones remove the consent obligation, which only claim to, and what each costs in accuracy.",
  date: "2026-09-04",
  tags: ["Privacy", "Analytics", "GDPR"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 10,
  Body,
};
