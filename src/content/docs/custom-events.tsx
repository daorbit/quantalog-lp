import type { Doc } from "@/lib/docs";
import { H2, P, Code, Callout, Pre } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Custom events turn any action into a tracked metric — a signup, a
        purchase, a plan upgrade. Once the tracker script has loaded, call{" "}
        <Code>rta.track()</Code> from anywhere in your app.
      </P>

      <H2 id="fire">Firing an event</H2>
      <Pre label="anywhere in your app">{`// available on window once tracker.js has loaded
window.rta.track("signup_completed");
window.rta.track("checkout_started", { plan: "pro", value: 49 });`}</Pre>

      <P>
        The first argument is the event name. The optional second argument is a
        properties object of extra context — a plan tier, an order value, anything
        you want to keep with the event.
      </P>

      <H2 id="dashboard">Where it shows up</H2>
      <P>
        Every event appears under the <b>Events</b> tab in Analytics, with its fire
        count, distinct visitors, and conversion rate — the share of visitors in
        the period who fired it at least once.
      </P>

      <H2 id="revenue">Revenue &amp; goals</H2>
      <P>
        Pass a numeric <Code>value</Code> in the properties and Quantalog sums it
        into revenue — per event and across all events for the period. This turns
        any event into a goal with a dollar figure attached.
      </P>
      <Pre label="revenue event">{`window.rta.track("purchase", { value: 49.0, plan: "pro" });`}</Pre>

      <Callout>
        Keep event names stable and lowercase (e.g. <Code>signup_completed</Code>).
        A renamed event starts a fresh row rather than continuing the old one.
      </Callout>
    </>
  );
}

export const customEvents: Doc = {
  slug: "custom-events",
  title: "Custom events",
  description:
    "Track signups, purchases, and conversions with one line of code via rta.track().",
  category: "Tracking",
  order: 2,
  Body,
};
