import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Every form has an AI assistant built in — Orbit — for drafting a form
        from a description and for revising one already on the canvas, plus a
        full theme editor for making it look like your site rather than a
        generic form.
      </P>

      <H2 id="building-with-orbit">Building a form with Orbit</H2>
      <P>
        From the forms list, choose <b>Build with Orbit</b> instead of
        starting blank or from a template. Describe the form in a sentence —
        &quot;A job application form for a restaurant, with CV upload&quot;
        or &quot;Wedding RSVP with meal choice and dietary needs&quot; — and
        Orbit drafts the fields, wording, and a starting theme, shown live in
        a device preview as it writes.
      </P>
      <P>
        Nothing is created yet at this point. You can keep talking — ask for
        a change and Orbit revises the same draft — and only clicking{" "}
        <b>Create form</b> turns it into a real form in your workspace.
        Closing the dialog or starting over drops the draft.
      </P>

      <H3 id="editing-with-orbit">Editing an existing form with Orbit</H3>
      <P>
        Inside the builder, <b>Edit with Orbit</b> on the icon rail opens a
        panel beside the canvas rather than a separate dialog — the form
        stays visible and clickable while you type. Ask for a change —
        &quot;Make the email field optional&quot;, &quot;Add a phone number
        field&quot;, &quot;Rewrite the description to be friendlier&quot; —
        and it applies straight to the canvas.
      </P>
      <Callout>
        There is no preview or confirm step here: a request changes the live
        form immediately. <b>Ctrl+Z undoes it</b>, the same as any other edit
        in the builder, which is the safety net rather than a diff to
        approve first.
      </Callout>
      <P>
        Orbit acts on whatever is actually on the canvas at the moment you
        ask, including changes you made by hand — it is not working from the
        original AI draft once you have edited fields yourself.
      </P>
      <P>
        Orbit is unavailable on the demo workspace, and, like the rest of
        the AI features, is subject to your plan&apos;s quota — hitting it
        opens your billing page rather than failing silently.
      </P>

      <H2 id="theme">Theming a form</H2>
      <P>
        A form&apos;s theme is its own — there is no shared theme library
        across forms, so restyling one never touches another. Open{" "}
        <b>Theme</b> on the icon rail to set it.
      </P>

      <H3 id="theme-scope">Standalone link vs. embedded</H3>
      <P>
        The first choice is where the form actually lives, because it
        changes what &quot;background&quot; means:
      </P>
      <Ul>
        <Li>
          <b>Standalone link</b> — the page background you set fills the
          whole share-link page behind the form card.
        </Li>
        <Li>
          <b>Embedded on a site</b> — there is no page of your own behind an
          embedded form; the host page&apos;s own background shows through,
          so only the card itself is themed.
        </Li>
      </Ul>

      <H3 id="theme-presets">Presets</H3>
      <P>
        Thirty presets cover most of what a form needs to look intentional
        without touching a color picker — designed looks like Nightshift,
        Glass and Blueprint; tinted looks built around one hue like Sky,
        Amber and Forest; and a set of plain solids like Classic, Paper and
        Ink for a form that should read as neutral. Picking one sets colors,
        background and card style together; every control below still works
        afterward to fine-tune it.
      </P>

      <H3 id="theme-colors">Colors</H3>
      <P>
        Page background, card background and border, the submit button
        color (which also drives focus rings), label color, and the input
        fields&apos; own background, border and text color — each is
        independent, and label/input text color default to matching the
        form&apos;s general text color if left blank. A text color setting
        switches between <b>Auto</b> (picked from the card background&apos;s
        brightness), <b>Light</b> and <b>Dark</b>.
      </P>

      <H3 id="theme-background">Background</H3>
      <P>
        The page and the card each carry their own background independently,
        as a plain color, a gradient (a preset swatch or your own CSS
        gradient string), or an image — uploaded directly or linked by URL,
        with a fit (fill, fit, or tile) and a position. A page background can
        stay fixed while the page scrolls. Anything other than a plain color
        can take a readability overlay — a tint at an adjustable strength
        laid over the background so text on top of a busy photo stays
        legible.
      </P>

      <H3 id="theme-card">Card &amp; type</H3>
      <P>
        Font family, corner radius, shadow depth (from none to dramatic),
        card opacity, and a frosted-glass blur applied to whatever sits
        behind a translucent card — the details that decide whether a form
        reads as part of your site or as an obviously separate tool bolted
        onto it.
      </P>
    </>
  );
}

export const formsAiAndTheming: Doc = {
  slug: "forms-ai-and-theming",
  title: "Forms: AI building & theming",
  description:
    "Draft and revise a form by describing it to Orbit, and theme it — colors, background, fonts — to match your site instead of looking like a generic form.",
  category: "Tracking",
  order: 17.1,
  Body,
};
