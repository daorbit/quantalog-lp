import type { AppMarkSpec } from "./app-marks";

export type AppCategory = "quantalog" | "ai" | "notifications" | "payments" | "email" | "social" | "workflow";

export type AppEntry = {
  id: string;
  name: string;
  category: AppCategory;
  body: string;
  mark: AppMarkSpec;
  href?: string;
};

export const APP_CATEGORIES: { id: AppCategory | "all"; label: string }[] = [
  { id: "all", label: "All apps" },
  { id: "quantalog", label: "Quantalog" },
  { id: "ai", label: "AI assistants" },
  { id: "notifications", label: "Notifications" },
  { id: "social", label: "Social & search" },
  { id: "payments", label: "Payments" },
  { id: "email", label: "Email" },
  { id: "workflow", label: "Scheduling & sheets" },
];

export const CATEGORY_LABEL: Record<AppCategory, string> = {
  quantalog: "Quantalog app",
  ai: "AI assistant",
  notifications: "Notifications",
  payments: "Payments",
  email: "Email",
  social: "Social & search",
  workflow: "Scheduling & sheets",
};

const quantalog = (id: string, name: string, body: string, href: string): AppEntry => ({
  id,
  name,
  category: "quantalog",
  body,
  mark: { kind: "quantalog", id },
  href,
});

export const allApps: AppEntry[] = [
  quantalog("compare", "Quantalog Compare", "Score your pages against up to 10 competitors and see what to fix first.", "/docs/quantalog-compare"),
  quantalog("goals", "Quantalog Goals", "Monthly and quarterly targets that fill in from your live data.", "/docs/goals"),
  quantalog("alerts", "Quantalog Alerts", "Hear about traffic drops, spikes and stalled goals by email, Telegram or WhatsApp.", "/docs/quantalog-alerts"),
  quantalog("popups", "Quantalog Popups", "Show your lead capture forms as popups and slide-ins on your site.", "/docs/quantalog-popups"),
  quantalog("bio", "Quantalog Link-in-bio", "One link for your social bios, with every tap counted.", "/docs/quantalog-bio"),
  quantalog("public-dashboard", "Quantalog Public Dashboard", "A live, read-only analytics dashboard at a link anyone can open.", "/docs/public-dashboards"),
  quantalog("seo-reports", "Quantalog SEO Reports", "Send a client a public link to any SEO audit, showing only what you choose.", "/docs/quantalog-seo-reports"),
  quantalog("reviews", "Quantalog Reviews", "Every Google review and your rating breakdown, synced into Quantalog.", "/docs/reviews"),
  quantalog("notes", "Quantalog Notes", "Private notes that float over any page. Press N to open them.", "/docs/quantalog-notes"),
  quantalog("links", "Quantalog Links", "Your team's other tools in the sidebar, opened right inside Quantalog.", "/docs/quantalog-links"),
  quantalog("media", "Quantalog Media", "One library for the images and files your posts and forms use.", "/docs/media-library"),

  { id: "claude", name: "Claude", category: "ai", body: "Ask Claude about your forms, leads, bookings and traffic. Read-only.", mark: { kind: "logo", file: "claude" }, href: "/docs/ai-assistants" },
  { id: "chatgpt", name: "ChatGPT", category: "ai", body: "Ask ChatGPT about your workspace through a secure, read-only connector.", mark: { kind: "logo", file: "openai-chatgpt" }, href: "/docs/ai-assistants" },

  { id: "slack", name: "Slack", category: "notifications", body: "New form responses posted to the channel you choose.", mark: { kind: "logo", file: "slack" }, href: "/docs/forms-notifications-and-apps#chat" },
  { id: "whatsapp", name: "WhatsApp", category: "notifications", body: "Reports and new responses sent to the numbers you verify.", mark: { kind: "logo", file: "whatsapp" }, href: "/docs/forms-notifications-and-apps#whatsapp" },
  { id: "telegram", name: "Telegram", category: "notifications", body: "Reports and new responses from the Quantalog bot or your own.", mark: { kind: "logo", file: "telegram" }, href: "/docs/forms-notifications-and-apps#telegram" },
  { id: "discord", name: "Discord", category: "notifications", body: "Every new response announced in a Discord channel.", mark: { kind: "logo", file: "discord" }, href: "/docs/forms-notifications-and-apps#chat" },
  { id: "teams", name: "Microsoft Teams", category: "notifications", body: "Response cards posted to a Teams channel through Workflows.", mark: { kind: "logo", file: "microsoft-teams" }, href: "/docs/forms-notifications-and-apps#chat" },
  { id: "google-chat", name: "Google Chat", category: "notifications", body: "New responses posted as cards in a Google Chat space.", mark: { kind: "logo", file: "google-chat" }, href: "/docs/forms-notifications-and-apps#chat" },

  { id: "instagram", name: "Instagram", category: "social", body: "Schedule posts and let Orbit draft the captions.", mark: { kind: "logo", file: "instagram" }, href: "/docs/scheduled-posts" },
  { id: "linkedin", name: "LinkedIn", category: "social", body: "Write once and publish on time, with Orbit drafting the post.", mark: { kind: "logo", file: "linkedin" }, href: "/docs/scheduled-posts" },
  { id: "search-console", name: "Google Search Console", category: "social", body: "Clicks, rankings and index status next to your traffic.", mark: { kind: "logo", file: "google-search-console" }, href: "/docs/search-visibility" },

  { id: "razorpay", name: "Razorpay", category: "payments", body: "Cards, UPI, netbanking and wallets, collected on the form.", mark: { kind: "logo", file: "razorpay" }, href: "/docs/lead-capture#connecting" },
  { id: "cashfree", name: "Cashfree", category: "payments", body: "The same checkout through your Cashfree merchant account.", mark: { kind: "logo", file: "cashfree" }, href: "/docs/lead-capture#connecting" },
  { id: "payu", name: "PayU", category: "payments", body: "Take form payments through the PayU account you already use.", mark: { kind: "logo", file: "payu", wide: true }, href: "/docs/lead-capture#connecting" },

  { id: "brevo", name: "Brevo", category: "email", body: "Form emails sent from your own Brevo account and domain.", mark: { kind: "logo", file: "brevo" }, href: "/docs/forms-notifications-and-apps#email-app" },
  { id: "smtp", name: "Custom SMTP", category: "email", body: "Any mail server you already run. Host, port, credentials, done.", mark: { kind: "logo", file: "smtp" }, href: "/docs/forms-notifications-and-apps#email-app" },

  { id: "google-calendar", name: "Google Calendar", category: "workflow", body: "Booking fields check busy times and add a Meet link.", mark: { kind: "logo", file: "google-calendar" }, href: "/docs/forms-booking" },
  { id: "google-sheets", name: "Google Sheets", category: "workflow", body: "Every response becomes a new row, one sheet per form.", mark: { kind: "logo", file: "google-sheets" }, href: "/docs/forms-google-sheets" },
  { id: "webhook", name: "Webhook", category: "workflow", body: "Each submission sent to your endpoint, Zapier or Make.", mark: { kind: "logo", file: "webhook" }, href: "/docs/lead-capture#webhook" },
];
