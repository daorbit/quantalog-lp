import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        A new response can reach you four ways: an email to you, a
        confirmation email to the respondent, a row in your Quantalog
        notification bell, and a message in Slack, Discord or Telegram. This
        page covers how to set each one up, and the email app that the two
        emails depend on. To collect responses in a spreadsheet instead, see{" "}
        <a href="/docs/forms-google-sheets">Google Sheets</a>.
      </P>

      <H2 id="email-app">Connect an email app first</H2>
      <P>
        Form emails are sent from <b>your</b> email account, so replies reach
        you and your domain&apos;s reputation stays your own. Open{" "}
        <b>Apps</b> in Quantalog (the <b>Apps</b>{" "}
        button in the form builder takes you there) and connect one of:
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
          <b>Resend</b> — paste an <b>API key</b> (it starts{" "}
          <Code>re_</Code>) from the API Keys page in Resend. A key with sending
          access is enough. The From address must be on a domain you have
          verified in Resend.
        </Li>
        <Li>
          <b>Custom SMTP</b> — host, port, username and password of your own
          mail server. Use port 587 with <b>Use implicit TLS</b> off, or 465
          with it on.
        </Li>
      </Ul>
      <P>
        All three ask for a <b>From name</b> and <b>From address</b>; the address
        must be one your provider allows you to send from. <b>Test</b> sends
        through the connection straight away, so a wrong key shows up now
        rather than at the first real response.
      </P>
      <P>
        You can keep more than one connected, but only one sends at a time. In{" "}
        <b>Apps</b>, open a provider with <b>Manage</b> and press{" "}
        <b>Activate</b>. Form emails switch to it, and the others stay saved.
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
        <b>Alerts</b> (the bell on the icon rail) holds the in-app and
        Telegram switches for the form. With <b>Quantalog notifications</b>{" "}
        on, every response to this form
        adds a row to the bell in Quantalog, answers attached, and arrives as a
        push notification on devices where you allowed them. It needs no email
        app.
      </P>

      <H2 id="chat">Slack, Discord, Microsoft Teams and Google Chat</H2>
      <P>
        In <b>Apps</b>, connect <b>Slack</b>, <b>Discord</b>,{" "}
        <b>Microsoft Teams</b> or <b>Google Chat</b> with a webhook URL for the
        channel you want:
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
        <Li>
          <b>Microsoft Teams</b> — in the channel, open <b>Workflows</b>, choose{" "}
          <b>Post to a channel when a webhook request is received</b>, and copy
          the URL it gives you. Each response arrives as a card.
        </Li>
        <Li>
          <b>Google Chat</b> — in the space, open the space name menu, choose{" "}
          <b>Apps &amp; integrations</b>, then <b>Webhooks</b>, add one and copy
          its URL (<Code>https://chat.googleapis.com/v1/spaces/…</Code>). Each
          response arrives as a card. Webhooks need a Google Workspace account.
        </Li>
      </Ul>
      <P>
        Once connected, a form posts each new response — its title and answers
        — to the channel whenever that form has <b>Notify me</b> or{" "}
        <b>Quantalog notifications</b> switched on. Like the email app, the
        connection is shared by every form in the workspace.
      </P>

      <H2 id="whatsapp">WhatsApp</H2>
      <P>
        WhatsApp is an app you connect once per workspace, on plans that
        include it, and it is shared by form alerts and scheduled reports:
      </P>
      <Ul>
        <Li>
          Open <b>Apps → WhatsApp</b> and turn it on.
        </Li>
        <Li>
          Add a number with its country code and press <b>Send code</b>.
          Quantalog sends a 6-digit code to that WhatsApp; enter it to verify
          the number. Add up to 10.
        </Li>
        <Li>
          Switch on <b>Form alerts</b> for each number that should hear about
          new responses.
        </Li>
        <Li>
          In the form builder, open <b>Alerts</b>, switch on <b>WhatsApp</b>{" "}
          and save the form.
        </Li>
      </Ul>
      <P>
        Each new response — the form&apos;s title and up to 12 answers — then
        arrives on those numbers. Messages come from Quantalog&apos;s shared
        WhatsApp number, only to numbers that confirmed a code — never to
        respondents.
      </P>

      <H2 id="telegram">Telegram</H2>
      <P>
        A workspace has one Telegram connection, shared by form alerts and
        scheduled reports. Open <b>Apps</b>, find{" "}
        <b>Telegram</b> (search &quot;telegram&quot; or pick{" "}
        <b>Notifications</b> in the category filter) and choose{" "}
        <b>Connect</b>.
      </P>

      <H3 id="telegram-bot">1. Choose the bot</H3>
      <Ul>
        <Li>
          <b>Quantalog bot</b> — nothing to set up. Messages come from the
          Quantalog bot.
        </Li>
        <Li>
          <b>Your own bot</b> — messages come from your bot&apos;s name and
          picture. In Telegram, open <b>@BotFather</b>, send{" "}
          <Code>/newbot</Code>, and paste the token it gives you (it looks like{" "}
          <Code>123456789:AAH…</Code>). Anyone with the token can post as your
          bot, so keep it private.
        </Li>
      </Ul>

      <H3 id="telegram-chat">2. Link a chat</H3>
      <Ul>
        <Li>
          <b>With the Quantalog bot</b> — press <b>Connect my chat</b> and press{" "}
          <b>Start</b> in Telegram, or <b>Add to a group</b> and pick the
          group. Come back and the chat is in the list.
        </Li>
        <Li>
          <b>With your own bot</b> — send your bot a message (or add it to a
          group and post there), then press <b>Find chats</b> and{" "}
          <b>Add</b>. For a public channel, add the bot as an{" "}
          <b>administrator</b> and add <Code>@channelname</Code> by hand.
        </Li>
      </Ul>

      <H3 id="telegram-connect">3. Turn on form alerts</H3>
      <P>
        Switch on <b>Form alerts</b> for each chat that should hear about new
        responses. Then, in the form builder, open <b>Alerts</b> (the bell in
        the right-hand rail), switch on <b>Telegram</b>, and save the form.
        Each new response — the form&apos;s title and up to 12 answers — is
        posted to those chats. Forms made before this switch existed follow{" "}
        <b>Notify me</b> or <b>Quantalog notifications</b> until you change it.
        Chats with form alerts off can still receive reports. Use{" "}
        <b>Send test message</b> to check: a message should appear in every
        linked chat within a second or two.
      </P>
      <Callout variant="tip" title="If the test fails">
        <b>chat not found</b> means the bot has never seen that chat: press{" "}
        <b>Start</b> in the bot, or add it to the group or channel, then link
        it again. <b>Unauthorized</b> means your own bot&apos;s token was
        revoked in BotFather; paste a fresh one. <b>bot was blocked by the
        user</b> means the bot was blocked; unblock it in Telegram. Send{" "}
        <Code>/stop</Code> in a chat to unlink it from the Quantalog bot.
      </Callout>

      <H3 id="paid-forms">On paid forms</H3>
      <P>
        Nothing is sent — email, bell or chat — until the payment clears. A
        checkout that is abandoned never notifies anyone.
      </P>

      <H2 id="crm">Zoho CRM</H2>
      <P>
        Connect Zoho CRM once and every new response from every form in the
        workspace is added to Zoho as a <b>lead</b>. The name, email, phone
        and company are taken from the form, and the description holds the
        form name, the lead source and all the answers.
      </P>
      <H3 id="crm-setup">Setting it up</H3>
      <Ul>
        <Li>
          Open the <b>Zoho API Console</b>, choose <b>Add client</b> and pick{" "}
          <b>Self Client</b>. Copy the <b>Client ID</b> and{" "}
          <b>Client secret</b>.
        </Li>
        <Li>
          On the <b>Generate code</b> tab, enter the scope{" "}
          <Code>ZohoCRM.modules.leads.CREATE</Code>, pick a duration and create
          the code.
        </Li>
        <Li>
          Exchange that code for a <b>refresh token</b> (Zoho&apos;s guide shows
          the one request needed). The refresh token does not expire unless you
          revoke it.
        </Li>
        <Li>
          In Quantalog, open <b>App Store</b>, find <b>Zoho CRM</b> and enter
          your data centre (<Code>com</Code>, <Code>in</Code>, <Code>eu</Code>,{" "}
          <Code>com.au</Code>, <Code>jp</Code> or <Code>ca</Code>), the client
          ID, the client secret and the refresh token. Click <b>Test</b>, then
          switch it on.
        </Li>
      </Ul>
      <Callout title="Required fields in Zoho">
        Zoho needs a last name and a company on every lead. When a form has no
        name field, the email is used as the last name; when it has no company
        field, the person&apos;s name is used as the company.
      </Callout>
      <P>
        Leads are sent after the response is saved, so the respondent never
        waits on Zoho. Paid forms send the lead once the payment clears.
      </P>

      <H2 id="webhook">Anything else: the webhook</H2>
      <P>
        For a spreadsheet, connect{" "}
        <a href="/docs/forms-google-sheets">Google Sheets</a>. To reach a CRM
        or your own server, connect a <b>Webhook</b> on the form. It POSTs every submission as JSON and can
        be signed. See{" "}
        <a href="/docs/lead-capture#webhook">Sending submissions to a
        webhook</a>.
      </P>

      <Callout>
        Notifications are a paid feature. On a plan without them, no email,
        bell, Slack, Discord or Telegram alert is sent — the webhook and Google
        Sheets still work on every plan.
      </Callout>
    </>
  );
}

export const formsNotificationsAndApps: Doc = {
  slug: "forms-notifications-and-apps",
  title: "Forms: notifications & integrations",
  description:
    "Connect Brevo, Resend or your own SMTP, alert yourself and confirm to respondents by email, and get new responses in the Quantalog bell, Slack, Discord or Telegram.",
  category: "Tracking",
  order: 17.35,
  Body,
};
