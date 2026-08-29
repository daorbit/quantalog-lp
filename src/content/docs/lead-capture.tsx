import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Callout, Code } from "@/components/prose";

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
      </Ul>
      <P>
        Any field can be shown conditionally: under <b>Show this field only if</b>,
        pick another field and a condition. A hidden field is never required and
        its answer is never submitted, so a branch nobody took leaves nothing
        behind.
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
        completion-rate figures.
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

      <H2 id="drafts">Drafts and abandoned responses</H2>
      <P>
        A respondent&apos;s answers are saved in their own browser as they type,
        so a stray refresh or a closed tab doesn&apos;t cost them a
        half-finished application. The draft never leaves their device and is
        cleared the moment they submit.
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
    "Build forms, embed them anywhere, and take payments through your own Razorpay account — with responses landing beside the analytics that produced them.",
  category: "Tracking",
  order: 17,
  Body,
};
