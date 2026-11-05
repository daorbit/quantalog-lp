import { FileUp, ListChecks, Mail, Send, ShieldCheck, Users } from "lucide-react";
import type { AppPage } from "./types";

export const campaignsApp: AppPage = {
  slug: "campaigns",
  logo: "quantalog-campaigns.svg",
  name: "Quantalog Campaigns",
  shortName: "Campaigns",
  group: "Grow",
  unlock: "once",
  docs: "/docs/quantalog-campaigns",
  launched: "2026-11-05",
  title: "Your leads,",
  accent: "one email away.",
  description:
    "Write one email and send it to the people who answered your forms, or to a list of your own. It goes out through your own email provider, with unsubscribes handled for you.",
  metaDescription:
    "Email campaigns for your leads: send to form respondents or an imported list through Resend, Brevo or your own SMTP, with unsubscribe links and a send report.",
  keywords: ["email campaigns", "email marketing for leads", "newsletter tool", "resend campaigns", "lead nurturing email"],
  chips: [
    { icon: Users, label: "Form leads" },
    { icon: FileUp, label: "CSV import" },
    { icon: Mail, label: "Your own provider" },
  ],
  stats: [
    { value: "3", label: "Email providers" },
    { value: "5000", label: "Contacts per import" },
    { value: "1", label: "Click to unsubscribe" },
  ],
  features: [
    {
      icon: Users,
      title: "Start from your forms",
      body: "Pick any form that collects an email address. Everyone who answered is ready to email, without an export.",
    },
    {
      icon: FileUp,
      title: "Bring your own list",
      body: "Paste contacts or upload a CSV. Addresses that appear twice are only emailed once.",
    },
    {
      icon: Send,
      title: "Sent from your provider",
      body: "Emails go through the Resend, Brevo or SMTP account you activated in Apps, so replies reach you.",
    },
    {
      icon: ShieldCheck,
      title: "Unsubscribes handled",
      body: "Every email has an unsubscribe link. Anyone who uses it is left out of your future campaigns.",
    },
    {
      icon: ListChecks,
      title: "A clear report",
      body: "See how many emails went out, which failed and why, and how many people unsubscribed.",
    },
    {
      icon: Mail,
      title: "Designed, or your own HTML",
      body: "Start from a template and drag sections into place, or paste your own HTML. Preview on desktop and phone, and send yourself a test.",
    },
  ],
  steps: [
    {
      title: "Activate an email provider",
      body: "Connect Resend, Brevo or SMTP in Apps, and unlock Campaigns.",
    },
    {
      title: "Write and pick your audience",
      body: "Write your email, then choose forms, add your own contacts, or both.",
    },
    {
      title: "Test and send",
      body: "Send yourself a test, confirm the audience and send. You can pause at any time.",
    },
  ],
  story: {
    eyebrow: "Built on your forms",
    title: "The people who already raised a hand.",
    paragraphs: [
      "Your forms already collect the people interested in what you do. Campaigns lets you reach them without exporting a list into another tool.",
      "Emails go out from your own provider and domain, so your sender reputation and your replies stay yours.",
    ],
  },
  connections: [
    { kind: "product", href: "/forms", how: "Anyone who answered a form with an email field can be added to a campaign." },
    { kind: "app", id: "tasks", how: "Plan the follow-up work your campaigns create on one shared board." },
  ],
  included: [
    "Send to form respondents",
    "Paste or upload your own contacts",
    "Repeated addresses removed",
    "Personalise with each person's name",
    "Email templates and custom HTML",
    "Live preview and test emails",
    "Unsubscribe link in every email",
    "Pause and resume sending",
    "Report of sent and failed emails",
  ],
  plans: [{ row: "Campaign emails a month", free: "200", starter: "5,000", pro: "25,000" }],
  faqs: [
    {
      q: "Which email provider does it use?",
      a: "Whichever one you activated in Apps: Resend, Brevo or your own SMTP. Resend is the best fit for larger sends.",
    },
    {
      q: "Who can I email?",
      a: "Only people who agreed to hear from you. You confirm this before each send, and your provider's rules and local email laws still apply.",
    },
    {
      q: "How fast do campaigns send?",
      a: "Emails go out in batches every few minutes, and the report updates as they go. You can pause a campaign at any time.",
    },
  ],
  related: ["tasks", "funnels", "goals"],
  ctaTitle: "Stay in touch with your leads.",
};
