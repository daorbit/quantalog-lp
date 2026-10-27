import type { Doc } from "@/lib/docs";
import { H2, H3, P, Ul, Li, Code, Callout } from "@/components/prose";

function Body() {
  return (
    <>
      <P>
        <b>Quantalog Invoicing</b> lets you send quotations and invoices to the
        people your forms and campaigns bring in, without a separate billing
        tool. Your business details are filled in for you, an accepted
        quotation becomes an invoice in one click, and the Invoices page shows
        what has been paid and what is still due. It is an official Quantalog
        app: free, available in every workspace, and off until a workspace
        admin turns it on.
      </P>

      <H2 id="basics">Quotations and invoices</H2>
      <P>
        Invoicing works with two kinds of document. They look alike, but they
        mean different things to your client.
      </P>
      <H3 id="what-is-a-quotation">What a quotation is</H3>
      <P>
        A <b>quotation</b> (also called a quote or an estimate) is a price you
        offer <i>before</i> any work is agreed. It says what you would do, what
        it would cost and how long the offer stands. The client can accept it,
        reject it or let it run out. Nothing is owed yet.
      </P>
      <H3 id="what-is-an-invoice">What an invoice is</H3>
      <P>
        An <b>invoice</b> is a request for payment <i>after</i> a sale is agreed
        or the work is done. It says what the client owes, by when, and how
        much has already been paid. In most countries, India included, it is
        also the record your accountant and the tax office rely on, which is why
        every invoice gets its own number that is never reused.
      </P>
      <H3 id="flow">How they fit together</H3>
      <Ul>
        <Li>
          A lead fills in your form. You send them a <b>quotation</b>.
        </Li>
        <Li>
          They say yes. You mark the quotation <b>Accepted</b> and{" "}
          <b>convert it to an invoice</b>. Every line, price and tax rate is
          copied, so nothing is typed twice.
        </Li>
        <Li>
          They pay. You mark the invoice <b>Paid</b>, and it moves from{" "}
          <b>Outstanding</b> to <b>Paid</b> on the Invoices page.
        </Li>
      </Ul>
      <Callout variant="tip">
        You don&apos;t have to start with a quotation. If the price is already
        agreed, create an invoice straight away.
      </Callout>

      <H2 id="roles">Who can do what</H2>
      <Ul>
        <Li>
          <b>Owners and admins</b> turn the app on and off, and edit the
          business details in Apps.
        </Li>
        <Li>
          <b>Owners, admins and editors</b> open Invoices and create, edit,
          duplicate, convert and delete quotations and invoices.
        </Li>
        <Li>
          <b>Viewers</b> can&apos;t open Invoices. Invoices hold prices and
          client details, so they need at least the editor role.
        </Li>
      </Ul>
      <P>
        Roles are set in <b>Members</b>. Everything is shared across the
        workspace: an invoice one editor creates is visible to every other
        editor.
      </P>

      <H2 id="enable">Turning Invoicing on</H2>
      <Ul>
        <Li>
          Open <b>Apps</b>. The <b>Quantalog apps</b> group is at the top.
        </Li>
        <Li>
          Find <b>Quantalog Invoicing</b> and open it, then press{" "}
          <b>Enable Invoices</b>.
        </Li>
        <Li>
          The panel changes to the <b>business details</b> form described
          below. Fill it in and press <b>Save details</b>.
        </Li>
        <Li>
          Press <b>Open Invoices</b>, or use <b>Invoices</b> in the sidebar,
          under <b>Quantalog apps</b>.
        </Li>
      </Ul>
      <P>
        You can also open <Code>/app/invoices</Code> directly. While the app is
        off, that page explains what it does and shows the enable button to
        admins. Each workspace turns Invoicing on for itself.
      </P>
      <Callout>
        You can open Invoices before saving your business details, but every
        new document will have an empty <b>From</b> block until you do. The
        Invoices page shows an <b>Add your business details</b> reminder until
        they are saved.
      </Callout>

      <H2 id="business-details">Business details</H2>
      <P>
        Business details are the information about <i>you</i> that appears on
        every quotation and invoice. They live in{" "}
        <b>Apps → Quantalog Invoicing</b>, and the <b>Business details</b>{" "}
        button on the Invoices page and in the editor takes you there. Changes
        apply to documents you create from then on. Documents you have already
        created keep the details they were made with, because a sent invoice
        must not change after the fact.
      </P>
      <P>
        Edit any field and the line at the bottom of the form turns to{" "}
        <b>You have unsaved changes</b>. Press <b>Save details</b> to keep them,
        or <b>Discard</b> to go back. If you close the panel or press{" "}
        <b>Open Invoices</b> with unsaved changes, Quantalog asks before
        throwing them away.
      </P>

      <H3 id="your-business">Your business</H3>
      <Ul>
        <Li>
          <b>Business name</b> (required): your registered or trading name. It
          is the large name at the top of every document, so use the name your
          clients know you by and that appears on your bank account.
        </Li>
        <Li>
          <b>Billing email</b> (required): the address clients write to about a
          bill. It is printed on every document, so use an inbox someone
          actually reads, such as <Code>billing@yourcompany.com</Code>.
        </Li>
        <Li>
          <b>Phone</b>: optional, printed next to the email.
        </Li>
        <Li>
          <b>Address</b> (required): your business address, on as many lines as
          you need. Invoices in most countries must show the seller&apos;s
          address, which is why it is required.
        </Li>
        <Li>
          <b>GSTIN</b>: your 15-character Goods and Services Tax number, for
          businesses registered for GST in India. When filled in, it is printed
          under your address and the invoice heading changes from{" "}
          <b>Invoice</b> to <b>Tax invoice</b>, as a GST invoice must say. Leave
          it blank if you are not registered or not in India. Quantalog checks
          the format and refuses a number that can&apos;t be a valid GSTIN.
        </Li>
        <Li>
          <b>Website</b>: optional, printed with your contact details.
        </Li>
      </Ul>

      <H3 id="logo-and-style">Logo and style</H3>
      <Ul>
        <Li>
          <b>Logo</b>: your logo, printed at the top left of every new document
          and shown in the preview.
          Upload a PNG, JPG or SVG up to 300 KB. A wide logo on a transparent
          background looks best. <b>Remove</b> takes it off new documents.
        </Li>
        <Li>
          <b>Template</b>: the layout new documents start with.{" "}
          <b>Standard</b> puts a large title and the balance due at the top
          right with a coloured table header; <b>Spreadsheet</b> lays
          everything out in a neat bordered grid, which suits long item lists;{" "}
          <b>Minimalist</b> uses large light type and plenty of white space with
          colour only on the amount due; and <b>Grand</b> opens with a bold
          colour header showing the amount due, followed by a client card.
        </Li>
        <Li>
          <b>Colour</b>: the accent used for headings, table lines and the
          total. Pick from blue, indigo, teal, emerald, amber, crimson and
          slate. Choose the one closest to your brand.
        </Li>
      </Ul>
      <P>
        Every document can still switch template and colour on its own, in the{" "}
        <b>Design</b> panel of its preview.
      </P>

      <H3 id="numbers-and-payment">Numbers and payment terms</H3>
      <Ul>
        <Li>
          <b>Currency</b>: the currency new documents start in. Choose from
          Indian rupee, US dollar, euro, British pound, UAE dirham, Australian
          dollar, Canadian dollar and Singapore dollar. You can still change the
          currency on a single document, for a client abroad for example.
        </Li>
        <Li>
          <b>Payment due</b>: how many days a client has to pay, from 0 to 365.
          A new invoice&apos;s <b>Due date</b> is set to today plus this many
          days, and a new quotation&apos;s <b>Valid until</b> date is set the
          same way. <Code>0</Code> means due on the day of the invoice.
        </Li>
        <Li>
          <b>Invoice numbers</b>: the prefix in front of every invoice number.
          With <Code>INV</Code>, invoices are numbered <Code>INV-0001</Code>,{" "}
          <Code>INV-0002</Code> and so on. The hint under the label shows what
          the next number looks like. Use letters, numbers and dashes, up to 10
          characters, for example <Code>ACME</Code> or <Code>INV-25</Code>.
        </Li>
        <Li>
          <b>Quotation numbers</b>: the same for quotations, <Code>QUO</Code> by
          default.
        </Li>
      </Ul>
      <Callout variant="tip">
        Changing a prefix only affects numbers given out from then on. The count
        carries on, so after <Code>INV-0007</Code> a new prefix of{" "}
        <Code>ACME</Code> gives <Code>ACME-0008</Code>. Numbers that were
        already given out never change.
      </Callout>

      <H3 id="payment-details">Payment details</H3>
      <P>
        Where clients should send the money. They are printed in a{" "}
        <b>Payment details</b> box on every invoice (not on quotations), so
        clients don&apos;t have to write back and ask. All of them are optional.
      </P>
      <Ul>
        <Li>
          <b>Bank name</b>: the bank that holds your business account.
        </Li>
        <Li>
          <b>Account name</b>: the name on the account, exactly as the bank
          has it. Transfers to a different name can bounce.
        </Li>
        <Li>
          <b>Account number</b>: 6 to 34 letters and digits, with no spaces.
        </Li>
        <Li>
          <b>IFSC</b>: the 11-character code of your branch, such as{" "}
          <Code>HDFC0001234</Code>, needed for NEFT, RTGS and IMPS transfers in
          India.
        </Li>
        <Li>
          <b>UPI ID</b>: your business UPI address, such as{" "}
          <Code>acme@okhdfcbank</Code>. On invoices in Indian rupees it adds a{" "}
          <b>scan-to-pay QR code</b> for the amount due, so a client can pay
          from any UPI app in seconds. The QR code carries the invoice number
          as the payment note, which makes the payment easy to match.
        </Li>
      </Ul>
      <Callout>
        Like your other details, payment details are copied onto each document
        when it is created. If you change bank accounts, documents you already
        sent keep the old details.
      </Callout>

      <H3 id="defaults">Defaults</H3>
      <Ul>
        <Li>
          <b>Notes</b>: a short message added to every new document, such as
          &quot;Thank you for your business&quot; or your bank details for
          transfers.
        </Li>
        <Li>
          <b>Terms</b>: your standard conditions, such as &quot;Payment due
          within 30 days&quot; or your late fee. On invoices this fills{" "}
          <b>Terms</b>; on quotations it fills <b>Payment terms</b>.
        </Li>
      </Ul>
      <P>Both can be changed on each document before you send it.</P>

      <H2 id="invoices-page">The Invoices page</H2>
      <H3 id="summary">Summary</H3>
      <P>The strip at the top adds up every invoice in the workspace:</P>
      <Ul>
        <Li>
          <b>Paid</b>: the total of every invoice marked <b>Paid</b>, with how
          many there are.
        </Li>
        <Li>
          <b>Outstanding</b>: the total of every invoice that is not paid or
          cancelled, which is what you are still waiting for. Drafts count
          here too, so mark an invoice <b>Cancelled</b> if it will never be
          sent.
        </Li>
        <Li>
          <b>Invoices</b>: how many invoices exist, and how many were created in
          the last 30 days.
        </Li>
        <Li>
          <b>Open quotations</b>: quotations still in <b>Draft</b> or{" "}
          <b>Sent</b>, which are waiting for an answer, with how many were
          accepted.
        </Li>
      </Ul>
      <Callout>
        The amounts are shown in your default currency. If you bill in more
        than one currency, the summary adds the amounts together as they are,
        without converting them.
      </Callout>

      <H3 id="list">Finding a document</H3>
      <Ul>
        <Li>
          <b>Invoices</b> and <b>Quotations</b> switch between the two lists.
        </Li>
        <Li>
          The <b>status</b> menu shows only documents in one status, such as
          every <b>Overdue</b> invoice.
        </Li>
        <Li>
          <b>Search</b> finds a document by its number or the client&apos;s name.
        </Li>
        <Li>
          The refresh button reloads the list and the summary, for example
          after a teammate made changes.
        </Li>
      </Ul>
      <P>
        Each row shows the number, status, client, date, due date and total.
        Click a row to open it. The <b>⋯</b> menu on a row lets you{" "}
        <b>Open</b>, <b>Duplicate</b>, <b>Convert to invoice</b> (quotations
        only), <b>Mark as</b> a status, or <b>Delete</b>.
      </P>

      <H2 id="create">Creating a quotation or invoice</H2>
      <P>
        Press <b>New invoice</b> or <b>New quotation</b>. The editor walks you
        through five numbered steps, and each number turns into a tick once
        that step is filled in. The right side is a <b>live preview</b> of the
        finished document, updating as you type; the form and the preview
        scroll separately, so the document stays in view while you work. The
        button above the preview shows the current design (for example{" "}
        <b>Standard · Blue</b>) and opens the design screen. At the top,{" "}
        <b>Preview</b> opens the same screen, the download button saves a PDF,
        and <b>Create invoice</b> saves it.
      </P>
      <Ul>
        <Li>
          <b>1. Who is it for?</b> The client. Start typing a name and
          Quantalog suggests clients you have billed or quoted before; pick one
          and their email, phone, address and GSTIN fill in.
        </Li>
        <Li>
          <b>2. What are you billing for?</b> The items, with a running
          subtotal.
        </Li>
        <Li>
          <b>3. When is it due?</b> (or <b>How long does the price stand?</b>{" "}
          on quotations) Tap a payment term such as <b>On receipt</b>,{" "}
          <b>15 days</b> or <b>30 days</b> and the due date sets itself, or pick
          dates yourself. Open <b>Invoice number and PO number</b> (or{" "}
          <b>Quotation number and reference</b>) under the dates to set those.
        </Li>
        <Li>
          <b>4. Tax and discounts.</b> Tap a GST rate (0, 5, 12, 18 or 28%) on
          rupee documents, or type any rate, plus discount, shipping and any
          amount already paid.
        </Li>
        <Li>
          <b>5. Notes and terms.</b> Optional text for the bottom of the
          document.
        </Li>
      </Ul>
      <P>
        The <b>From</b> block on the document is your business details from
        Apps. Change them there; new documents pick up the change, and
        documents already saved keep their copy.
      </P>

      <H3 id="design">Preview and design</H3>
      <P>
        Press <b>Preview</b> at the top, or <b>Preview and design</b> in the
        summary card, to open the full-screen preview. It shows the document
        exactly as your client will see it, on a laptop or a phone (switch with
        the buttons at the top). The <b>Design</b> panel on the right is where
        you pick a <b>template</b> (Standard, Spreadsheet, Minimalist or Grand)
        and a{" "}
        <b>colour</b>; the document changes as you click. Close the preview and
        save to keep the design. <b>PDF</b> in the preview downloads the file.
        New documents start with the template and colour from your business
        details.
      </P>

      <H3 id="details">Details</H3>
      <Ul>
        <Li>
          <b>Invoice number</b> or <b>Quotation number</b>: leave it blank and
          the next number in your series is given out when you save, which is
          what most businesses want. You can type your own instead, for example
          to carry on numbering from an old tool. Each number can only be used
          once per workspace; if it is taken, saving tells you so.
        </Li>
        <Li>
          <b>PO number</b> (invoices): the purchase order number your client
          gave you. Many companies only pay invoices that quote it.
        </Li>
        <Li>
          <b>Reference</b> (quotations): your own reference, such as a project
          name or the client&apos;s enquiry number.
        </Li>
        <Li>
          <b>Date</b>: the date of the document. It starts as today.
        </Li>
        <Li>
          <b>Due date</b> (invoices): the last day the client should pay. It
          starts as today plus your <b>Payment due</b> days.
        </Li>
        <Li>
          <b>Valid until</b> (quotations): the last day the price stands. After
          it, you can mark the quotation <b>Expired</b>.
        </Li>
      </Ul>

      <H3 id="client">Bill to and Quote for</H3>
      <P>
        Who the document is for. <b>Name or company</b> is required to save;{" "}
        <b>Email</b>, <b>Phone</b>, <b>Address</b> and <b>GSTIN</b> are optional
        but printed when filled in. A GST invoice to a registered business must
        show the buyer&apos;s GSTIN, so fill it in for those clients.
      </P>

      <H3 id="items">Items</H3>
      <Ul>
        <Li>
          <b>Description</b>: what you are charging for, such as &quot;Website
          design, 5 pages&quot;.
        </Li>
        <Li>
          <b>Qty</b>: how many, such as hours, units or months.
        </Li>
        <Li>
          <b>Rate</b>: the price of one, before tax.
        </Li>
        <Li>
          <b>Amount</b>: worked out for you as quantity times rate.
        </Li>
      </Ul>
      <P>
        <b>Add item</b> adds a line and the <b>×</b> removes one. A document
        has at least one line and up to 200. Lines left completely empty are
        not printed.
      </P>

      <H3 id="pricing">Tax, discount and payment</H3>
      <Ul>
        <Li>
          <b>Currency</b>: the currency of this document. It starts as your
          default.
        </Li>
        <Li>
          <b>Tax</b>: one tax rate, as a percentage of the subtotal. For GST,
          enter the full rate, for example <Code>18</Code> for 9% CGST plus 9%
          SGST.
        </Li>
        <Li>
          <b>Discount</b>: either a percentage of the subtotal (<b>%</b>) or a
          fixed sum (<b>Amount</b>). Use the switch inside the field to choose.
        </Li>
        <Li>
          <b>Shipping</b>: delivery or other charges added after tax.
        </Li>
        <Li>
          <b>Amount paid</b> (invoices): any advance or part payment already
          received. The invoice then shows a <b>Balance due</b>.
        </Li>
      </Ul>
      <P>The totals under the fields are worked out like this:</P>
      <Ul>
        <Li>
          <b>Subtotal</b> = the sum of every line&apos;s amount
        </Li>
        <Li>
          <b>Tax</b> = subtotal × tax rate
        </Li>
        <Li>
          <b>Discount</b> = subtotal × discount %, or the fixed amount
        </Li>
        <Li>
          <b>Total</b> = subtotal + tax − discount + shipping
        </Li>
        <Li>
          <b>Balance due</b> = total − amount paid
        </Li>
      </Ul>
      <P>
        Quantalog works the totals out again on the server when you save, so
        the saved document always adds up.
      </P>

      <H3 id="notes-and-terms">Notes and terms</H3>
      <P>
        <b>Notes</b> and <b>Terms</b> (<b>Payment terms</b> on quotations) start
        with your defaults and can be changed for this document alone. They are
        printed at the bottom.
      </P>

      <H3 id="preview">What the finished document shows</H3>
      <Ul>
        <Li>
          <b>Header</b>: your logo, business name, address, GSTIN and contact
          details, with <b>Invoice</b>, <b>Tax invoice</b> or <b>Quotation</b>{" "}
          and the number on the right.
        </Li>
        <Li>
          <b>Client and dates</b>: who it is for, the date, the due date or
          valid-until date, and the PO number or reference.
        </Li>
        <Li>
          <b>Items</b>: numbered lines with quantity, rate and amount.
        </Li>
        <Li>
          <b>Amount due box</b>: the figure your client cares about most,
          shown large. On invoices it reads <b>Amount due</b>, or{" "}
          <b>Balance due</b> after a part payment, with the due date under it.
          On quotations it reads <b>Quote total</b> with the valid-until date.
        </Li>
        <Li>
          <b>Totals</b>: subtotal, discount, tax, shipping, total and any amount
          paid.
        </Li>
        <Li>
          <b>Amount in words</b>: the total written out, such as &quot;Rupees
          Twelve Thousand Five Hundred Only&quot;. Rupee amounts use lakh and
          crore.
        </Li>
        <Li>
          <b>Payment details</b> (invoices): your bank details and, for rupee
          invoices with a UPI ID, a QR code for the amount due.
        </Li>
        <Li>
          <b>Notes, terms and signature</b>: your notes and terms, and a{" "}
          <b>For your business / Authorised signatory</b> block to sign on a
          printed copy.
        </Li>
        <Li>
          <b>Stamp</b>: invoices marked <b>Paid</b> or <b>Cancelled</b> carry a
          faint stamp saying so, so nobody pays a paid invoice twice.
        </Li>
      </Ul>

      <H3 id="save">Saving and the PDF</H3>
      <Ul>
        <Li>
          <b>Create invoice</b> or <b>Create quotation</b> saves a new document
          and gives it its number. After that the button reads{" "}
          <b>Save changes</b> and is only active when something changed.
        </Li>
        <Li>
          <b>PDF</b> downloads the preview as an A4 PDF, named after the
          document number, ready to email or share. The PDF is made in your
          browser from exactly what the preview shows.
        </Li>
      </Ul>

      <H2 id="statuses">Statuses</H2>
      <P>
        A status tells you and your team where each document stands. You set it
        yourself, from the status button in the editor or <b>Mark as</b> in a
        row&apos;s menu, and it saves straight away.
      </P>
      <H3 id="invoice-statuses">Invoice statuses</H3>
      <Ul>
        <Li>
          <b>Draft</b>: still being prepared and not sent yet. Every new
          invoice starts here.
        </Li>
        <Li>
          <b>Sent</b>: you have sent it to the client and are waiting for
          payment.
        </Li>
        <Li>
          <b>Paid</b>: the money arrived. It counts towards <b>Paid</b> in the
          summary.
        </Li>
        <Li>
          <b>Overdue</b>: the due date has passed and it is still unpaid.
          Quantalog doesn&apos;t switch to this on its own yet, so mark it when
          you chase the payment.
        </Li>
        <Li>
          <b>Cancelled</b>: it will not be paid, for example it was raised by
          mistake. It leaves <b>Outstanding</b> but keeps its number, because
          an invoice number should never be reused.
        </Li>
      </Ul>
      <H3 id="quotation-statuses">Quotation statuses</H3>
      <Ul>
        <Li>
          <b>Draft</b>: still being prepared.
        </Li>
        <Li>
          <b>Sent</b>: waiting for the client&apos;s answer.
        </Li>
        <Li>
          <b>Accepted</b>: the client said yes. Converting a quotation marks it
          accepted for you.
        </Li>
        <Li>
          <b>Rejected</b>: the client said no.
        </Li>
        <Li>
          <b>Expired</b>: the <b>Valid until</b> date passed without an answer.
        </Li>
      </Ul>

      <H2 id="convert">Converting a quotation into an invoice</H2>
      <P>
        Open the <b>⋯</b> menu on a quotation and choose{" "}
        <b>Convert to invoice</b>. Quantalog creates a new invoice with:
      </P>
      <Ul>
        <Li>the next number in your invoice series;</Li>
        <Li>today as its date, and a due date 30 days later;</Li>
        <Li>
          the quotation&apos;s client, items, currency, tax, discount, shipping
          and notes;
        </Li>
        <Li>the quotation&apos;s payment terms as its terms.</Li>
      </Ul>
      <P>
        The quotation is marked <b>Accepted</b> and the new invoice opens so you
        can check it before sending. A quotation converts once: the option
        disappears from its menu afterwards, so a double click never makes two
        invoices.
      </P>

      <H2 id="duplicate">Duplicating and deleting</H2>
      <Ul>
        <Li>
          <b>Duplicate</b> makes a copy for repeat work, such as the same
          monthly retainer. The copy gets the next number in the series, starts
          as <b>Draft</b>, has its amount paid cleared, and opens straight away.
        </Li>
        <Li>
          <b>Delete</b> removes a document for everyone in the workspace, after
          you confirm. It can&apos;t be undone. For an invoice you already sent,
          mark it <b>Cancelled</b> instead, so your numbering has no gaps.
        </Li>
      </Ul>

      <H2 id="gst">GST invoices in India</H2>
      <P>Invoicing covers what most small GST-registered businesses need:</P>
      <Ul>
        <Li>the heading <b>Tax invoice</b> once your GSTIN is filled in;</Li>
        <Li>your GSTIN, and your client&apos;s when they are registered;</Li>
        <Li>a unique, sequential number for every invoice;</Li>
        <Li>the date, your client&apos;s name and address, and each item;</Li>
        <Li>the tax rate and tax amount, the total, and the amount in words;</Li>
        <Li>a signature block for the authorised signatory.</Li>
      </Ul>
      <Callout variant="warn">
        Separate CGST, SGST and IGST lines, place of supply, HSN or SAC codes
        per item, and e-invoicing (IRN) are not supported yet. Enter the combined GST rate in{" "}
        <b>Tax</b>, and check with your accountant if your business needs the
        full breakdown.
      </Callout>

      <H2 id="disable">Turning Invoicing off</H2>
      <P>
        In <b>Apps</b>, open <b>Quantalog Invoicing</b> and press{" "}
        <b>Turn off</b>. Invoices leaves the sidebar for everyone and the page
        can&apos;t be opened. Your quotations, invoices, numbering and business
        details are all kept, so turning it back on picks up exactly where you
        left off. Deleting the workspace deletes them for good.
      </P>

      <H2 id="faq">Common questions</H2>
      <H3 id="faq-sidebar">I can&apos;t see Invoices in the sidebar</H3>
      <P>
        Either the app is off for this workspace, it was hidden in{" "}
        <b>Settings → Sidebar</b>, or you are a viewer. Ask a workspace admin
        to turn it on or change your role.
      </P>
      <H3 id="faq-number">Saving says the number is already in use</H3>
      <P>
        Another document in this workspace already has that number. Clear the
        field to get the next free number, or type a different one.
      </P>
      <H3 id="faq-old-documents">I changed my address but an old invoice still shows the old one</H3>
      <P>
        That is on purpose: a document keeps the business details it was
        created with. New documents use the new address.
      </P>
      <H3 id="faq-email">Can Quantalog email the invoice or collect payment?</H3>
      <P>
        Not by email yet: download the PDF and send it yourself. Invoices in
        rupees can already be paid by scanning the UPI QR code when you add a
        UPI ID. Sending by email and card payment links through the gateways
        you connected in Apps are planned.
      </P>
    </>
  );
}

export const quantalogInvoicing: Doc = {
  slug: "quantalog-invoicing",
  title: "Quantalog Invoicing",
  description:
    "Turn on Invoicing, add your business details, and send quotations and GST-ready invoices to your leads. Every field explained.",
  category: "Tracking",
  order: 13.8,
  Body,
};
