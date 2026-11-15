import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Link-in-bio &amp; Smart Links</b> makes two kinds of page.
        A <b>bio page</b> holds your most important links for the bio of your
        Instagram, TikTok, YouTube or LinkedIn profile. A <b>smart link</b> is
        a page for one song, video, podcast or product, with a button for every
        service it is on. Each gets a short link, a QR code and stats on where
        visitors came from. It is an official Quantalog app that a workspace
        admin unlocks once in <b>Apps</b>.
      </P>

      <H2 id="create">Making a bio page</H2>
      <Ul>
        <Li>Open <b>Link-in-bio</b> in the sidebar and create a bio page.</Li>
        <Li>Add a photo from your media library, a title and a short bio.</Li>
        <Li>Add up to 30 links. Use the arrows to reorder them and the switch to hide one without deleting it.</Li>
        <Li>Add icons for any of 12 social networks, including Instagram, YouTube, WhatsApp and Telegram.</Li>
        <Li>Publish the page. The phone preview shows exactly what visitors see.</Li>
      </Ul>

      <H2 id="smart-links">Making a smart link</H2>
      <Ul>
        <Li>Create a smart link and paste a link to the release.</Li>
        <Li>
          Spotify, Apple Music, YouTube, YouTube Music, SoundCloud and Deezer
          links fill in the title, artist and artwork for you.
        </Li>
        <Li>
          Add a row for every other service it is on. Links from more than 40
          services, such as JioSaavn, Gaana, Amazon Music, Flipkart and
          BookMyShow, get the right name and icon on their own.
        </Li>
        <Li>Pick a layout: List, Poster, Tiles, Vinyl, Spotlight or Minimal.</Li>
      </Ul>

      <H2 id="templates">Design</H2>
      <P>
        Bio pages come in five layouts: Classic, Cover, Tiles, Editorial and
        Cards. Every page can be light or dark, with one of eight accent
        colours, four fonts and three button shapes. Under <b>Design</b> you
        can also pick the <b>Deep</b> background, a rich dark shade of your
        page colour.
      </P>

      <H2 id="address">Short link and QR code</H2>
      <P>
        Every page has its own short address, such as <Code>/l/your-name</Code>.
        You can rename it using lowercase letters, numbers and dashes, and each
        address can only be used once across Quantalog. Every page also has a
        QR code for posters, packaging or a stage screen, and scans are counted
        as their own source.
      </P>

      <H2 id="stats">Stats</H2>
      <P>
        Each page shows views, visitors and taps per button by day, with where
        visitors came from, their campaign, country, city, device and browser.
        Bots and link previews are not counted, and none of this counts towards
        your monthly event allowance.
      </P>

      <H2 id="limits">Plans</H2>
      <Ul>
        <Li>Free: 1 bio page, 3 smart links and 30 days of stats.</Li>
        <Li>Starter: 3 bio pages, 25 smart links and 90 days of stats.</Li>
        <Li>Pro: 20 bio pages, 200 smart links and 365 days of stats.</Li>
      </Ul>

      <Callout>
        Changes reach your public page within a minute. Setting a page to
        <b> Draft</b>, or turning the app off, takes its short link offline but
        keeps the page and its stats.
      </Callout>
    </>
  );
}

export const quantalogBio: Doc = {
  slug: "quantalog-bio",
  title: "Quantalog Link-in-bio & Smart Links",
  description: "Bio pages for your social profiles and smart links for every release, with short links, QR codes and stats.",
  category: "Tracking",
  order: 13.7,
  Body,
};
