import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        What happens after someone submits: how you triage the responses
        that come in, what a respondent sees once they&apos;ve sent theirs,
        and the two different kinds of link that let them come back to it.
      </P>

      <H2 id="thank-you">Thank you page &amp; redirection</H2>
      <P>
        <b>Thank You Page &amp; Redirection</b> on the icon rail sets what
        happens right after a successful submit — a message shown in place
        of the form, or a redirect to a URL of your own.
      </P>
      <Callout>
        The two are not both shown. A redirect URL, when set, sends the
        browser there immediately and the thank-you message is never
        rendered at all — leave the URL blank to show the message instead.
      </Callout>
      <P>
        With neither set, respondents see a plain default: &quot;Thanks —
        that reached us.&quot; Neither field supports the{" "}
        <code>{"{{Field Label}}"}</code> placeholders the notification
        emails do — both are shown exactly as written.
      </P>

      <H2 id="entries">Reading your entries</H2>
      <P>
        Submissions for a form live on its <b>Entries</b> page. Alongside
        the table view, a <b>Kanban</b> board gives you two columns —{" "}
        <b>Unread</b> and <b>Read</b> — and dragging a card between them
        marks it accordingly. It is a triage board for working through what
        has come in, not a configurable pipeline: the two columns are fixed,
        and moving a card only flips that one flag — nothing else in the
        product reacts to it.
      </P>

      <H2 id="resume-links">Coming back to an unfinished form</H2>
      <P>
        A respondent partway through a long form can ask to finish later.
        With <b>collect partial responses</b> turned on for the form, a
        &quot;save and finish later&quot; option emails them a link back to
        exactly where they stopped. This has to be requested — nothing is
        sent unless they ask for it — and the link expires with the draft
        itself, so it never outlives the response it points at.
      </P>

      <H2 id="edit-links">Letting a respondent edit their answers</H2>
      <P>
        <b>Allow edit</b>, a separate setting from partial responses, covers
        a submission that has already gone through. Turn it on and every
        confirmation email sent to a respondent carries an edit link
        automatically — there is nothing extra for them to request. Opening
        it lets them change their answers within a set window before the
        link stops working.
      </P>
      <Callout variant="warn">
        A submission that includes a payment cannot be edited, regardless of
        this setting — re-opening a paid response would mean either silently
        re-charging it or silently leaving a stale amount on record. If a
        form charges money, treat editing as unavailable for it.
      </Callout>
      <P>
        Editing replaces the same submission rather than creating a second
        one, and the confirmation shown afterward says so plainly —
        &quot;Your changes are saved&quot; in place of the usual thank-you
        screen, with no button offered to submit again.
      </P>

      <H3 id="resume-vs-edit">Resume link vs. edit link</H3>
      <Ul>
        <Li>
          A <b>resume</b> link picks up an unfinished draft — it exists
          because a respondent asked for it partway through, and it goes
          nowhere once the response is actually submitted.
        </Li>
        <Li>
          An <b>edit</b> link changes a submission that is already complete
          — it is sent automatically, without being asked for, and only
          works while editing is turned on for the form.
        </Li>
      </Ul>
      <P>
        Each is scoped to the one submission or draft it was minted for, and
        neither can be repurposed as the other.
      </P>
    </>
  );
}

export const formsEntriesAndLinks: Doc = {
  slug: "forms-entries-and-links",
  title: "Forms: entries, resume & edit links",
  description:
    "Triage submissions on the entries Kanban board, set the thank-you page or redirect, and let respondents come back to a draft or edit what they already submitted.",
  category: "Tracking",
  order: 17.2,
  Body,
};
