import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code, Pre } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Beyond the basic inputs, choices and uploads covered in{" "}
        <a href="/docs/lead-capture">Lead capture</a>, the palette has a
        handful of fields built for a specific job: repeatable line items, a
        value computed from other answers, a survey grid, and a set of
        rating scales.
      </P>

      <H2 id="repeater">Repeating group</H2>
      <P>
        A repeater holds a small set of sub-fields — text, numbers, choices,
        dates and a few others — and lets the respondent add as many rows of
        them as the form allows, one line item at a time. A new repeater
        starts with a single text sub-field labeled &quot;Item&quot;; add,
        remove and reorder the sub-fields the same way you would fields on
        the form itself.
      </P>
      <P>
        <b>Minimum rows</b> and <b>maximum rows</b> control the range — leave
        the maximum unset for no limit. The add-row button disappears once
        the maximum is reached, and a row can&apos;t be removed below the
        minimum.
      </P>
      <P>
        Each submitted row becomes one entry in a list, and{" "}
        <code>{"{{Field Label}}"}</code> in a notification email expands the
        whole repeater as a numbered list of its rows:
      </P>
      <Pre label="Notification email">{`1. Item: Widget, Quantity: 3
2. Item: Gadget, Quantity: 1`}</Pre>

      <H2 id="calculated">Calculated field</H2>
      <P>
        A calculated field shows a value worked out from other fields on the
        form, using their labels: <code>{"{{Quantity}} * {{Unit price}}"}</code>.
        Addition, subtraction, multiplication, division, modulo and
        parentheses are supported — nothing else, so a formula outside that
        set fails to save.
      </P>
      <Ul>
        <Li>
          Referencing a choice field pulls the number from that
          option&apos;s own value rather than its text — set those under{" "}
          <b>Scoring &amp; answer key</b> on the choice field itself. A
          checkbox field sums the values of every option ticked.
        </Li>
        <Li>
          An unanswered or non-numeric reference counts as zero, and
          dividing by zero resolves to zero rather than an error — a formula
          never blocks a submission.
        </Li>
        <Li>
          Formulas run in the order the fields appear, so a later formula
          can reference an earlier calculated field&apos;s result.
        </Li>
      </Ul>
      <P>
        Display it as a plain number or as currency, and set how many
        decimal places to show. Whatever the respondent&apos;s browser
        computed is never trusted — the amount stored is always recalculated
        on the server from the form as you built it.
      </P>

      <H2 id="matrix">Matrix</H2>
      <P>
        A matrix lays out a set of statements as rows against one shared set
        of answer columns — the standard &quot;rate each of the
        following&quot; grid. Edit the statements under <b>Rows</b> and the
        shared answers under <b>Answer columns</b>; each row takes exactly
        one answer.
      </P>

      <H2 id="rating-scales">Rating scales</H2>
      <P>Four fields for a number or a feeling rather than free text:</P>
      <Ul>
        <Li>
          <b>Rating</b> — a star rating from 2 to 10 stars.
        </Li>
        <Li>
          <b>Slider</b> — a numeric range with its own minimum, maximum and
          step.
        </Li>
        <Li>
          <b>NPS</b> — the 0–10 recommend-us scale, defaulting to that exact
          question.
        </Li>
        <Li>
          <b>Likert</b> — an agreement scale (Strongly disagree through
          Strongly agree by default) edited the same way as any other set of
          options.
        </Li>
      </Ul>

      <Callout variant="warn">
        <b>Unique ID</b> and <b>Random ID</b> fields, in the Identifier
        group, are not wired up to generate anything yet — on the current
        release they display a fixed placeholder (<Code>1</Code> and{" "}
        <Code>ZF1</Code> respectively) rather than a real per-submission
        value. Don&apos;t rely on either for an actual reference number
        today; a hidden field with your own value, or the submission&apos;s
        own id from the API, is the dependable option in the meantime.
      </Callout>

      <Callout>
        Marking an option correct under <b>Scoring &amp; answer key</b>{" "}
        does score the submission server-side and save it — but there is
        currently no screen, export or email that shows that score back to
        you. It is recorded, not yet surfaced. Use{" "}
        <b>Scoring &amp; answer key</b> today mainly for the option values a
        calculated field reads, and treat quiz scoring itself as not yet a
        usable feature.
      </Callout>
    </>
  );
}

export const formsAdvancedFields: Doc = {
  slug: "forms-advanced-fields",
  title: "Forms: advanced field types",
  description:
    "Repeating groups, calculated fields, matrix grids and rating scales — what each does, how they're configured, and what the answer looks like in your data.",
  category: "Tracking",
  order: 17.3,
  Body,
};
