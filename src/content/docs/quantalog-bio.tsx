import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Link-in-bio</b> gives you one short page of your most
        important links, made for the bio of your Instagram, LinkedIn, TikTok
        or X profile. Visitors see your photo, a short bio, your social icons
        and a button for each link, and you see which links they tap. It is an
        official Quantalog app that a workspace admin turns on in <b>Apps</b>.
      </P>

      <H2 id="create">Creating a page</H2>
      <Ul>
        <Li>Open <b>Link in bio</b> in the sidebar and press <b>New page</b>.</Li>
        <Li>Add a photo from your media library, a title and a short bio.</Li>
        <Li>Add your links. Use the arrows to reorder them and the switch to hide one without deleting it.</Li>
        <Li>Add social icons, then pick light or dark, a button colour and a button shape.</Li>
        <Li>Press <b>Publish page</b>. The phone preview shows exactly what visitors see.</Li>
      </Ul>

      <H2 id="address">Your page address</H2>
      <P>
        Every page has its own address, such as <Code>/bio/your-name</Code>.
        It uses lowercase letters, numbers and dashes, and each address can
        only be used once across Quantalog. Copy it from the page card and
        paste it into your social profile.
      </P>

      <H2 id="stats">Views and clicks</H2>
      <P>
        Each page card shows its views, clicks and click rate for the last 30
        days, and the editor shows the clicks on every link. Bots and link
        previews are not counted, and none of this counts towards your monthly
        event allowance.
      </P>

      <H2 id="limits">Plans</H2>
      <Ul>
        <Li>Free: 1 page.</Li>
        <Li>Starter: 3 pages.</Li>
        <Li>Pro: 20 pages.</Li>
      </Ul>

      <Callout>
        Changes reach your public page within a minute. Turning a page to
        <b> Draft</b>, or turning the app off, takes its address offline but
        keeps the page and its stats.
      </Callout>
    </>
  );
}

export const quantalogBio: Doc = {
  slug: "quantalog-bio",
  title: "Quantalog Link-in-bio",
  description: "One page of your most important links for your social bios, with views and clicks for every link.",
  category: "Tracking",
  order: 13.7,
  Body,
};
