import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, A, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Quantalog is designed to measure traffic without following people around
        the internet. There are no cookies, no cross-site identifiers, and no
        personal profiles.
      </P>

      <H2 id="visitors">How visitors are counted</H2>
      <P>
        A web visitor is a one-way hash of IP address, user agent,{" "}
        <Code>siteId</Code> and the current calendar week. The hash changes every
        week, so the same person is not linked from one week to the next, and it
        differs on every site. Only a session id, cleared when the tab closes, is
        kept in the browser.
      </P>
      <Ul>
        <Li>No cookies, no localStorage identifiers.</Li>
        <Li>No cross-site or cross-device tracking.</Li>
        <Li>IP addresses are never stored — only the derived weekly hash.</Li>
      </Ul>

      <Callout>
        Because nothing persistent is stored on the device and no IP address is
        kept, most deployments do not require a cookie consent banner. Confirm your
        obligations for your jurisdiction.
      </Callout>

      <P>
        This covers analytics. Account details, form responses, bookings and
        connected accounts such as Google Calendar are personal data and are
        handled as described in the <A href="/privacy">privacy policy</A>.
      </P>

      <H2 id="more">More</H2>
      <P>
        See our full <A href="/privacy">privacy policy</A> and{" "}
        <A href="/terms">terms of service</A>.
      </P>
    </>
  );
}

export const privacy: Doc = {
  slug: "privacy",
  title: "Privacy & data",
  description:
    "How Quantalog counts visitors without cookies, and what data is and isn't stored.",
  category: "Getting started",
  order: 2,
  Body,
};
