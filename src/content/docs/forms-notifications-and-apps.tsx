import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A new response can reach you four ways: an email to you, a
        confirmation email to the respondent, a row in your Quantalog
        notification bell, and a message in Slack or Discord. This page covers
        how to set each one up, and the email app that the two emails depend
        on.
      </P>

      <H2 id="email-app">Connect an email app first</H2>
      <P>
        Form emails are sent from <b>your</b> email account, so replies reach
        you and your domain&apos;s reputation stays your own. Open{" "}
        <b>Integrations</b> on the icon rail and connect one of:
      </P>
      <Ul>
        <Li>
          <b>Brevo</b> — paste the <b>SMTP login</b> and an <b>SMTP key</b>{" "}
          from the SMTP tab of Brevo&apos;s &quot;SMTP &amp; API&quot; page.
          Use the SMTP key (it starts <Code>xsmtpsib-</Code>), not a REST API
          key (<Code>xkeysib-</Code>) — the API key fails with
          &quot;Authentication failed&quot;.
        </Li>
        <Li>
          <b>Custom SMTP</b> — host, port, username and password of your own
          mail server. Use port 587 with <b>Use implicit TLS</b> off, or 465
          with it on.
        </Li>
      </Ul>
      <P>
        Both ask for a <b>From name</b> and <b>From address</b>; the address
        must be one your provider allows you to send from. <b>Test</b> sends
        through the connection straight away, so a wrong key shows up now
        rather than at the first real response.
      </P>
      <Callout variant="warn">
        Without a connected, switched-on email app, no form emails are sent at
        all — neither yours nor the respondent&apos;s. The Email Notifications
        panel warns you when it can&apos;t see one. The connection belongs to
        the workspace, so every form in it uses the same app.
      </Callout>

      <H2 id="owner-alert">Alerting yourself</H2>
      <P>
        Open <b>Email Notifications</b> and choose <b>Notify me</b>. Switch it
        on, enter one or more addresses in <b>To</b> (comma-separated), and
        optionally change the subject. The message lists every answer as it
        was submitted — there is no body to write.
      </P>
      <P>
        To send some responses to extra people — sales leads to sales, support
        requests to support — add a <b>Route by answer</b>. See{" "}
        <a href="/docs/forms-logic#routing">Conditional logic</a>.
      </P>

      <H2 id="respondent-email">Confirming to the respondent</H2>
      <P>
        Choose <b>Respondent email</b> and switch it on. The form needs an{" "}
        <b>Email</b> field; pick it as the recipient in <b>To</b>. A respondent
        who leaves that field blank simply gets no email.
      </P>
      <Ul>
        <Li>
          <b>What the email includes</b> — your message is always there. Around
          it: <b>Just your message</b>, <b>With a tick</b>,{" "}
          <b>With their answers</b>, <b>With a button</b> or{" "}
          <b>Everything</b>.
        </Li>
        <Li>
          <b>Field Labels</b> in the editor toolbar inserts{" "}
          <Code>{"{{Field Label}}"}</Code>, replaced with that respondent&apos;s
          answer. It works in the subject too.
        </Li>
        <Li>
          Layouts with a button take a <b>Button label</b> and{" "}
          <b>Button link</b>; with no link, no button is shown.
        </Li>
        <Li>
          <b>Preview</b> shows the real email with sample answers, exactly as
          it will be sent.
        </Li>
      </Ul>
      <P>
        With <b>Allow respondents to edit</b> on, the confirmation carries an
        edit link — see{" "}
        <a href="/docs/forms-entries-and-links#edit-links">Entries, pipeline
        &amp; links</a>.
      </P>

      <H2 id="bell">Responses in your Quantalog bell</H2>
      <P>
        <b>Notification Drawer</b> on the icon rail has one switch,{" "}
        <b>Notify in Quantalog</b>. With it on, every response to this form
        adds a row to the bell in Quantalog, answers attached, and arrives as a
        push notification on devices where you allowed them. It needs no email
        app.
      </P>

      <H2 id="chat">Slack and Discord</H2>
      <P>
        In <b>Integrations</b>, connect <b>Slack</b> or <b>Discord</b> with an
        incoming webhook URL for the channel you want:
      </P>
      <Ul>
        <Li>
          <b>Slack</b> — create an incoming webhook for the channel and paste
          its URL (<Code>https://hooks.slack.com/services/…</Code>).
        </Li>
        <Li>
          <b>Discord</b> — in the channel&apos;s settings open{" "}
          <b>Integrations</b>, create a webhook, and copy its URL.
        </Li>
      </Ul>
      <P>
        Once connected, a form posts each new response — its title and answers
        — to the channel whenever that form has <b>Notify me</b> or{" "}
        <b>Notify in Quantalog</b> switched on. Like the email app, the
        connection is shared by every form in the workspace.
      </P>

      <H3 id="paid-forms">On paid forms</H3>
      <P>
        Nothing is sent — email, bell or chat — until the payment clears. A
        checkout that is abandoned never notifies anyone.
      </P>

      <H2 id="webhook">Anything else: the webhook</H2>
      <P>
        To reach Google Sheets, a CRM, or your own server, connect a{" "}
        <b>Webhook</b> on the form. It POSTs every submission as JSON and can
        be signed. See{" "}
        <a href="/docs/lead-capture#webhook">Sending submissions to a
        webhook</a>.
      </P>

      <Callout>
        Notifications are a paid feature. On a plan without them, no email,
        bell, Slack or Discord alert is sent — the webhook still fires on every
        plan.
      </Callout>
    </>
  );
}

export const formsNotificationsAndApps: Doc = {
  slug: "forms-notifications-and-apps",
  title: "Forms: notifications & integrations",
  description:
    "Connect Brevo or your own SMTP, alert yourself and confirm to respondents by email, and get new responses in the Quantalog bell, Slack or Discord.",
  category: "Tracking",
  order: 17.35,
  Body,
};
