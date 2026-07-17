import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Channels group every visit by <b>how it arrived</b>, so you read traffic
        the way you plan marketing — not as a wall of raw referrer URLs. Each
        session is placed in exactly one channel based on its referrer and UTM
        tags.
      </P>

      <H2 id="groups">The channels</H2>
      <Ul>
        <Li><b>Direct</b> — no referrer and no campaign (typed the URL, a bookmark, an app).</Li>
        <Li><b>Organic Search</b> — came from a search engine (Google, Bing, DuckDuckGo…).</Li>
        <Li><b>Paid</b> — a paid <code>utm_medium</code> (cpc, ppc, paid, display) or an ad click id.</Li>
        <Li><b>Social</b> — referred by a social network (Facebook, X, LinkedIn, Reddit…).</Li>
        <Li><b>Email</b> — a <code>utm_medium</code> of email or newsletter.</Li>
        <Li><b>Referral</b> — any other site that linked to you.</Li>
      </Ul>

      <H2 id="where">Where to find it</H2>
      <P>
        Open <b>Analytics → Sources</b> for the full channel breakdown, or add the{" "}
        <b>Channels</b> widget to your Home dashboard. Channels are counted per
        session (by the page a visit started on), so the numbers line up with how
        many visits each channel brought.
      </P>

      <Callout>
        Tag your campaigns with <code>utm_source</code>, <code>utm_medium</code> and{" "}
        <code>utm_campaign</code> and they&apos;ll classify into Paid, Email, or
        Social automatically — no configuration needed.
      </Callout>
    </>
  );
}

export const channels: Doc = {
  slug: "channels",
  title: "Channels",
  description:
    "Group traffic by how it arrived — Direct, Organic Search, Paid, Social, Email, and Referral.",
  category: "Tracking",
  order: 6,
  Body,
};
