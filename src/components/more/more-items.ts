import {
  Bookmark,
  Bug,
  CalendarClock,
  Download,
  ExternalLink,
  Smartphone,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

export type MoreItem = { icon: LucideIcon; title: string; body: string; href: string };

export const moreItems: MoreItem[] = [
  {
    icon: CalendarClock,
    title: "Scheduled posts",
    body: "Write LinkedIn and Instagram posts ahead of time and let Quantalog publish them.",
    href: "/docs/scheduled-posts",
  },
  {
    icon: Star,
    title: "Google reviews",
    body: "Your Business Profile rating and latest reviews, beside your analytics.",
    href: "/docs/reviews",
  },
  {
    icon: Bug,
    title: "Error tracking",
    body: "Uncaught JavaScript errors and failed resources, grouped by page.",
    href: "/docs/error-tracking",
  },
  {
    icon: Smartphone,
    title: "App tracking",
    body: "Follow identified users through a React Native or web app.",
    href: "/docs/mobile-tracking",
  },
  {
    icon: ExternalLink,
    title: "Outbound & downloads",
    body: "Links that leave your site and file downloads, tracked automatically.",
    href: "/docs/outbound",
  },
  {
    icon: Bookmark,
    title: "Segments & markers",
    body: "Save the filters you reuse and pin deploys and campaigns to the chart.",
    href: "/docs/segments-markers",
  },
  {
    icon: Download,
    title: "Date ranges & export",
    body: "Slice any custom range and download it as a spreadsheet.",
    href: "/docs/exporting",
  },
  {
    icon: Users,
    title: "Workspace roles",
    body: "Invite your team and decide exactly who can see and change what.",
    href: "/docs/workspace-members",
  },
];
