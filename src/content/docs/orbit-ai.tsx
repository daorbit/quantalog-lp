import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Orbit</b> is the support assistant built into the dashboard. It sits
        behind the mark in the bottom-right corner of every page, and answers
        questions about how Quantalog works — installing the tracker, what a
        metric means, which role can do what, how to fix something an SEO audit
        flagged.
      </P>

      <H2 id="what-it-knows">What it knows</H2>
      <P>
        Orbit answers from a reference written for it: the same facts these docs
        describe, kept server-side and updated with the product. That is a
        deliberate limit rather than a shortcut. A general model asked about a
        feature it has never seen will describe a plausible one, and you would
        then go looking for a button that does not exist.
      </P>
      <P>
        So when a question falls outside that reference, Orbit says so and points
        you at <b>Help &amp; support</b> instead of guessing.
      </P>

      <H2 id="what-it-cannot-see">What it can and cannot see</H2>
      <P>
        On <b>Orbit Free</b> and <b>Orbit Starter</b>, Orbit has no access to
        your account, your workspaces, or your analytics. Ask it what your
        traffic was yesterday and it will tell you it cannot read your data and
        send you to the Analytics page.
      </P>
      <P>
        On <b>Orbit Pro</b>, it can. A short summary of the workspace you are in
        — the last seven days of visitors, pageviews, sessions and bounce rate,
        each against the previous week, plus your top pages, referrers,
        countries and devices — is sent with the question, so &quot;why is
        traffic down?&quot; gets an answer rather than a link.
      </P>
      <Ul>
        <Li>
          Only that summary. Individual visitors, sessions and raw events are
          never sent to a model, on any plan.
        </Li>
        <Li>Conversations are not stored. They live in the browser tab and end with it.</Li>
        <Li>Nothing you type there is used for training.</Li>
      </Ul>
      <P>
        The practical consequence: refreshing the page starts a new conversation.
        If an answer is worth keeping, copy it before you navigate away.
      </P>

      <H2 id="fixing-seo-issues">Fixing SEO issues</H2>
      <P>
        The place Orbit earns its keep is an audit result you do not recognise.
        Paste the issue — <Code>missing canonical</Code>,{" "}
        <Code>duplicate title</Code>, <Code>CLS over 0.1</Code> — and it gives
        the steps to resolve it, including the tag to add and where it goes.
      </P>
      <P>
        Re-run the audit afterwards. The history keeps both runs with the score
        change between them, which is how you confirm a fix worked rather than
        assuming it did.
      </P>

      <H2 id="plans">Questions and models</H2>
      <P>
        Orbit is bought per workspace, on its own ladder — separate from the
        analytics plan. A workspace on analytics Free can run Orbit Pro, and the
        other way round, because a small site can still be a heavy Orbit user.
      </P>
      <Ul>
        <Li>
          <b>Orbit Free</b> — 20 questions a month, open-weight models.
        </Li>
        <Li>
          <b>Orbit Starter</b> — 300 questions a month, and the reasoning models
          on top of those.
        </Li>
        <Li>
          <b>Orbit Pro</b> — 2,000 questions a month, every model including
          Gemini Flash, the longest conversation memory, and answers that read
          your own analytics.
        </Li>
      </Ul>
      <P>
        A question only counts once Orbit has actually answered it. A timeout, a
        model that refused, or an error costs you nothing.
      </P>
      <P>
        The model picker shows every model, including the ones your plan does not
        reach — those are greyed out with the tier that unlocks them, so you can
        see what an upgrade buys before you buy it. If you run out mid-month,
        question packs are sold separately and never expire; they are used only
        after the plan&apos;s own allowance is gone.
      </P>

      <H2 id="follow-ups">Follow-up questions</H2>
      <P>
        Each answer comes with up to three suggested follow-ups — the next thing
        someone usually needs, not a rephrasing of what was just asked. They are
        one tap, and every one is answerable, so they never lead to a dead end.
      </P>

      <Callout>
        Orbit can be wrong. It is a fast first answer, not a replacement for
        support — every plan keeps a human behind{" "}
        <b>Help &amp; support</b> in the sidebar, and a person reads every
        message that arrives there.
      </Callout>
    </>
  );
}

export const orbitAi: Doc = {
  slug: "orbit-ai",
  title: "Orbit AI",
  description:
    "The support assistant built into the dashboard: what it knows, what it cannot see, and how it helps you fix SEO issues.",
  category: "Getting started",
  order: 5,
  Body,
};
