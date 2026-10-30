import type { ComponentType } from "react";
import { BarChart3, FileSearch, LayoutGrid, Mail, Plug, Receipt, Shapes, TrendingUp } from "lucide-react";
import { OrbitIcon } from "../orbit/orbit-icon";

export const PRODUCT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "/analytics": BarChart3,
  "/seo-audits": FileSearch,
  "/search-visibility": TrendingUp,
  "/reports": Mail,
  "/social": OrbitIcon,
  "/forms": LayoutGrid,
  "/invoicing": Receipt,
  "/platform-api": Plug,
  "/apps": Shapes,
};
