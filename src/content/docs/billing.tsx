import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Plans and add-on credit packs are bought through Razorpay as one-time
        payments. Nothing auto-renews and no card is stored: a plan period simply
        ends on its date, and renewing means buying the same plan again.
      </P>

      <H2 id="paying">Paying for a plan</H2>
      <P>
        Pick a plan under <b>Billing</b> in the dashboard, choose monthly or
        yearly, and pay in the Razorpay window. Your new quota is live the moment
        the payment clears — there is no waiting period and no approval step.
      </P>
      <Ul>
        <Li>Prices can be shown and charged in INR or USD.</Li>
        <Li>Yearly billing is twelve months at the price of ten.</Li>
        <Li>A coupon code, if you have one, is applied before payment.</Li>
        <Li>The Free plan needs no payment at all and is assigned instantly.</Li>
      </Ul>

      <H2 id="events">Event quota</H2>
      <P>
        Every plan includes a monthly allowance of tracked events — a pageview, a
        custom event, a click, or any other beacon the tracker sends. This is the
        allowance that reflects what a workspace actually costs to run, so it is
        the one to watch.
      </P>
      <Ul>
        <Li>
          <b>Free</b> includes 10,000 events a month, <b>Starter</b> 250,000, and{" "}
          <b>Pro</b> 2 million.
        </Li>
        <Li>
          Current usage is shown on the Billing page, and resets when a new plan
          period starts. Unused events do not roll over.
        </Li>
        <Li>
          Events are not sold as add-on packs — the way past the line is a plan
          change.
        </Li>
      </Ul>
      <Callout>
        Going over quota stops <i>new</i> events being recorded until the next
        period. Your dashboard, your history, and everything already collected
        stay exactly as they are — nothing you have already gathered is lost or
        hidden.
      </Callout>

      <H2 id="addons">Add-on credit packs</H2>
      <P>
        Used up your monthly SEO audits or crawls before the period ends? Add-on
        packs top them up as a one-time purchase. Credits are added as soon as
        the payment is confirmed, and unlike plan quota they never expire — they
        carry across plan periods and survive a plan change.
      </P>

      <H2 id="receipts">Receipts</H2>
      <P>
        Every completed payment produces a receipt, numbered{" "}
        <Code>QTL-YYYYMM-NNNN</Code>. It is emailed to you as a PDF attachment
        the moment the payment is credited, so it is in your inbox before you
        leave the page.
      </P>
      <P>
        Every receipt also stays available under <b>Billing history</b> at the
        bottom of the Billing page, with a download button on each row. That copy
        is the one to reach for months later, when the original email is buried —
        it is the same document, regenerated on demand.
      </P>
      <P>Each receipt shows:</P>
      <Ul>
        <Li>The receipt number and the date of payment.</Li>
        <Li>What was bought — the plan and period, or the pack and its credits.</Li>
        <Li>The amount paid in the currency it was charged in, and any coupon applied.</Li>
        <Li>The Razorpay payment reference, which is what support needs if a charge is ever queried.</Li>
      </Ul>

      <Callout>
        These are payment receipts, not tax invoices — no GST is charged or
        collected on them, and no GST number appears. If your accountant needs a
        tax invoice specifically, get in touch before purchasing rather than
        after.
      </Callout>

      <H2 id="expiry">When a period ends</H2>
      <P>
        Audits, crawls, and event tracking all pause when a plan period expires.
        Your data, sites, and dashboards are untouched, and any unused add-on
        credits stay exactly where they are. Buying the plan again — or a
        different one — starts a new period immediately, and tracking resumes as
        soon as the payment clears.
      </P>
      <Callout>
        Events that arrive while a plan is expired are not recorded and cannot be
        backfilled — the tracker is turned away rather than queued. If you are
        letting a plan lapse deliberately, expect a gap in the data for that
        stretch.
      </Callout>
    </>
  );
}

export const billing: Doc = {
  slug: "billing",
  title: "Billing & receipts",
  description:
    "How plans and add-on packs are paid for, and where to find the receipt for every payment.",
  category: "Getting started",
  order: 4,
  Body,
};
