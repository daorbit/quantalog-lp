import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, Code, A } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Every Quantalog account has a personal invite link. When someone creates an account through
        it, you earn a single-use discount coupon for your next plan or add-on purchase. There is
        nothing to sign up for and it works on every plan, Free included.
      </P>

      <H2 id="find">Finding your link</H2>
      <P>
        Open <b>Billing</b> in the dashboard and choose the <b>Refer &amp; earn</b> tab. The first
        time you open it, a code is created for you from the letters of your name and a short random
        suffix, such as <Code>MAYA7Q4K</Code>. It never changes after that.
      </P>
      <Ul>
        <Li>
          <b>Copy link</b> copies the full invite link, which looks like{" "}
          <Code>/signup?ref=MAYA7Q4K</Code>.
        </Li>
        <Li>
          The <b>WhatsApp</b>, <b>Email</b> and <b>LinkedIn</b> buttons open a ready-written message
          with the link already in it.
        </Li>
        <Li>The code on its own can be copied too, for places where a link does not fit.</Li>
      </Ul>

      <H2 id="how">How a referral counts</H2>
      <P>
        A friend opens your link and signs up. The link is remembered in their browser for 30 days,
        so it still counts if they come back later to finish, or sign in with Google instead of a
        password. The referral is attached to their account during onboarding.
      </P>
      <P>Depending on how the program is set up, the reward is given at one of two moments:</P>
      <Ul>
        <Li>
          <b>On signup</b>, the default. The coupon is issued as soon as their account is created.
        </Li>
        <Li>
          <b>On first purchase</b>. The referral shows as <i>Pending</i> until they buy their first
          plan or add-on, then the coupon is issued.
        </Li>
      </Ul>
      <P>
        The current reward, the discount and how many days the coupon stays valid, is always shown
        at the top of the Refer &amp; earn tab. By default it is 20% off, valid for 90 days.
      </P>

      <H2 id="coupons">Using your coupons</H2>
      <P>
        When a coupon is issued you get a notification in the dashboard and an email with the code,
        which starts with <Code>REF-</Code>. Every coupon you earn also appears in the{" "}
        <b>Reward wallet</b> on the same tab, sorted so the one closest to expiring comes first.
      </P>
      <Ul>
        <Li>
          Enter the code at checkout on the Billing page. It works on any plan or add-on pack. See{" "}
          <A href="/docs/billing">Billing &amp; receipts</A>.
        </Li>
        <Li>Each coupon works once, and only on the account that earned it.</Li>
        <Li>Coupons do not stack. Use one per purchase.</Li>
        <Li>
          The wallet labels each coupon as <i>Ready</i>, <i>Used</i> or <i>Expired</i>, and shows
          what a used coupon was spent on.
        </Li>
      </Ul>

      <H2 id="tracking">Tracking your invites</H2>
      <P>
        The <b>People you invited</b> list shows everyone who joined with your link, the date they
        joined, and where their referral stands:
      </P>
      <Ul>
        <Li>
          <b>Rewarded</b>: you have a coupon for this one.
        </Li>
        <Li>
          <b>Pending</b> or <b>In review</b>: waiting on their first purchase, or being checked.
        </Li>
        <Li>
          <b>Not eligible</b>: this signup did not qualify.
        </Li>
      </Ul>

      <H2 id="rules">The rules</H2>
      <P>A few checks keep the program fair for everyone:</P>
      <Ul>
        <Li>Referring yourself does not count.</Li>
        <Li>
          A referral only applies to a new account, within 7 days of it being created. An existing
          account cannot be referred after the fact.
        </Li>
        <Li>Each account can be referred once.</Li>
        <Li>
          Signups that look like duplicates of an earlier referral are held for a manual review
          before any reward is given.
        </Li>
      </Ul>
      <Callout>
        The program can be paused, and its reward changed, at any time. Coupons you have already
        earned keep the discount and expiry date they were issued with.
      </Callout>
    </>
  );
}

export const referrals: Doc = {
  slug: "referrals",
  title: "Refer & earn",
  description:
    "Share your invite link and earn a discount coupon for every friend who joins Quantalog.",
  category: "Getting started",
  order: 5,
  Body,
};
