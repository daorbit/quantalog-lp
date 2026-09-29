export type Review = {
  name: string;
  role: string;
  quote: string;
  pull?: string;
};

export const featured: Review = {
  name: "Divya Mishra",
  role: "Manages client websites",
  pull: "It makes it easy to understand website traffic and provides useful SEO improvement tips, all in one place.",
  quote:
    "This tool has been incredibly helpful for me. I've integrated it with my clients' websites, and before using it, it was difficult to keep track of what was happening across each site. The integration process was simple and straightforward, and my clients have been really happy with the results.",
};

export const reviews: Review[] = [
  {
    name: "Devesh Mani Chaturvedi",
    role: "Reviewer",
    quote:
      "A refreshing analytics platform that keeps things simple without sacrificing useful insights. The dashboard is clean, fast, and easy to understand, while the privacy-first approach is a huge plus. I also like that it combines analytics with SEO insights, making it more practical than many traditional tools.",
  },
  {
    name: "Deepak Gupta",
    role: "Reviewer",
    quote:
      "A refreshing take on privacy-first analytics — real-time tracking, built-in SEO audits, and a multi-tenant API. Clean, focused, and developer-friendly, and a real alternative to the heavy analytics platforms.",
  },
];
