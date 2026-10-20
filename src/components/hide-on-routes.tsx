"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function HideOnRoutes({ routes, children }: { routes: readonly string[]; children: ReactNode }) {
  const pathname = usePathname();
  if (routes.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return <>{children}</>;
}
