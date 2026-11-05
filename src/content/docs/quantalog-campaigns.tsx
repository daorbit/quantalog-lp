import type { Doc } from "@/lib/docs";
import { H2, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Campaigns</b> sends one email to the people who answered
        your forms, or to a list of your own. It is an official Quantalog app
        that a workspace admin unlocks in <b>Apps</b>, then editors can create
        and send campaigns.
      </P>

      <H2 id="before">Before you start</H2>
      <P>
        Campaigns send through your own email provider. In <b>Apps</b>, connect
        Resend, Brevo or Custom SMTP, open it with <b>Manage</b> and press{" "}
        <b>Activate</b>. See{" "}
        <a href="/docs/forms-notifications-and-apps#email-app">connecting an email app</a>.
      </P>

      <H2 id="create">Create a campaign</H2>
      <Ul>
        <Li>
          <b>Email</b>: add a subject and message. Write <Code>{"{{name}}"}</Code>{" "}
          to use each person&apos;s name, which becomes &quot;there&quot; when a name is
          missing. You can add one button.
        </Li>
        <Li>
          <b>Postal address</b>: your business address appears in the footer,
          because many email laws ask for it on marketing emails.
        </Li>
        <Li>
          <b>Audience</b>: pick forms that collect an email address, add your
          own contacts, or both. You can add up to 5,000 contacts by pasting
          them or uploading a CSV, one per line as <Code>email, name</Code>.
        </Li>
      </Ul>

      <H2 id="send">Test and send</H2>
      <P>
        The preview updates as you write, and <b>Send test</b> emails you a
        copy. <b>Review and send</b> shows how many people it will reach. You
        must confirm they agreed to get emails from you before it sends.
      </P>
      <P>
        Emails go out in batches every few minutes, and the report updates as
        they go. Press <b>Pause</b> at any time, and <b>Resume</b> to continue.
        If your provider refuses a whole batch, for example because of a wrong
        key or an unverified domain, the campaign pauses and shows why.
      </P>
      <Callout variant="warn">
        Only email people who agreed to hear from you. Sending to people who
        didn&apos;t can get your provider account suspended and harm your
        domain&apos;s reputation.
      </Callout>

      <H2 id="unsubscribes">Unsubscribes and bounces</H2>
      <P>
        Every email has an unsubscribe link, and anyone who uses it is left out
        of your future campaigns in this workspace. With Resend, you can also
        stop emailing addresses that bounce or report spam. Open Resend in{" "}
        <b>Apps</b>, add the webhook address shown there in Resend for the{" "}
        <Code>email.bounced</Code> and <Code>email.complained</Code> events, and
        paste its signing secret. Brevo and Custom SMTP don&apos;t report bounces
        to Quantalog.
      </P>

      <H2 id="limits">Limits</H2>
      <Ul>
        <Li>
          <b>Free</b>: 200 campaign emails a month
        </Li>
        <Li>
          <b>Starter</b>: 5,000 campaign emails a month
        </Li>
        <Li>
          <b>Pro</b>: 25,000 campaign emails a month
        </Li>
      </Ul>
      <P>
        A campaign that would go over your allowance can&apos;t be sent. Your email
        provider&apos;s own sending limits also apply.
      </P>
    </>
  );
}

export const quantalogCampaigns: Doc = {
  slug: "quantalog-campaigns",
  title: "Quantalog Campaigns",
  description: "Email the people who answered your forms, or your own list, through your connected email provider.",
  category: "Tracking",
  order: 13.46,
  Body,
};
