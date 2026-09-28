import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Reviews syncs your Google Business Profile reviews into Quantalog, so
        you can see your rating and latest reviews alongside your analytics
        instead of switching to a separate Google dashboard.
      </P>

      <H2 id="connecting">Connecting Google</H2>
      <P>
        Open <b>Reviews</b> in the sidebar and connect your Google account.
        After connecting, pick the business location whose reviews you want
        to sync — Quantalog lists every location the connected account has
        access to.
      </P>

      <H2 id="syncing">Syncing and staying up to date</H2>
      <Ul>
        <Li>Use <b>Sync reviews</b> on a location to pull its latest reviews on demand.</Li>
        <Li>The rating summary and review list shown in Quantalog reflect the last successful sync, not a live call to Google.</Li>
        <Li>If Google access expires or is revoked, the connection shows a reconnect prompt.</Li>
      </Ul>

      <Callout>
        Disconnecting removes the cached reviews from Quantalog only — it does
        not delete or change anything on your Google Business Profile.
      </Callout>
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
