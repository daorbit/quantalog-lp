import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A goal is an outcome you care about — a signup, a purchase, reaching a{" "}
        <Code>/thank-you</Code> page. Quantalog scores every goal over the window
        you&apos;re viewing and shows its conversion rate, so you can watch the
        numbers that actually matter to the business.
      </P>

      <H2 id="creating">Creating a goal</H2>
      <Ul>
        <Li>Open <b>Analytics → Goals</b> and give the goal a name.</Li>
        <Li>
          Pick <b>Page</b> and enter a path (e.g. <Code>/thank-you</Code>), or{" "}
          <b>Event</b> and enter a custom event name (e.g. <Code>purchase</Code>).
        </Li>
        <Li>Hit <b>Add</b> — it starts scoring immediately.</Li>
      </Ul>

      <H2 id="counting">How conversions are counted</H2>
      <P>
        A goal converts <b>once per visitor</b>: the count is the number of
        distinct visitors who matched it in the window, and the rate is that over
        all visitors in the same window. Someone who reloads the thank-you page
        ten times still counts once.
      </P>

      <Callout>
        Goals re-score past traffic from your existing events, so adding a goal
        doesn&apos;t lose history and removing one never deletes any data. Scope
        goals to specific sites with the site filter, just like every other
        metric.
      </Callout>
    </>
  );
}

export const conversions: Doc = {
  slug: "conversions",
  title: "Conversions & goals",
  description:
    "Define goals from pages or events and track their conversion rate over any window.",
  category: "Tracking",
  order: 7,
  Body,
};
