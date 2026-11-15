import {
  BookOpen,
  Info,
  MessageCircle,
  MonitorPlay,
  Newspaper,
  Scale,
  Tag,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import type { AppMarkSpec } from "../apps-carousel/app-marks";

export const PRODUCT_MARKS: Record<string, AppMarkSpec> = {
  "/analytics": { kind: "product", file: "quantalog-analytics.svg" },
  "/seo-audits": { kind: "product", file: "quantalog-seo-audits.svg" },
  "/search-visibility": { kind: "product", file: "quantalog-search-visibility.svg" },
  "/reports": { kind: "product", file: "quantalog-reports.svg" },
  "/social": { kind: "product", file: "quantalog-orbit.svg" },
  "/forms": { kind: "product", file: "quantalog-forms.svg" },
  "/invoicing": { kind: "quantalog", id: "invoicing", file: "quantalog-invoicing.png" },
  "/platform-api": { kind: "product", file: "quantalog-platform-api.svg" },
};

export const MENU_LINK_ICONS: Record<string, LucideIcon> = {
  "Start free": UserPlus,
  "Try the live demo": MonitorPlay,
  Pricing: Tag,
  "Talk to us": MessageCircle,
  Documentation: BookOpen,
  Blog: Newspaper,
  Comparisons: Scale,
  About: Info,
};
