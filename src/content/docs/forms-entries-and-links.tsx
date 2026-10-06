import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        What happens after someone submits: what they see once they&apos;ve
        sent their response, how you work through the responses that come in,
        and the two kinds of link that let a respondent come back to theirs.
      </P>

      <H2 id="thank-you">Thank you page &amp; redirection</H2>
      <P>
        <b>After submission</b> on the icon rail sets what happens right after
        a successful submit — a message shown in place of the form, or a
        redirect to a URL of your own.
      </P>
      <Callout>
        The two are not both shown. A redirect URL, when set, sends the
        browser there immediately and the thank-you message is never
        rendered at all — choose <b>Show a message</b> to use the message
        instead.
      </Callout>
      <P>
        With neither set, respondents see a plain default: &quot;Thanks —
        that reached us.&quot; Neither field supports the{" "}
        <code>{"{{Field Label}}"}</code> placeholders the notification
        emails do — both are shown exactly as written.
      </P>
      <P>
        To show a different message or redirect depending on the answers, add{" "}
        <b>Endings by answer</b> in the same drawer — see{" "}
        <a href="/docs/forms-logic#endings">Conditional logic</a>.
      </P>

      <H2 id="entries">Reading your entries</H2>
      <P>
        Open a form&apos;s <b>Responses</b> to see what has come in. Three
        views show the same responses in different ways:
      </P>
      <Ul>
        <Li>
          <b>List</b> — one row per response, paged, with unread ones marked.
          Click a row to open it.
        </Li>
        <Li>
          <b>Board</b> — responses as cards in pipeline stages, for working
          leads through to a result.
        </Li>
        <Li>
          <b>Sheet</b> — every response in a spreadsheet grid, for scanning
          and comparing many at once.
        </Li>
      </Ul>
      <P>
        Opening a response marks it read. Use the arrow keys (or <b>j</b> and{" "}
        <b>k</b>) to step to the next or previous one without closing the
        panel.
      </P>

      <H2 id="pipeline">Working leads through a pipeline</H2>
      <P>
        Every response has a <b>stage</b>: <b>New</b>, <b>Contacted</b>,{" "}
        <b>Qualified</b>, <b>Won</b> or <b>Lost</b>. Responses start as New.
        On the <b>Board</b>, drag a card to another column to move it; in the
        response panel, change it under <b>Lead</b>.
      </P>
      <P>The <b>Lead</b> section at the top of each response also holds:</P>
      <Ul>
        <Li>
          <b>Assignee</b> — who is handling it. Type a name; names already
          used on this form are suggested.
        </Li>
        <Li>
          <b>Tags</b> — short labels like &quot;enterprise&quot; or
          &quot;follow-up&quot;. Press Enter or a comma to add one.
        </Li>
        <Li>
          <b>Notes</b> — internal notes with the time they were written.
          Respondents never see them. <b>Ctrl+Enter</b> (or <b>⌘+Enter</b>)
          saves a note.
        </Li>
      </Ul>
      <Callout>
        Stages, assignees, tags and notes are for your team only. They are not
        sent in the webhook or notification emails, and changing them never
        contacts the respondent.
      </Callout>

      <H3 id="lead-score">Lead score</H3>
      <P>
        Give options a value under <b>Scoring &amp; answer key</b> in a choice
        question&apos;s properties, and every new response gets a{" "}
        <b>score</b>: the sum of the values of the options it picked, across
        the whole form. &quot;Budget: Over ₹5L&quot; might be worth 30 and
        &quot;Timeline: This month&quot; 20, so the hottest leads rise to the
        top.
      </P>
      <Ul>
        <Li>
          The score shows on the response, on its board card, and as a{" "}
          <b>Score</b> column in the list.
        </Li>
        <Li>
          It is worked out when the response is submitted (and again if the
          respondent edits it). Responses that arrived before you set values
          have no score.
        </Li>
      </Ul>

      <H3 id="filters">Filtering and sorting</H3>
      <P>
        Beside the search box and date filter, narrow the list by{" "}
        <b>stage</b>, <b>assignee</b> (including <b>Unassigned</b>) and{" "}
        <b>tag</b>, and sort by <b>Newest first</b>, <b>Oldest first</b> or,
        on a scored form, <b>Highest score</b>. The assignee and tag filters
        appear once at least one response has an assignee or tag.
      </P>

      <H3 id="bulk">Bulk actions</H3>
      <P>
        Tick responses in the list to open the bar at the bottom of the
        screen: mark them read or unread, <b>move them to a stage</b>, export
        just those to CSV, or delete them.
      </P>

      <H2 id="exporting">Exporting responses</H2>
      <Ul>
        <Li>
          <b>Export</b> downloads a CSV of the responses on screen, with stage,
          assignee, tags and (on a scored form) score after the answers.
        </Li>
        <Li>
          <b>PDF</b> in a response&apos;s panel, or the PDF icon on its row,
          downloads that one response.
        </Li>
        <Li>
          The paperclip lists every uploaded file on the form, each opening
          from where it is stored.
        </Li>
      </Ul>

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
  title: "Forms: entries, pipeline & links",
  description:
    "Work responses through a lead pipeline with stages, assignees, tags, notes and a lead score; export them; set the thank-you page; and let respondents come back to a draft or edit what they sent.",
  category: "Tracking",
  order: 17.2,
  Body,
};
