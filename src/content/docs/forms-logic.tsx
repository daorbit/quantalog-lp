import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Conditional logic lets one form behave like several. Questions appear
        only when they apply, whole steps are skipped when they don&apos;t, the
        respondent lands on a thank-you message that fits their answers, and
        the alert for a new response goes to the people who need to act on it.
        All four use the same condition builder, so once you have written one
        condition you know how to write the rest.
      </P>

      <H2 id="conditions">Writing a condition</H2>
      <P>
        A condition has three parts: a <b>question</b> from the form, a{" "}
        <b>comparison</b>, and a <b>value</b>. &quot;Budget is at least
        5000&quot; or &quot;Reason for contact is Sales&quot;.
      </P>
      <Ul>
        <Li>
          For a dropdown, radio, checkbox, chips or multiple-choice question,
          the value is picked from that question&apos;s own options, so a typo
          can&apos;t silently break the rule.
        </Li>
        <Li>
          A yes/no question offers <b>Yes</b> and <b>No</b>; a terms or consent
          box offers <b>Checked</b> and <b>Not checked</b>.
        </Li>
        <Li>Every other question takes a value you type.</Li>
      </Ul>
      <P>
        Choose <b>Add another condition</b> to combine several, then set{" "}
        <b>Match</b> to <b>All conditions</b> (every one must be true) or{" "}
        <b>Any condition</b> (one is enough).
      </P>

      <H3 id="comparisons">Comparisons</H3>
      <Ul>
        <Li>
          <b>is</b> / <b>is not</b> — the answer is exactly the value, or
          anything else.
        </Li>
        <Li>
          <b>contains</b> / <b>does not contain</b> — the value appears
          anywhere in the answer, ignoring capitals.
        </Li>
        <Li>
          <b>is empty</b> / <b>is not empty</b> — whether the question was
          answered at all. These take no value.
        </Li>
        <Li>
          <b>is greater than</b>, <b>is at least</b>, <b>is less than</b>,{" "}
          <b>is at most</b> — offered on number, decimal, currency, slider,
          rating, NPS and calculated questions. Currency symbols and thousands
          separators are ignored, so &quot;₹12,500&quot; compares as 12500.
        </Li>
      </Ul>
      <Callout>
        A question that allows several picks — checkboxes, multiple choice,
        multi-select chips — stores them together, as &quot;Design,
        Development&quot;. Use <b>contains</b> rather than <b>is</b> to test
        for one of them.
      </Callout>

      <H2 id="show-fields">Showing a question only when it applies</H2>
      <P>
        Click any question on the canvas and open <b>Conditional logic</b> in
        its properties. With no condition it is always shown; choose{" "}
        <b>Add condition</b> to show it only when the conditions match.
      </P>
      <Ul>
        <Li>
          A hidden question is never required, so it can&apos;t block the
          submit button.
        </Li>
        <Li>
          Its answer is never sent. A respondent who answered it and then
          changed an earlier answer leaves nothing behind from the branch they
          backed out of.
        </Li>
        <Li>
          Hiding a column layout hides everything inside it.
        </Li>
        <Li>
          A question hidden by its own condition can&apos;t keep a later
          question visible — its answer no longer counts.
        </Li>
      </Ul>

      <H2 id="skip-steps">Skipping a step</H2>
      <P>
        On a multi-step form, click a <b>page break</b> and open{" "}
        <b>Step logic</b>. A condition there decides whether the step after
        that break is shown. Only questions that come before the break can be
        used, since nothing after it has been answered yet.
      </P>
      <Ul>
        <Li>
          <b>Next</b> and <b>Back</b> jump straight past a skipped step.
        </Li>
        <Li>
          The progress indicator counts only the steps this respondent will
          actually see, so &quot;Step 2 of 3&quot; stays honest.
        </Li>
        <Li>
          Required questions on a skipped step don&apos;t block anything, and
          their answers are not sent.
        </Li>
      </Ul>
      <Callout>
        A payment field on a skipped step, or one hidden by its own condition,
        does not charge. This is checked on our servers as well as in the
        browser, so someone who picked the free option is never billed because
        a payment field exists further down the form.
      </Callout>

      <H2 id="endings">A different ending for different answers</H2>
      <P>
        Open <b>After submission</b> on the icon rail. Below the default
        message or redirect, <b>Endings by answer</b> holds as many alternative
        endings as you need. Each one has a <b>When</b> (its conditions) and a{" "}
        <b>Then</b>: a message shown in place of the form, or a redirect to a
        URL.
      </P>
      <Ul>
        <Li>
          Endings are checked from the top, and the <b>first</b> one that
          matches is used — put the most specific ones first.
        </Li>
        <Li>
          When none match, the default above is used.
        </Li>
        <Li>
          A matching ending wins over the default completely: an ending with a
          message is shown even if the default is set to redirect.
        </Li>
      </Ul>
      <P>
        Typical uses: send qualified leads straight to a booking page while
        everyone else sees &quot;we&apos;ll be in touch&quot;, or thank a
        detractor on an NPS form differently from a promoter.
      </P>
      <Callout>
        In preview, a redirect ending is not followed — its message, if it has
        one, is shown instead. And on a form paid through a gateway that takes
        the respondent to another site and back (PayU), the default ending is
        shown on their return.
      </Callout>

      <H2 id="routing">Sending the alert to the right people</H2>
      <P>
        Open <b>Email Notifications</b>, switch to <b>Notify me</b>, and use{" "}
        <b>Route by answer</b>. Each route has conditions and a list of
        addresses; when a response matches, the alert also goes to those
        addresses.
      </P>
      <Ul>
        <Li>
          Routes add to the main recipients rather than replacing them. To send
          sales enquiries only to sales and support requests only to support,
          leave the main <b>To</b> empty and use two routes.
        </Li>
        <Li>
          Someone who appears in several matching routes still gets one email.
        </Li>
        <Li>
          Routes only send while <b>Notify me</b> is switched on, and like every
          notification email they need an email app connected — see{" "}
          <a href="/docs/forms-notifications-and-apps">Notifications &amp;
          integrations</a>.
        </Li>
      </Ul>

      <H2 id="example">Example: a B2B enquiry form</H2>
      <Ul>
        <Li>
          <b>Company size</b> is shown only when <b>Enquiry type</b> is{" "}
          <b>Sales</b>.
        </Li>
        <Li>
          The <b>Budget</b> step is skipped unless Enquiry type is Sales.
        </Li>
        <Li>
          An ending for &quot;Enquiry type is Sales&quot; <b>and</b>{" "}
          &quot;Budget is at least 50000&quot; redirects to your calendar
          booking page.
        </Li>
        <Li>
          A route for &quot;Enquiry type is Support&quot; alerts
          support@yourcompany.com.
        </Li>
      </Ul>

      <H2 id="good-to-know">Good to know</H2>
      <Ul>
        <Li>
          Conditions point at a question, not its label, so renaming a question
          never breaks them.
        </Li>
        <Li>
          If you delete a question that a condition uses, open that condition
          and pick a new question — until you do, it compares against an empty
          answer.
        </Li>
        <Li>
          Test the paths in <b>Preview</b> before publishing: nothing is saved
          and no payment is taken there.
        </Li>
      </Ul>
    </>
  );
}

export const formsLogic: Doc = {
  slug: "forms-logic",
  title: "Forms: conditional logic",
  description:
    "Show questions only when they apply, skip whole steps, give respondents a different ending based on their answers, and route new-response alerts to the right inbox.",
  category: "Tracking",
  order: 17.25,
  Body,
};
