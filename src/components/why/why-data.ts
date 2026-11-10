export const WHY_DESCRIPTION =
  "Quantalog brings website analytics, lead capture, SEO, social posting, reviews, email campaigns and invoicing into one place. See where people come from, turn them into leads and get paid, without stitching five tools together.";

export const whyStats = [
  { value: "0", label: "Cookie banners needed" },
  { value: "Live", label: "Data, never sampled" },
  { value: "<5", unit: "KB", label: "Tracking script" },
  { value: "10k", label: "Free pageviews a month" },
] as const;

export const whyFaqs = [
  {
    q: "What does Quantalog replace?",
    a: "A separate analytics tool, form builder, SEO suite, social scheduler, email marketing tool and invoicing app. They all share one workspace, so a lead keeps its source from the first visit to the paid invoice.",
  },
  {
    q: "Do I need a cookie banner?",
    a: "No. The tracker stores nothing in your visitors' browsers, so there is no cookie to ask permission for, and every visitor is counted.",
  },
  {
    q: "Is my visitors' data sold or shared?",
    a: "No. Quantalog never sells data, shares it with advertisers or uses it to build profiles, and raw IP addresses are never stored.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. You can start free with up to 10k pageviews a month, and pay as you grow.",
  },
] as const;
