import { siGoogleforms, siTypeform } from "simple-icons";
import type { ComparisonEntry, ComparisonRow } from "./types";

const CHECKED_ON = "November 2026";

const PAYMENTS_ROW: ComparisonRow = {
  point: "Payments through Indian gateways",
  ours: "Built in, through your own Razorpay, Cashfree or PayU account, so respondents can pay by UPI or card in the gateway's own window.",
  theirs: "",
  verdict: "quantalog",
};

const PIPELINE_ROW: ComparisonRow = {
  point: "Lead follow-up",
  ours: "Every response gets a stage, an assignee, tags, internal notes and a lead score, with a stage board from New to Won.",
  theirs: "",
  verdict: "quantalog",
};

const INVOICE_ROW: ComparisonRow = {
  point: "Paid response to GST invoice",
  ours: "A paid response can create a paid GST invoice in Quantalog Invoicing on its own, linked to the customer.",
  theirs: "",
  verdict: "quantalog",
};

const ANALYTICS_ROW: ComparisonRow = {
  point: "Website analytics in the same login",
  ours: "Yes. Cookieless website analytics, per-form views and per-field drop-off sit beside the responses.",
  theirs: "",
  verdict: "quantalog",
};

const withTheirs = (row: ComparisonRow, theirs: string, verdict = row.verdict): ComparisonRow => ({
  ...row,
  theirs,
  verdict,
});

