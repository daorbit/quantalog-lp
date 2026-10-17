import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Connect Google Sheets once and every form in your workspace sends its
        responses to a spreadsheet: one sheet per form, created for you, with a
        new row for every response. It is the easiest way to share leads with
        a team, build charts, or pull responses into other tools.
      </P>

      <H2 id="connect">Connect Google Sheets</H2>
      <ol>
        <li>
          In Quantalog, open <b>Apps</b> and find{" "}
          <b>Google Sheets</b> (search &quot;sheets&quot; or pick{" "}
          <b>Automation</b> in the category filter).
        </li>
        <li>
          Choose <b>Connect</b> on the Google Sheets card, then <b>Continue to Google</b>.
          A Google window opens.
        </li>
        <li>
          Pick the Google account the spreadsheets should live in and allow
          access. The window closes by itself and the card shows{" "}
          <b>Connected</b> with that account&apos;s email.
        </li>
      </ol>
      <Callout variant="tip">
        If nothing happens when you press Continue, your browser blocked the
        pop-up. Allow pop-ups for Quantalog and try again.
      </Callout>

      <H2 id="how-it-works">What happens next</H2>
      <Ul>
        <Li>
          The <b>first response</b> to a form after you connect creates a
          spreadsheet in that Google account&apos;s Drive, named{" "}
          <Code>{"<form title> — responses"}</Code>, with one tab called{" "}
          <b>Responses</b>.
        </Li>
        <Li>
          Every response after that is added as a <b>new row</b> within a
          second or two of being submitted.
        </Li>
        <Li>
          The first column is <b>Submitted at</b> (UTC time), then one column
          per question in form order, then <b>Response ID</b>, which matches
          the response in Entries.
        </Li>
        <Li>
          Add a question to the form and it becomes a <b>new column</b> at the
          right on the next response. Renaming a question renames its column
          header. Removing one keeps its column, so earlier rows keep their
          answers.
        </Li>
        <Li>
          Answers are written exactly as given — a phone number like{" "}
          <Code>+91 98765 43210</Code> stays as text and an answer starting
          with <Code>=</Code> is never run as a formula.
        </Li>
      </Ul>

      <H2 id="find">Finding your sheets</H2>
      <P>
        Open <b>Google Sheets</b> in Apps. <b>Your
        spreadsheets</b> lists each form with its row count, when the last row
        was added, and an <b>Open</b> button. You can also find them in Google
        Drive under the connected account.
      </P>
      <P>
        You can share, rename, chart or add tabs to a sheet as you like. Keep
        the <b>Responses</b> tab and its header row, since new rows are added
        there.
      </P>

      <H2 id="which-responses">Which responses are added</H2>
      <Ul>
        <Li>Every completed response from every form in the workspace.</Li>
        <Li>
          On <b>paid forms</b>, a row is added only once the payment clears,
          with the amount in the payment column.
        </Li>
        <Li>
          <b>Booking</b> answers show the date, time and Google Meet link.
        </Li>
        <Li>
          Responses from <b>before</b> you connected are not copied in. Use{" "}
          <b>Export CSV</b> in Entries for those.
        </Li>
      </Ul>

      <H2 id="permissions">What Quantalog can see</H2>
      <P>
        Google asks you to allow access to{" "}
        <b>&quot;only the Google Drive files you use with this app&quot;</b>.
        Quantalog can open and edit only the spreadsheets it created for you —
        never your other files, folders or sheets. Tokens are encrypted on our
        servers.
      </P>

      <H2 id="manage">Switching account or disconnecting</H2>
      <Ul>
        <Li>
          <b>Switch account</b> connects a different Google account. Forms then
          start fresh spreadsheets in the new account; the old sheets stay in
          the old account&apos;s Drive.
        </Li>
        <Li>
          <b>Disconnect</b> stops new rows straight away and removes
          Quantalog&apos;s access. Your existing spreadsheets are not deleted.
        </Li>
      </Ul>

      <H3 id="troubleshooting">Troubleshooting</H3>
      <Ul>
        <Li>
          <b>Access expired</b> on the card — Google stopped accepting the
          connection, usually because access was removed in your Google
          Account. Press <b>Reconnect Google</b>.
        </Li>
        <Li>
          <b>You deleted a sheet</b> — the next response creates a new one for
          that form automatically.
        </Li>
        <Li>
          <b>&quot;The last response could not be added&quot;</b> appears in the
          Google Sheets page with Google&apos;s reason. It clears by itself on
          the next successful row.
        </Li>
      </Ul>

      <Callout>
        Google Sheets is available on every plan and is managed by workspace
        editors and above. The connection belongs to the workspace, so every
        form in it uses the same Google account.
      </Callout>
    </>
  );
}

export const formsGoogleSheets: Doc = {
  slug: "forms-google-sheets",
  title: "Forms: Google Sheets",
  description:
    "Connect Google Sheets once and get a spreadsheet per form, with a new row for every response.",
  category: "Tracking",
  order: 17.36,
  Body,
};
