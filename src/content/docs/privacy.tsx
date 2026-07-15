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
        A visitor is a one-way hash of IP address, user agent, and{" "}
        <Code>siteId</Code>, salted with the current day. The salt rotates every 24
        hours, so the same person is uncountable across days and unlinkable across
        sites. Nothing is stored in the browser.
      </P>
      <Ul>
        <Li>No cookies, no localStorage identifiers.</Li>
        <Li>No cross-site or cross-device tracking.</Li>
        <Li>IP addresses are never stored — only the derived daily hash.</Li>
      </Ul>

      <Callout>
        Because no personal data persists, most deployments do not require a cookie
        consent banner. Confirm your obligations for your jurisdiction.
      </Callout>

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
