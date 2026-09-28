import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout, A } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Reviews syncs your Google Business Profile reviews into Quantalog, so
        you can see your rating and latest reviews alongside your analytics
        instead of switching to a separate Google dashboard.
      </P>

      <P>
        Connecting and managing Reviews is limited to workspace admins.
        Other members can view the connected location&apos;s reviews once
        one is set up, but cannot connect, switch locations, or sync.
      </P>

      <H2 id="connecting">Connecting Google</H2>
      <P>
        Open <b>Reviews</b> in the sidebar and press <b>Connect Google</b>.
        After connecting, pick the business location whose reviews you want
        to sync — Quantalog lists every Business Profile location the
        connected Google account can see at that moment. If the account has
        none, it points you to <A href="https://business.google.com">business.google.com</A> to add one first.
      </P>

      <H2 id="syncing">Syncing and staying up to date</H2>
      <Ul>
        <Li>Use <b>Sync reviews</b> on a location to pull its latest reviews on demand.</Li>
        <Li>The rating summary — including the star-by-star breakdown — and the review list reflect the last successful sync, not a live call to Google.</Li>
        <Li>Review replies you&apos;ve posted from your Business Profile appear alongside each review, credited as a response from the owner.</Li>
        <Li>If Google access expires or is revoked, the connection shows a reconnect prompt.</Li>
      </Ul>

      <H2 id="disconnecting">Switching or disconnecting</H2>
      <P>
        Open the <b>Manage</b> menu and choose <b>Disconnect Google</b> to
        remove the connection.
      </P>
      <Callout>
        Disconnecting removes the cached reviews from Quantalog only — it does
        not delete or change anything on your Google Business Profile.
      </Callout>

      <P>
        If Reviews shows that Google is not set up on this deployment, the
        integration hasn&apos;t been enabled yet — check with your Quantalog
        administrator.
      </P>
    </>
  );
}

export const reviews: Doc = {
  slug: "reviews",
  title: "Reviews",
  description:
    "Connect Google Business Profile to see your rating and latest reviews inside Quantalog.",
  category: "Workspace",
  order: 4,
  Body,
};
