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

      <H2 id="building">Creating a funnel</H2>
      <Ul>
        <Li>
          Open <b>Funnels</b> in the sidebar and press <b>New funnel</b>, or pick one
          of the suggestions built from your own traffic.
        </Li>
        <Li>
          Add the steps in the order visitors take them. Each step is a <b>page</b>{" "}
          someone visited or an <b>event</b> they fired, and the picker lists the ones
          with traffic in the chosen range. Use the arrows to reorder steps, up to eight.
        </Li>
        <Li>The preview beside the steps shows the result as you go. Give it a name and press <b>Create funnel</b>.</Li>
      </Ul>

      <H2 id="list">Your funnels</H2>
      <P>
        The Funnels page lists every saved funnel with its conversion and how many
        sessions entered, for the range you pick at the top. Click a funnel to see
        its full results. Use <b>Edit</b> to change its steps or name, and the{" "}
        <b>⋯</b> menu to duplicate or delete it.
      </P>

      <H2 id="reading">Reading the results</H2>
      <Ul>
        <Li>
          The strip at the top sums it up: conversion from the first step to the last, sessions that entered, sessions
          that completed, and the <b>Biggest leak</b>.
        </Li>
        <Li>
          The chart has a bar per step. The solid part is the sessions that continued; the lighter part above it is the
          sessions lost since the previous step. Switch between <b>From first step</b> and <b>From previous step</b> to
          read each step either way.
        </Li>
        <Li>
          The table lists every step with its sessions, its share of the first and of the previous step, how many dropped,
          and the average time people took to get there from the previous step.
        </Li>
        <Li>
          The biggest leak is the step that lost the most sessions, not the highest percentage, so a busy step losing 30%
          ranks above a quiet one losing 60%.
        </Li>
      </Ul>

      <H2 id="tracking">Tracking a funnel over time</H2>
      <Ul>
        <Li>
          Turn on <b>vs previous period</b> to compare every number with the period just before, with green and red
          arrows for what improved and what slipped.
        </Li>
        <Li>
          <b>Conversion over time</b> shows conversion by when visitors entered: every 5 minutes, by hour, by day or by
          week depending on the range. A bar well below the usual level is shown in red; sudden dips usually mean a
          release or an outage, while a steady low rate points to a step that needs work.
        </Li>
      </Ul>

      <H2 id="sharing">Who can change funnels</H2>
      <P>
        Saved funnels are shared with everyone in the workspace. Editors and admins
        can create, change and delete them; viewers can open and read them.
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
