import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A funnel measures how many people make it through an ordered sequence of
        steps — say <b>landing → pricing → signup</b> — and where they drop off
        between each one. It answers &quot;where am I losing people?&quot;.
      </P>

      <H2 id="building">Building a funnel</H2>
      <Ul>
        <Li>
          Open <b>Analytics → Funnel</b> and add two or more steps (up to eight).
        </Li>
        <Li>
          Each step is either a <b>Page</b> (a path someone visited) or an{" "}
          <b>Event</b> (a custom event they fired).
        </Li>
        <Li>
          Steps are picked from dimensions your site already has data for, so the
          builder only offers real pages and events.
        </Li>
        <Li>
          Hit <b>Compute funnel</b> to see per-step counts, conversion from the top,
          and drop-off from the previous step.
        </Li>
      </Ul>

      <H2 id="how">How it&apos;s counted</H2>
      <P>
        Funnels are session-based. A session counts toward step N only if it
        completed every earlier step first, in order. The range selector at the top
        of Analytics controls the window the funnel is measured over.
      </P>

      <Callout>
        Mixing pages and events works well: e.g. page <b>/pricing</b> → event{" "}
        <b>checkout_started</b> → event <b>purchase</b>.
      </Callout>
    </>
  );
}

export const funnels: Doc = {
  slug: "funnels",
  title: "Funnels",
  description:
    "Measure conversion through an ordered sequence of pages and events, and see where people drop off.",
  category: "Tracking",
  order: 4,
  Body,
};
