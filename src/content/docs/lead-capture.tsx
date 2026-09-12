import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code, Pre } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        Lead capture is a form builder inside Quantalog. You drag fields onto a
        canvas, publish, and share a link or embed the form on your own site.
        Responses land in Quantalog next to the analytics for the traffic that
        produced them — which is the point: a form on a separate service tells
        you someone filled it in, but not what brought them.
      </P>

      <H2 id="building">Building a form</H2>
      <P>
        Open <b>Lead capture</b> in the sidebar and choose <b>New form</b>.
        The palette on the left holds every field type; drag one onto the canvas
        and click it to open its settings.
      </P>
      <Ul>
        <Li>
          <b>Basic info</b> — name, address, phone, email, website. These carry
          their own validation, so an email field rejects a typo without you
          writing a rule.
        </Li>
        <Li>
          <b>Choices</b> — dropdown, radio, checkbox, multiple choice, country,
          ranking.
        </Li>
        <Li>
          <b>Uploads</b> — files, images, audio and video. Stored for you, not
          just captured as a filename.
        </Li>
        <Li>
          <b>Legal and consent</b> — terms boxes, decision boxes, yes/no, and a
          signature pad.
        </Li>
        <Li>
          <b>Payment</b> — collects money as part of the submission. See{" "}
          <a href="#payments">Taking payments</a> below.
        </Li>
        <Li>
          <b>Page elements</b> — headings, rich text, dividers, and page breaks
          that split a long form into steps.
        </Li>
        <Li>
          <b>Repeating groups, calculated fields, a matrix and rating
          scales</b> — covered on their own in{" "}
          <a href="/docs/forms-advanced-fields">Advanced field types</a>.
        </Li>
      </Ul>
      <P>
        Any field can be shown conditionally: under <b>Show this field only if</b>,
        pick another field and a condition. A hidden field is never required and
        its answer is never submitted, so a branch nobody took leaves nothing
        behind.
      </P>
      <P>
        Rather than build every field yourself, describe the form to Orbit
        and it drafts one — fields, wording and a starting theme — which you
        can then revise the same way. See{" "}
        <a href="/docs/forms-ai-and-theming">AI building &amp; theming</a>.
      </P>

      <H2 id="payments">Taking payments</H2>
      <P>
        A payment field turns a form into something that collects money.
        Registration fees, deposits, paid applications, donations — the
        respondent fills the form, pays, and the response is recorded once the
        payment clears.
      </P>
      <P>
        Payments run through <b>Razorpay</b>, using your own Razorpay account.
        The money goes directly to you; it does not pass through Quantalog, and
        we take no cut of it beyond your normal plan.
      </P>

      <H3 id="connecting">Connecting Razorpay</H3>
      <P>
        In the form builder, open <b>Payments</b> from the icon rail on the
        right. The panel walks through three steps, and all three are needed
        before a form can charge anyone.
      </P>
      <Ul>
        <Li>
          <b>API keys</b> — your Key ID and Key Secret, from Settings → API Keys
          in the Razorpay dashboard. Test and live keys are stored separately,
          so trying a form in test mode doesn&apos;t mean re-pasting your live
          credentials afterwards. <b>Test connection</b> checks them against
          Razorpay there and then rather than leaving you to find out at the
          first real payment.
        </Li>
        <Li>
          <b>Webhook</b> — copy the URL shown and add it in Razorpay under
          Settings → Webhooks, subscribed to <Code>payment.captured</Code> and{" "}
          <Code>payment.failed</Code>. Paste the webhook secret back into the
          panel.
        </Li>
        <Li>
          <b>Go live</b> — switch from test to live mode and turn payments on.
        </Li>
      </Ul>
      <P>
        The connection belongs to the workspace, not to one form. Set it up once
        and every paid form in that workspace uses it — including the webhook,
        which is a single URL you register once rather than one per form.
      </P>
      <Callout>
        The webhook is not optional. It is how Razorpay tells us a payment
        succeeded, and it is what marks a response complete. Without it a
        respondent can pay and their response will sit unconfirmed, with no
        confirmation email sent — so the setup panel treats a missing webhook
        secret as an outstanding step rather than a nicety.
      </Callout>

      <H3 id="pricing">Setting the price</H3>
      <P>
        Click the payment field to choose how much it charges. There are three
        ways:
      </P>
      <Ul>
        <Li>
          <b>Fixed</b> — everyone pays the same amount.
        </Li>
        <Li>
          <b>From a field</b> — the price comes from another answer. Point it at
          a number field and the respondent&apos;s figure is the price; point it
          at a dropdown or checkbox and you set a price against each option.
          Where several options can be ticked, the charge is their total.
        </Li>
        <Li>
          <b>Respondent decides</b> — they name their own amount, within a
          minimum and an optional maximum. This is the one for donations and
          pay-what-you-want.
        </Li>
      </Ul>
      <P>
        A form takes one payment field. The builder refuses a second, because
        two would mean one of them silently never charging.
      </P>
      <Callout>
        Whatever the mode, the amount is worked out on our servers from the form
        you built — never from what the browser sends. Editing the page to
        change the price does nothing: the charge is recalculated from your
        settings before the payment is created.
      </Callout>

      <H3 id="paying">What the respondent sees</H3>
      <P>
        The payment field shows what they will be charged before they submit.
        Pressing submit opens Razorpay&apos;s own payment window — card, UPI,
        netbanking, whatever your account accepts. When it clears, they see your
        thank-you page.
      </P>
      <P>
        Cancelling the payment window costs them nothing and loses nothing:
        their answers are still there and they can try again. A response is only
        recorded once the money actually arrives, so an abandoned checkout never
        becomes a lead you have to sift out later.
      </P>

      <H3 id="responses">Payments in your responses</H3>
      <P>
        Paid responses appear in <b>Entries</b> with a payment column showing the
        amount and a <b>Paid</b> badge. Clicking it opens the transaction detail
        — payment ID, order ID, method, and the email and phone Razorpay
        collected — each copyable, for reconciling against your Razorpay
        dashboard.
      </P>
      <P>
        Those contact details are captured even when your form never asked for
        them, so a one-field donation form still tells you who paid. Payment
        details are included in CSV and PDF exports, and in the confirmation and
        notification emails.
      </P>
      <Callout>
        Refunds are issued from your Razorpay dashboard, not from Quantalog. A
        response refunded there will still show as paid here.
      </Callout>

      <H2 id="multi-step">Multi-step forms</H2>
      <P>
        A <b>page break</b> splits a form into steps, with a progress indicator
        and validation before each one advances. Long applications work far
        better this way than as a single wall of fields.
      </P>
      <P>
        Payment is taken when the form is finally submitted, whichever step the
        payment field sits on — so it belongs on the last one. If it isn&apos;t,
        the builder says so rather than letting you publish a form that quotes a
        price several steps before it charges it.
      </P>

      <H2 id="sharing">Sharing and embedding</H2>
      <P>
        A published form has its own link, which anyone can open — no Quantalog
        account needed. <b>Share</b> gives you the link, a QR code, and embed
        snippets for plain HTML, React, and Vue. The embed resizes itself to fit
        its content rather than sitting in a fixed box with its own scrollbar.
      </P>
      <P>
        Every form records where its submissions came from, so the entries
        screen can break responses down by referring site alongside the view and
        completion-rate figures. For triaging what comes in, and for letting
        a respondent edit what they already sent, see{" "}
        <a href="/docs/forms-entries-and-links">Entries, resume &amp; edit
        links</a>.
      </P>

      <H2 id="notifications">Notification emails</H2>
      <P>
        A form can email the respondent a confirmation and alert you on every
        submission. Both are written in the builder, and{" "}
        <Code>{"{{Field Label}}"}</Code> in either one is replaced with that
        field&apos;s answer.
      </P>
      <P>
        On a paid form, nothing is sent until the payment clears — a confirmation
        for a payment that failed would be worse than no confirmation at all.
      </P>

      <H2 id="webhook">Sending submissions to a webhook</H2>
      <P>
        A form can POST every submission to a URL you supply. Open{" "}
        <b>Integrations</b> on the icon rail and connect <b>Webhook</b>{" "}
        from the Automation section, alongside your email and payment apps
        — it opens the same way any of those do. Unlike those, though, it
        belongs to the one form you had open when you connected it, not the
        whole workspace: a different form's submissions go nowhere until you
        connect a webhook on that one too.
      </P>
      <P>
        This is deliberately generic rather than a list of named
        integrations: point it at a Zapier or Make webhook trigger and you
        can reach Slack, Google Sheets, Airtable, Notion or a CRM without
        waiting on us to build a connector for each one, or point it at your
        own server and handle the submission however you like.
      </P>
      <Ul>
        <Li>
          <b>URL</b> — where the POST goes. Any endpoint that accepts JSON
          works, including a Zapier "Catch Hook" trigger.
        </Li>
        <Li>
          <b>Signing secret</b> — optional, but worth setting if the endpoint
          is your own server rather than Zapier or Make. Every delivery
          carries an <Code>X-Da-Forms-Signature</Code> header: an HMAC-SHA256
          of the request body, keyed with this secret. Recompute it on
          receipt and compare before trusting the payload — otherwise anyone
          who finds the URL can post to it.
        </Li>
      </Ul>
      <P>Each delivery is a single POST shaped like this:</P>
      <Pre label="POST body">{`{
  "formId": "…",
  "submissionId": "…",
  "submittedAt": "2026-09-12T10:15:00.000Z",
  "data": { "Name": "Ada Lovelace", "Email": "ada@example.com" },
  "payment": { "amount": 50000, "currency": "INR", "status": "paid" }
}`}</Pre>
      <P>
        <Code>data</Code> keys are field labels, matching the CSV export and
        the notification emails. <Code>payment</Code> is present only on a
        paid form, and only once the payment has actually cleared — the same
        rule the notification emails and the Entries table follow.
      </P>
      <Callout>
        Delivery is fire-and-forget: it never delays or blocks the
        respondent&apos;s submit, and a slow or unreachable endpoint never
        fails their submission. There is no retry queue behind it — the
        settings panel shows the outcome of the most recent attempt, which is
        enough to notice an endpoint that has gone stale, but treat it as a
        live notification rather than a guaranteed-delivery log.
      </Callout>

      <H2 id="drafts">Drafts and abandoned responses</H2>
      <P>
        A respondent&apos;s answers are saved in their own browser as they type,
        so a stray refresh or a closed tab doesn&apos;t cost them a
        half-finished application. The draft never leaves their device and is
        cleared the moment they submit. Turning on <b>collect partial
        responses</b> saves the same draft to your workspace too, which is
        what lets a respondent email themselves a link back to it — see{" "}
        <a href="/docs/forms-entries-and-links">Entries, resume &amp; edit
        links</a>.
      </P>
      <P>
        Files uploaded to a form that was never submitted are swept away
        automatically, as are checkouts that were opened and abandoned. Neither
        shows up in your responses.
      </P>

      <Callout>
        How many forms you can build, and how many responses you can collect
        each month, depends on your plan. Notification emails and file uploads
        are paid features.
      </Callout>
    </>
  );
}

export const leadCapture: Doc = {
  slug: "lead-capture",
  title: "Lead capture",
  description:
    "Build forms, embed them anywhere, take payments through your own Razorpay account, and send every submission to a webhook — with responses landing beside the analytics that produced them.",
  category: "Tracking",
  order: 17,
  Body,
};
