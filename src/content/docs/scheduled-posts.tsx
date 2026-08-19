import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        The post studio writes LinkedIn posts ahead of time and publishes them
        for you. You write the text and pick the image once; Quantalog sends it
        at the time you chose, whether or not you&apos;re at your desk.
      </P>

      <H2 id="connecting">Connecting LinkedIn</H2>
      <P>
        Before anything can publish, connect LinkedIn from the studio. This is a
        separate permission from signing in with LinkedIn — signing in proves who
        you are, but it does not let us post on your behalf, so LinkedIn asks
        again the first time you schedule something.
      </P>
      <Callout>
        A connection that expires, or one made for sign-in only, pauses every
        schedule on your account until you reconnect. The studio says so at the
        top of the page rather than letting posts fail quietly.
      </Callout>

      <H2 id="creating">Creating a post</H2>
      <P>
        Choose <b>New post</b>. You write the caption on the left and see it laid
        out as LinkedIn will render it on the right — where the text folds, how
        the image crops.
      </P>
      <Ul>
        <Li>
          <b>Name</b> — how you&apos;ll recognise it in your own list. It is not
          published.
        </Li>
        <Li>
          <b>Post</b> — the caption, up to 3,000 characters. Bold and italic are
          unicode letters rather than formatting, because LinkedIn&apos;s
          composer accepts no markup.
        </Li>
        <Li>
          <b>Image</b> — optional. A caption on its own is a valid post, and
          LinkedIn builds its own preview from any link inside it.
        </Li>
      </Ul>

      <H2 id="scheduling">Once, or on a repeat</H2>
      <P>
        <b>Post once</b> publishes at a date and time and then retires. This is
        the usual choice, and what a content calendar is made of.
      </P>
      <P>
        <b>Repeat</b> publishes daily, weekly, or monthly at an hour you pick, in
        your own timezone. A repeating post sends <b>the same text and image
        every time</b>, so it suits evergreen content only — LinkedIn
        deprioritises duplicate posts, and readers notice.
      </P>

      <H2 id="timing">When posts actually go out</H2>
      <P>
        Posts publish on a recurring check rather than at the exact minute
        stored, so one set for 12:00 may go out a little after. Pick the hour
        that matters to you; treat the minute as approximate.
      </P>

      <H2 id="managing">Managing what you&apos;ve scheduled</H2>
      <Ul>
        <Li>
          <b>Pause and resume</b> — a paused schedule keeps its cadence and stops
          publishing until you resume it.
        </Li>
        <Li>
          <b>Post now</b> — publishes immediately. This is an <i>extra</i> send:
          the schedule is untouched, so a weekly post sent by hand today still
          goes out on its usual day.
        </Li>
        <Li>
          <b>Last outcome</b> — each post records whether it published, with a
          link to it, or why it failed.
        </Li>
      </Ul>
      <Callout>
        Quantalog cannot unpublish a post. Deleting a schedule stops future runs
        and removes its image, but anything already on LinkedIn stays there —
        remove it from LinkedIn itself.
      </Callout>

      <H2 id="ownership">Who can see your schedules</H2>
      <P>
        Scheduled posts belong to you, not to the workspace. They publish under
        your own LinkedIn account, so other members of the same workspace
        cannot see or change them.
      </P>
    </>
  );
}

export const scheduledPosts: Doc = {
  slug: "scheduled-posts",
  title: "Scheduled posts",
  description:
    "Write LinkedIn posts ahead of time and let Quantalog publish them — once, or on a repeating cadence in your own timezone.",
  category: "Tracking",
  order: 16,
  Body,
};