export const FORM_COMPARISONS: ComparisonEntry[] = [
  {
    slug: "google-forms-alternative",
    rival: "Google Forms",
    logo: siGoogleforms,
    title: "Quantalog vs Google Forms",
    description:
      "A Google Forms alternative that takes payments through Razorpay, Cashfree or PayU, books calls with Google Meet links, follows up every lead and shows where it came from, while still sending responses to Google Sheets.",
    intro:
      "Google Forms is free, familiar and good enough for most surveys. Businesses usually outgrow it when a form has to take a payment, book a call, or tell them which ad or post produced the lead. This page is for anyone at that point.",
    whenTheirs:
      "Stay with Google Forms if you need unlimited forms and responses at no cost, your respondents already work inside Google Workspace, or the form is an internal survey or a classroom quiz. Quantalog's Free plan has one form and 100 responses a month, far less than Google Forms gives away.",
    checkedOn: CHECKED_ON,
    rows: [
      withTheirs(
        PAYMENTS_ROW,
        "No built-in payments. You add a payment link or a third-party add-on to the form."
      ),
      {
        point: "Bookings",
        ours: "A booking field with your weekly hours, buffers, notice and seats. Each booking creates a Google Calendar event with a Meet link.",
        theirs: "No booking field. Google Calendar's appointment schedules are a separate page from the form.",
        verdict: "quantalog",
      },
      {
        point: "Where each lead came from",
        ours: "Every response records its channel, source and campaign from UTM tags and the referrer, automatically.",
        theirs: "Responses do not record the traffic source. You would need a separate pre-filled link for each channel.",
        verdict: "quantalog",
      },
      withTheirs(
        PIPELINE_ROW,
        "Responses go to the summary view and a linked sheet. Follow-up is tracked somewhere else."
      ),
      {
        point: "Conditional logic",
        ours: "Show or hide any field with AND/OR rules and number comparisons, skip steps, and pick the thank-you page by answer.",
        theirs: "Go to a section based on the answer to a multiple-choice or dropdown question.",
        verdict: "quantalog",
      },
      {
        point: "Google Sheets",
        ours: "Connect a Google account and each form gets its own spreadsheet, with a row added for every new response.",
        theirs: "Native. Link responses to a sheet in one click.",
        verdict: "both",
      },
      {
        point: "File uploads",
        ours: "On Starter and Pro plans. Respondents do not need an account.",
        theirs: "Free, but respondents must sign in to a Google account to upload a file.",
        verdict: "both",
      },
      {
        point: "New response alerts",
        ours: "Email, Slack, Discord, Microsoft Teams, Google Chat, Telegram and WhatsApp, depending on your plan.",
        theirs: "Email notifications to the form owner.",
        verdict: "quantalog",
      },
      withTheirs(INVOICE_ROW, "Not offered. Google Forms has no invoicing."),
      {
        point: "Price and limits",
        ours: "Free plan: 1 form and 100 responses a month. Starter raises that to 10 forms and 2,000 responses, Pro to 50 forms and 25,000.",
        theirs: "Free, with no published limit on forms or responses.",
        verdict: "rival",
      },
    ],
    faqs: [
      {
        q: "Can a Google Form take UPI payments?",
        a: "Not on its own. Google Forms has no payment field, so businesses add a Razorpay payment link or a third-party add-on and match payments to responses by hand. Quantalog forms take the payment inside the form through your own Razorpay, Cashfree or PayU account, so each response arrives already paid.",
      },
      {
        q: "Can I move my Google Forms to Quantalog?",
        a: "There is no automatic import. You can rebuild a form in the drag-and-drop builder, or describe it to Orbit, which drafts a form from a sentence or a photo of the old one. Your old responses stay in their Google Sheet.",
      },
      {
        q: "Does Quantalog still send responses to Google Sheets?",
        a: "Yes. Connect a Google account once and each form gets its own spreadsheet, with a new row for every completed response. Responses that arrived before you connected are not copied over.",
      },
      {
        q: "Is Quantalog free like Google Forms?",
        a: "Partly. The Free plan covers one form and 100 responses a month with payments and bookings included. If you only need free, unlimited surveys, Google Forms is the better fit.",
      },
    ],
  },
  {
    slug: "typeform-alternative",
    rival: "Typeform",
    logo: siTypeform,
    title: "Quantalog vs Typeform",
    description:
      "A Typeform alternative with one-question-at-a-time forms, UPI payments through Razorpay, Cashfree or PayU, bookings with Google Meet, lead follow-up and 100 free responses a month.",
    intro:
      "Typeform made the one-question-at-a-time form popular, and its forms still feel better to fill in than most. Teams look elsewhere when the response cap arrives sooner than expected, or when they need Indian payments, bookings and lead follow-up in the same place.",
    whenTheirs:
      "Stay with Typeform if design polish and a large integration library matter most to you, or you already rely on its video questions, workflows and team features. Its forms have years of refinement behind them, and its Stripe, PayPal and Square payments suit businesses selling outside India.",
    checkedOn: CHECKED_ON,
    rows: [
      {
        point: "Free plan",
        ours: "1 form and 100 responses a month, with payments and bookings included.",
        theirs: "10 responses a month across all forms, according to Typeform's help centre.",
        verdict: "quantalog",
      },
      {
        point: "One question at a time",
        ours: "Available as a form mode, alongside single-page and multi-step forms.",
        theirs: "The signature format, and very polished.",
        verdict: "both",
      },
      withTheirs(PAYMENTS_ROW, "Built around Stripe, PayPal and Square."),
      {
        point: "Bookings",
        ours: "A booking field with weekly hours, buffers and seats. Each booking creates a Google Calendar event with a Meet link.",
        theirs: "Through a Calendly integration rather than a built-in booking field.",
        verdict: "quantalog",
      },
      {
        point: "Where each lead came from",
        ours: "Channel, source and campaign are recorded on every response automatically, from UTM tags and the referrer.",
        theirs: "Hidden fields can capture UTM values that you pass in the form link.",
        verdict: "both",
      },
      withTheirs(
        PIPELINE_ROW,
        "Responses are reviewed in Results. Pipeline work usually happens in a connected CRM."
      ),
      withTheirs(INVOICE_ROW, "Not offered. Typeform has no invoicing."),
      {
        point: "AI form building",
        ours: "Orbit drafts a form from a sentence or a photo of a paper form, and edits it when you ask.",
        theirs: "AI form creation is available on paid plans.",
        verdict: "both",
      },
      {
        point: "Integrations",
        ours: "Google Sheets, Zoho CRM, HubSpot, Pipedrive, Freshsales, Slack, Discord, Microsoft Teams, Google Chat and webhooks.",
        theirs: "A much larger integration library, plus Zapier and Make.",
        verdict: "rival",
      },
      {
        point: "Design and templates",
        ours: "Themes, backgrounds, picture-card choices and a device preview.",
        theirs: "Some of the best form design and templates available.",
        verdict: "rival",
      },
    ],
    faqs: [
      {
        q: "Is Quantalog cheaper than Typeform?",
        a: "On the free plans, yes: Typeform's covers 10 responses a month and Quantalog's covers 100 on one form. For paid plans, compare the response allowances on both pricing pages, because Typeform's prices vary by billing cycle and region.",
      },
      {
        q: "Can Quantalog forms show one question at a time like Typeform?",
        a: "Yes. One-question mode shows each question on its own screen, and you can add picture-card choices, images, a countdown and an analysing screen for quiz-style funnels.",
      },
      {
        q: "What would I give up by leaving Typeform?",
        a: "Mainly its integration library, video questions and the depth of its design tools. If those are central to how you work, Typeform is the safer choice.",
      },
    ],
  },
  {
    slug: "tally-forms-alternative",
    rival: "Tally Forms",
    title: "Quantalog vs Tally Forms",
    description:
      "A Tally Forms alternative for businesses that need what happens after the form: UPI payments through Razorpay, Cashfree or PayU, bookings with Google Meet, lead follow-up and GST invoices for paid responses.",
    intro:
      "Tally gives away almost everything, with unlimited forms and submissions on its free plan under fair use. It is hard to beat on price, and this page will not pretend otherwise. It is for teams that need Indian payments, bookings, lead follow-up and invoices around their forms.",
    whenTheirs:
      "Stay with Tally if you want unlimited forms and responses for free and a fast, document-style editor. For simple forms that send answers to Notion, Airtable, Sheets or a webhook, Tally is the better value.",
    checkedOn: CHECKED_ON,
    rows: [
      {
        point: "Free plan",
        ours: "1 form and 100 responses a month.",
        theirs: "Unlimited forms and submissions under fair use, according to Tally's pricing page.",
        verdict: "rival",
      },
      withTheirs(PAYMENTS_ROW, "Payments through Stripe."),
      {
        point: "Bookings",
        ours: "A booking field with weekly hours, buffers and seats. Each booking creates a Google Calendar event with a Meet link.",
        theirs: "By embedding a scheduling tool such as Calendly or Cal.com in the form.",
        verdict: "quantalog",
      },
      {
        point: "Where each lead came from",
        ours: "Channel, source and campaign are recorded on every response automatically, from UTM tags and the referrer.",
        theirs: "Hidden fields can capture UTM values that you pass in the form link.",
        verdict: "both",
      },
      withTheirs(
        PIPELINE_ROW,
        "Responses are listed in Tally or sent to a connected tool, where follow-up happens."
      ),
      withTheirs(INVOICE_ROW, "Not offered. Tally has no invoicing."),
      withTheirs(ANALYTICS_ROW, "Not offered. Tally is a form builder, not a website analytics tool."),
      {
        point: "Integrations",
        ours: "Google Sheets, Zoho CRM, HubSpot, Pipedrive, Freshsales, Slack, Discord, Microsoft Teams, Google Chat and webhooks.",
        theirs: "Notion, Airtable, Zapier, Make and many more.",
        verdict: "rival",
      },
      {
        point: "Removing the branding",
        ours: "On the Pro plan.",
        theirs: "On the Pro plan.",
        verdict: "both",
      },
    ],
    faqs: [
      {
        q: "Why pay for Quantalog when Tally is free?",
        a: "If a form only needs to collect answers, you probably should not. Quantalog earns its place when the form has to take a UPI payment, book a Meet call, move the lead through follow-up stages and turn a paid response into a GST invoice, all next to the analytics that brought the visitor.",
      },
      {
        q: "Does Quantalog take UPI payments?",
        a: "Yes. Payment fields run through your own Razorpay, Cashfree or PayU account, and respondents pay by UPI, card or the other methods your gateway offers.",
      },
      {
        q: "Is this the same Tally as the accounting software?",
        a: "No. This page compares Quantalog with Tally Forms (tally.so), the online form builder. TallyPrime is unrelated accounting software.",
      },
    ],
  },
  {
    slug: "jotform-alternative",
    rival: "Jotform",
    title: "Quantalog vs Jotform",
    description:
      "A Jotform alternative for small businesses that want forms tied to their website traffic: UPI payments, bookings with Google Meet, lead follow-up and GST invoices for paid responses, in one workspace.",
    intro:
      "Jotform is one of the most complete form platforms available, with thousands of templates, approvals, PDF documents, e-signatures and its own tables. Quantalog is narrower. This page is for small businesses that use a fraction of Jotform and want their forms tied to traffic, bookings and invoices.",
    whenTheirs:
      "Stay with Jotform if you rely on its approval flows, PDF editor, e-signatures, compliance plans or its huge template and integration library. As a form platform it does far more than Quantalog.",
    checkedOn: CHECKED_ON,
    rows: [
      {
        point: "Free plan",
        ours: "1 form and 100 responses a month.",
        theirs: "5 forms and 100 submissions a month, according to Jotform's pricing page.",
        verdict: "rival",
      },
      {
        point: "Templates and integrations",
        ours: "A template library and the main CRMs, chat apps, Google Sheets and webhooks.",
        theirs: "Thousands of templates and one of the largest integration libraries of any form builder.",
        verdict: "rival",
      },
      {
        point: "Approvals, PDFs and e-signatures",
        ours: "A signature field and PDF export of responses. No approval flows.",
        theirs: "Approval workflows, a PDF editor and Jotform Sign.",
        verdict: "rival",
      },
      withTheirs(PAYMENTS_ROW, "A long list of payment gateway integrations.", "both"),
      {
        point: "Bookings",
        ours: "A booking field with weekly hours, buffers and seats. Each booking creates a Google Calendar event with a Meet link.",
        theirs: "An appointment field with calendar integrations.",
        verdict: "both",
      },
      {
        point: "Where each lead came from",
        ours: "Channel, source and campaign are recorded on every response automatically, from UTM tags and the referrer.",
        theirs: "Form-level views and submissions. Traffic source needs hidden fields or an analytics integration.",
        verdict: "quantalog",
      },
      withTheirs(ANALYTICS_ROW, "Not offered. Jotform tracks forms, not your whole website."),
      withTheirs(
        PIPELINE_ROW,
        "Submissions land in Jotform Tables, which you can arrange into your own workflow.",
        "both"
      ),
      withTheirs(
        INVOICE_ROW,
        "PDF documents can be generated from submissions. GST invoice numbering, tax split and reports are not part of the product."
      ),
    ],
    faqs: [
      {
        q: "Can Quantalog replace Jotform?",
        a: "For lead forms, paid registrations, quizzes and booking forms, yes. It does not replace Jotform's approvals, PDF editor, e-signature product or compliance plans.",
      },
      {
        q: "Which has the better free plan?",
        a: "Jotform's: five forms against Quantalog's one, with the same 100 submissions a month. Quantalog's free form does include payments, bookings and the lead pipeline.",
      },
      {
        q: "Can I see which ad or post produced a lead?",
        a: "Yes. Every Quantalog response records its channel, source and campaign automatically, and the same workspace shows the traffic that reached the form.",
      },
    ],
  },
];
