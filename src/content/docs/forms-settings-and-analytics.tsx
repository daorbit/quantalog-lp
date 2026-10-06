import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Everything about a form that isn&apos;t a question: how it looks and
        behaves, when it accepts responses, how it keeps spam out, how quizzes
        are scored, and the numbers that tell you how it is performing.
      </P>

      <H2 id="starting">Starting a form</H2>
      <Ul>
        <Li>
          <b>Describe it to Orbit</b> and it drafts the form for you — see{" "}
          <a href="/docs/forms-ai-and-theming">AI building &amp; theming</a>.
        </Li>
        <Li>
          <b>Templates</b> cover common forms across business, commerce,
          education, health, hospitality, HR, property, support, feedback and
          more. Filter by{" "}
          <b>Standalone</b> (shared as a link) or <b>Embedded</b> (placed on
          your site).
        </Li>
        <Li>
          <b>Import</b> creates a form from a config copied out of another one
          — see <a href="#copying">Copying forms</a>.
        </Li>
      </Ul>

      <H2 id="quick-settings">Quick settings</H2>
      <P>
        <b>Quick settings</b> on the icon rail holds the form-wide options.
        Changes show on the canvas as you make them and are saved with the
        form.
      </P>
      <Ul>
        <Li>
          <b>Layout</b> — show or hide the title and description, and put
          labels above, left of or right of each question.
        </Li>
        <Li>
          <b>Submit button</b> — its text, size, width and alignment.
        </Li>
        <Li>
          <b>Responses</b> — <b>Save partial responses</b> (needed for
          drop-off figures and &quot;save and finish later&quot;; drafts are
          deleted after 30 days), <b>Allow respondents to edit</b> (an edit link
          valid for 7 days, not on paid forms), and <b>Record IP address</b>.
        </Li>
      </Ul>
      <Callout>
        An IP address is personal data in most regions. Turn on{" "}
        <b>Record IP address</b> only if you need it, and mention it in your
        privacy notice.
      </Callout>

      <H3 id="availability">Opening, closing and response limits</H3>
      <P>
        Under <b>Availability</b>, set when the form <b>Opens</b>, when it{" "}
        <b>Closes</b>, and a <b>Response limit</b>. Leave any of them empty for
        no limit. Outside those limits the link stays live but shows your{" "}
        <b>Closed message</b> instead of the form, and nothing can be
        submitted — useful for event registrations and limited offers.
      </P>

      <H3 id="spam">Spam protection</H3>
      <Ul>
        <Li>
          <b>Require captcha</b> adds an invisible Cloudflare Turnstile check
          before a response is accepted. Recommended for any public or paid
          form.
        </Li>
        <Li>
          Every form also has a hidden trap field that people never see but
          bots fill in, and a limit on how many responses one visitor can send
          per minute. Both are always on.
        </Li>
        <Li>
          <b>Must be unique</b> on a question rejects a response whose answer
          matches an earlier one — one registration per email address, for
          example.
        </Li>
      </Ul>

      <H2 id="prefill">Prefilling answers</H2>
      <Ul>
        <Li>
          <b>Initial value</b> in a question&apos;s properties prefills it.
          Date and time questions can default to <b>today</b> or <b>now</b>,
          worked out when the form is opened.
        </Li>
        <Li>
          A <b>Hidden</b> field records a value without showing it. Set its{" "}
          <b>URL parameter</b> to, say, <Code>utm_source</Code>, and a link
          like <Code>…/view?utm_source=newsletter</Code> stores
          &quot;newsletter&quot; with the response. <b>Fallback value</b> is
          used when the link has no such parameter.
        </Li>
      </Ul>

      <H2 id="quizzes">Quizzes, scoring and option values</H2>
      <P>
        Every choice question has a <b>Scoring &amp; answer key</b> section in
        its properties. Both parts are optional:
      </P>
      <Ul>
        <Li>
          <b>Tick an option as correct</b> to make it a scored question. Each
          response records its score, how many answers were right, and the
          total possible.
        </Li>
        <Li>
          <b>Give an option a value</b> to use it in a{" "}
          <a href="/docs/forms-advanced-fields#calculated">calculated
          field</a>, to weight a quiz question, and to build the{" "}
          <a href="/docs/forms-entries-and-links#lead-score">lead score</a>.
        </Li>
      </Ul>
      <Callout>
        A score is saved when the response is submitted. Correcting the answer
        key afterwards does not rescore responses you already have.
      </Callout>

      <H2 id="analytics">Form analytics</H2>
      <P>
        The top of a form&apos;s <b>Responses</b> page shows how it is doing,
        with a trend line for the last two weeks under each figure:
      </P>
      <Ul>
        <Li>
          <b>Views</b> — people who opened the form, counted once per visit
          rather than per page refresh.
        </Li>
        <Li>
          <b>Responses</b> and <b>Completion</b> — completed responses, and
          what share of views they are.
        </Li>
        <Li>
          <b>Top source</b> — the site most responses came from. The full list
          is under <b>Traffic sources</b>.
        </Li>
        <Li>
          <b>Most gave up at</b> and <b>Where people gave up</b> — the
          questions where unfinished responses stopped. These need{" "}
          <b>Save partial responses</b> on; without it there is no record of
          where anyone stopped.
        </Li>
      </Ul>

      <H2 id="copying">Copying forms</H2>
      <Ul>
        <Li>
          <b>Duplicate</b> in a form&apos;s menu makes a draft copy in the same
          workspace, with its questions, logic, theme and settings.{" "}
          <b>Availability</b> (dates, response limit and closed message) is not
          copied, and uploaded background images are left out.
        </Li>
        <Li>
          <b>Copy config</b> puts the form&apos;s definition on your clipboard.
          In another workspace, start a new form, choose <b>Import</b>, and
          paste it. The copy arrives as a draft, without uploaded images; a
          payment field charges through the importing workspace&apos;s own
          gateway.
        </Li>
      </Ul>
      <P>
        Responses are never copied either way — a duplicate starts empty.
      </P>
    </>
  );
}

export const formsSettingsAndAnalytics: Doc = {
  slug: "forms-settings-and-analytics",
  title: "Forms: settings, quizzes & analytics",
  description:
    "Form-wide settings, opening and closing dates, spam protection, prefilled answers, quiz scoring, form analytics and drop-off, and copying forms between workspaces.",
  category: "Tracking",
  order: 17.4,
  Body,
};
