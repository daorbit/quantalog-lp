import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code, A, Pre } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Quantalog connects to <b>Claude</b> and <b>ChatGPT</b>, so you can ask
        about your forms, leads, bookings and website traffic in plain language
        — &quot;how many leads came in from the pricing form this week?&quot; —
        and get an answer from your own data instead of a link to a dashboard.
      </P>
      <P>
        The connection is <b>read-only</b> and covers <b>one workspace</b>. The
        assistant can look things up; it cannot create, change or delete
        anything in Quantalog.
      </P>

      <H2 id="connector-url">The connector URL</H2>
      <P>
        Both assistants use the same address. You can also copy it from{" "}
        <b>Apps → Claude</b> or <b>Apps → ChatGPT</b> in the dashboard.
      </P>
      <Pre label="Connector URL">{"https://quantalog-be.daorbit.in/mcp"}</Pre>
      <P>
        It speaks the open <A href="https://modelcontextprotocol.io">Model Context Protocol</A>{" "}
        (MCP), which is how both assistants talk to outside apps.
      </P>

      <H2 id="claude">Connect Claude</H2>
      <Ul>
        <Li>
          In Claude, open <b>Settings → Connectors</b>.
        </Li>
        <Li>
          Choose <b>Add custom connector</b>, name it <Code>Quantalog</Code> and
          paste the connector URL.
        </Li>
        <Li>
          Click <b>Connect</b>. A Quantalog page opens: sign in, pick the
          workspace and click <b>Allow access</b>.
        </Li>
        <Li>You land back in Claude, connected. Ask away.</Li>
      </Ul>
      <P>
        This works in Claude on the web, the desktop app and mobile. On Team and
        Enterprise plans an owner may need to add the connector for the
        organisation first.
      </P>

      <H2 id="chatgpt">Connect ChatGPT</H2>
      <Ul>
        <Li>
          In ChatGPT, open <b>Settings → Apps &amp; Connectors → Advanced</b>{" "}
          and turn on <b>Developer mode</b>.
        </Li>
        <Li>
          Back in <b>Apps &amp; Connectors</b>, choose <b>Create</b>, name it{" "}
          <Code>Quantalog</Code>, paste the connector URL and choose{" "}
          <b>OAuth</b> for authentication.
        </Li>
        <Li>
          Click <b>Connect</b>, sign in to Quantalog, pick the workspace and
          click <b>Allow access</b>.
        </Li>
        <Li>
          In a new chat, add Quantalog from the <b>+</b> menu and ask your
          question.
        </Li>
      </Ul>
      <Callout>
        Custom connectors need a ChatGPT plan that includes developer mode — Plus,
        Pro, Business or Enterprise. ChatGPT renames these menus from time to
        time; if a label differs, look for <b>Connectors</b> or <b>Apps</b> in
        Settings.
      </Callout>

      <H2 id="what-it-can-read">What the assistant can read</H2>
      <P>
        The consent screen lists exactly what you are granting. Everything is
        limited to the workspace you picked there.
      </P>
      <Ul>
        <Li>
          <b>Workspace</b> — its name, your role and the sites it tracks.
        </Li>
        <Li>
          <b>Forms</b> — each form&apos;s status, questions, views, responses and
          completion rate.
        </Li>
        <Li>
          <b>Responses and leads</b> — answers labelled by question, pipeline
          stage, lead score, tags and traffic source, plus a pipeline summary.
          Uploaded files and signatures are noted, never sent.
        </Li>
        <Li>
          <b>Bookings</b> — how many slots were booked and the upcoming times. No
          attendee details.
        </Li>
        <Li>
          <b>Website analytics</b> — visitors, pageviews, sessions, bounce rate,
          top pages, referrers, countries and devices. Your plan&apos;s date
          ranges still apply.
        </Li>
      </Ul>
      <P>
        Results come back a page at a time — at most 25 responses or forms per
        request — so the assistant asks for more only when it needs them.
      </P>

      <H2 id="try-asking">Things to ask</H2>
      <Ul>
        <Li>Which of my forms got the most responses this month?</Li>
        <Li>Show my 10 newest leads from the contact form.</Li>
        <Li>How many leads are still in the &quot;new&quot; stage?</Li>
        <Li>How many bookings are coming up this week?</Li>
        <Li>Summarise my website traffic for the last 7 days and compare it with the week before.</Li>
      </Ul>

      <H2 id="security">Security and privacy</H2>
      <Ul>
        <Li>
          <b>Your login stays with Quantalog.</b> You sign in on a Quantalog
          page; the assistant never sees your password, and your 2FA still
          applies.
        </Li>
        <Li>
          <b>Short-lived, revocable access.</b> The assistant gets a token that
          lasts an hour and is renewed only while the connection is active.
          Tokens are stored as one-way hashes.
        </Li>
        <Li>
          <b>Roles are checked on every request.</b> If you are removed from the
          workspace, the connection stops working immediately — it does not wait
          for a token to expire.
        </Li>
        <Li>
          <b>Visible in the audit log.</b> Connecting and disconnecting an AI app
          both appear in the workspace&apos;s audit log.
        </Li>
        <Li>
          <b>Rate limited.</b> Each connection can make up to 60 requests a
          minute.
        </Li>
      </Ul>
      <P>
        What the assistant does with the answers is governed by that
        assistant&apos;s own privacy terms — Anthropic&apos;s for Claude and
        OpenAI&apos;s for ChatGPT.
      </P>

      <H2 id="disconnect">Disconnecting</H2>
      <P>
        In the dashboard, open <b>Apps</b>, choose <b>Claude</b> or{" "}
        <b>ChatGPT</b>, and click <b>Disconnect</b> next to the connection. Access
        ends at once. Removing the connector inside Claude or ChatGPT also stops
        it on their side.
      </P>

      <H2 id="troubleshooting">Troubleshooting</H2>
      <H3 id="link-expired">&quot;This link has expired&quot;</H3>
      <P>
        The Quantalog sign-in page is valid for 10 minutes and works once. Start
        the connection again from Claude or ChatGPT.
      </P>
      <H3 id="not-available">&quot;Use your own account&quot;</H3>
      <P>
        Assistants can&apos;t be connected from the live demo or while support
        is viewing your account. Sign in as yourself.
      </P>
      <H3 id="no-data">The assistant says it found nothing</H3>
      <P>
        Check it is connected to the workspace you meant — the consent screen
        and <b>Apps → Claude</b> or <b>Apps → ChatGPT</b> both name it. To switch
        workspace, disconnect and connect again.
      </P>
      <H3 id="rate-limited">&quot;Rate limit reached&quot;</H3>
      <P>Wait a minute and ask again.</P>
    </>
  );
}

export const aiAssistants: Doc = {
  slug: "ai-assistants",
  title: "Claude & ChatGPT",
  description:
    "Connect Claude or ChatGPT to a workspace and ask about your forms, leads, bookings and traffic in plain language. Read-only and revocable.",
  category: "Getting started",
  order: 7,
  Body,
};
