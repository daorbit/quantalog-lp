import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Retention shows whether people come <b>back</b>. Visitors are grouped into
        weekly cohorts by when they were first seen, and each cohort&apos;s return
        rate is tracked across the following weeks â€” a quick read on stickiness.
      </P>

      <H2 id="reading">Reading the grid</H2>
      <Ul>
        <Li>Each row is one weekly cohort â€” the visitors first seen that week.</Li>
        <Li>
          Each cell is the share of that cohort active again N weeks later. Week 0
          is always 100% (the cohort itself).
        </Li>
        <Li>Warmer, denser cells mean a stickier cohort.</Li>
      </Ul>

      <H2 id="caveat">A privacy caveat</H2>
      <P>
        Quantalog identifies visitors with a hash that rotates daily for privacy,
        so retention measures returns within the hash&apos;s lifetime â€” not lifetime
        loyalty. Read the near-term weeks as directional signal rather than exact
        long-run numbers.
      </P>

      <Callout>
        Retention needs several weeks of history to be meaningful. A brand-new site
        will show an empty grid until cohorts have had time to return.
      </Callout>
    </>
  );
}

export const retention: Doc = {
  slug: "retention",
  title: "Retention",
  description:
    "Weekly cohort retention â€” whether visitors come back, and how sticky each cohort is.",
  category: "Tracking",
  order: 6,
  Body,
};
