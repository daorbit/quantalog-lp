"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

function matchesRoute(pathname: string, routes: readonly string[]) {
  return routes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function HideOnRoutes({ routes, children }: { routes: readonly string[]; children: ReactNode }) {
  const pathname = usePathname();
  if (matchesRoute(pathname, routes)) return null;
  return <>{children}</>;
}

export function ShowOnPaths({ paths, children }: { paths: readonly string[]; children: ReactNode }) {
  const pathname = usePathname();
  if (!paths.includes(pathname)) return null;
  return <>{children}</>;
}
