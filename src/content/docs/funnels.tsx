import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Funnels</b> measures how many visitors make it through an
        ordered set of steps, say <b>landing → pricing → signup</b>, and where
        the rest leave. It answers &quot;where am I losing people?&quot;. It is
        an official Quantalog app that a workspace admin unlocks once in{" "}
        <b>Apps</b>, with no subscription.
      </P>

      <H2 id="building">Building a funnel</H2>
      <Ul>
        <Li>
          Open <b>Funnels</b> in the sidebar. With an empty funnel you can start
          from a suggestion built from your own traffic, or pick each step yourself.
        </Li>
        <Li>
          Each step is a <b>page</b> someone visited or an <b>event</b> they fired.
          The picker lists pages and events that have traffic in the chosen range.
        </Li>
        <Li>Add up to eight steps. Results update on their own a moment after you change a step.</Li>
        <Li>Use the range picker at the top to measure any window your plan allows.</Li>
      </Ul>

      <H2 id="reading">Reading the results</H2>
      <Ul>
        <Li>Every step shows how many sessions reached it and what share of the first step that is.</Li>
        <Li>Between steps you see the percentage that dropped and how many sessions did not continue.</Li>
        <Li>The largest drop is labelled <b>Biggest drop</b>, so the leak worth fixing first stands out.</Li>
        <Li>The strip above the steps sums it up: conversion, sessions entered, sessions completed and the biggest drop.</Li>
      </Ul>

      <H2 id="saving">Saving and sharing</H2>
      <P>
        Name a funnel and press <b>Save</b>. Saved funnels are shared with everyone
        in the workspace and open from the <b>Open</b> menu for any date range.
        Editors and admins can save, change and delete them; viewers can open and
        read them.
      </P>

      <H2 id="how">How it&apos;s counted</H2>
      <P>
        Funnels are session based. A session counts toward a step only if it
        reached every earlier step first, in order.
      </P>

      <Callout>
        Mixing pages and events works well: page <b>/pricing</b> → event{" "}
        <b>checkout_started</b> → event <b>purchase</b>. Turning the app off hides
        Funnels but keeps every saved funnel.
      </Callout>
    </>
  );
}

export const funnels: Doc = {
  slug: "funnels",
  title: "Quantalog Funnels",
  description:
    "See how many visitors make it through the pages and events that lead to a sale, and where the rest drop off.",
  category: "Tracking",
  order: 5,
  Body,
};
