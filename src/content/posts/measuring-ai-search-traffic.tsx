import type { Post } from "@/lib/blog";
import { A, Callout, Code, H2, H3, Li, P, Pre, Ul } from "@/components/prose";

const referrerCheck = `// The referrer hostnames AI assistants send today.
// Not exhaustive, and it changes — treat it as a starting list.
const AI_SOURCES = [
  "chatgpt.com",
  "chat.openai.com",
  "perplexity.ai",
  "claude.ai",
  "copilot.microsoft.com",
  "gemini.google.com",
];

function isAiReferrer(referrer) {
  if (!referrer) return false;
  try {
    return AI_SOURCES.includes(new URL(referrer).hostname);
  } catch {
    return false;
  }
}`;

const utmTag = `<!-- Links you control inside your own docs, changelog or
     support answers. When a model quotes the page, the tag rides along. -->
https://example.com/pricing?utm_source=docs&utm_medium=assistant`;

const robotsSnippet = `# Answer engines crawl with their own agents, and they are
# separate from the agents that train models. Allowing one does not
# require allowing the other.

# Cites you in answers, sends referral traffic
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Training crawler — a different decision entirely
User-agent: GPTBot
Disallow: /`;

function Body() {
  return (
    <>
      <P>
        Somewhere in the last two years a share of the questions that used to
        start on Google started being answered directly by an assistant. The
        answer sometimes cites a source, the visitor sometimes clicks it, and
        that click lands in your analytics as an ordinary referral from a
        hostname you may never have thought to look for.
      </P>
      <P>
        The interesting part is not that the traffic exists. It is that it
        behaves differently from search traffic, arrives in volumes small enough
        to hide inside &quot;Direct&quot;, and is invisible in the tool most
        people use to measure acquisition unless they go looking for it
        deliberately.
      </P>

      <Callout>
        Two separate things get called &quot;AI traffic&quot; and they are worth
        keeping apart: <strong>referrals</strong>, where a person clicks a
        citation and lands on your site, and <strong>crawls</strong>, where a
        bot fetches your pages for training or for answering. Only the first is
        traffic. The second is cost.
      </Callout>

      <H2 id="why-invisible">Why it does not show up</H2>
      <P>
        Three mechanisms hide it, and they compound.
      </P>
      <P>
        The first is <strong>referrer stripping</strong>. Assistants that render
        answers in a native app, or that route clicks through a redirect, often
        arrive with no referrer at all. That visit is indistinguishable from
        someone typing your URL, and lands in Direct.
      </P>
      <P>
        The second is <strong>volume</strong>. AI referrals are still a small
        fraction of most sites&apos; acquisition. A channel worth 0.8% of
        sessions does not appear in a top-ten referrer list, which is all most
        dashboards show by default.
      </P>
      <P>
        The third is <strong>naming</strong>. There is no
        &quot;AI&quot; channel in any default channel grouping. The hostnames
        land as unclassified referrals, scattered across half a dozen rows that
        each look too small to matter, and nobody sums them.
      </P>

      <H2 id="measure-referrals">Measuring the referrals</H2>
      <P>
        The mechanical part is easy: group the known assistant hostnames into
        one bucket and chart it as a channel. The list changes, so keep it
        somewhere you can edit rather than compiled into a report.
      </P>
      <Pre label="channels.js">{referrerCheck}</Pre>
      <P>
        Two things are worth knowing before you read the resulting number.
      </P>
      <Ul>
        <Li>
          <strong>It undercounts, structurally.</strong> Because of referrer
          stripping, the true figure is higher than what you can attribute. Read
          the trend, not the absolute value.
        </Li>
        <Li>
          <strong>The sessions look unusually good.</strong> Someone who arrives
          from a cited answer has typically already read a summary of what you
          do. Higher pages per session and lower bounce than organic search is
          the normal pattern, and it is the reason a small channel can still be
          worth attention.
        </Li>
      </Ul>

      <H3 id="direct-check">Checking what is hiding in Direct</H3>
      <P>
        You cannot recover a stripped referrer, but you can test whether Direct
        is growing for reasons unrelated to brand. Two signals help. If Direct
        rises while brand-name search impressions stay flat, something else is
        sending those people. And if Direct traffic concentrates on deep pages
        — a specific comparison, one documentation section — rather than the
        homepage, it is not people typing your domain from memory.
      </P>
      <P>
        Neither is proof. Together they are decent evidence, and it is the best
        available given the constraint.
      </P>

      <H2 id="tagging">Tag the links you control</H2>
      <P>
        Assistants quote from pages they can read. Where those pages are yours —
        documentation, a changelog, support answers, a comparison page — the
        links inside them are yours to tag. When the model reproduces the link,
        the tag survives.
      </P>
      <Pre label="Internal link">{utmTag}</Pre>
      <P>
        This only covers a slice of the surface, and it is the slice you can
        actually attribute cleanly. Worth doing on the pages that get cited most.
      </P>

      <H2 id="crawlers">Crawlers are a separate decision</H2>
      <P>
        The agents that fetch your pages to answer a live question are not the
        same as the ones that fetch pages to train a model, and you can allow one
        while refusing the other. Conflating them is the most common mistake in
        this area — blocking everything with an AI-sounding name also blocks the
        crawler that would have cited you.
      </P>
      <Pre label="robots.txt">{robotsSnippet}</Pre>
      <P>
        Decide deliberately. Refusing the search agents removes you from answers
        in a channel that is growing; refusing the training agents does not.
      </P>

      <H2 id="being-cited">What makes a page quotable</H2>
      <P>
        Ranking in an answer is not the same problem as ranking in a results
        page, and the practical difference is structural. A model composing an
        answer extracts claims. Pages that state a claim plainly, near a heading
        that matches the question, get extracted more readily than pages that
        build to a point over eight paragraphs.
      </P>
      <Ul>
        <Li>
          <strong>Answer in the first sentence under the heading.</strong> The
          rest of the section can elaborate. The extractable claim should come
          first.
        </Li>
        <Li>
          <strong>Use headings shaped like questions.</strong> They match the
          query directly and mark where the answer starts.
        </Li>
        <Li>
          <strong>Keep facts near their qualifiers.</strong> A number three
          paragraphs from the condition it depends on gets quoted without the
          condition.
        </Li>
        <Li>
          <strong>Date things.</strong> Models weight recency, and an undated
          page about a subject that changes yearly reads as unreliable.
        </Li>
      </Ul>
      <P>
        None of this conflicts with writing well for people. It mostly rewards
        being direct, which was already good advice.
      </P>

      <H2 id="worth-it">How much should you care</H2>
      <P>
        For most sites today: enough to measure, not enough to restructure
        around. The channel is small, growing, and converts well relative to its
        size. That combination argues for a chart you glance at monthly rather
        than a strategy.
      </P>
      <P>
        The reason to start now is that the baseline is only measurable going
        forward. If this becomes a meaningful share of acquisition in eighteen
        months, the useful thing to have is eighteen months of data showing when
        it started.
      </P>

      <Callout>
        <A href="/analytics">Quantalog</A> groups assistant referrers as their
        own channel rather than scattering them through the referrer list, so
        the number is visible without maintaining a hostname list by hand — and{" "}
        <A href="/seo-audits">SEO audits</A> check whether your pages are
        structured to be extractable in the first place.
      </Callout>
    </>
  );
}

export const measuringAiSearchTraffic: Post = {
  slug: "measuring-ai-search-traffic",
  title: "Does AI search send traffic? How to measure it",
  description:
    "ChatGPT, Perplexity and Gemini referrals hide inside Direct and unclassified referrers. How to isolate the channel, why it undercounts, and what makes a page quotable.",
  date: "2026-09-04",
  tags: ["SEO", "Analytics", "AI search"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 9,
  Body,
};
