const FILE_DATES: Record<string, string> = JSON.parse(process.env.PAGE_EDIT_DATES || "{}");

function latestEdit(sources: string[]): string | undefined {
  let latest: string | undefined;
  for (const [file, date] of Object.entries(FILE_DATES)) {
    const matches = sources.some((source) => file === source || file.startsWith(`${source}/`));
    if (matches && (!latest || date > latest)) latest = date;
  }
  return latest;
}

export function routeEditedAt(route: string): string | undefined {
  if (route === "/") return latestEdit(["src/app/page.tsx", "src/components/sections"]);
  return latestEdit([`src/app${route}/page.tsx`]);
}

export function docEditedAt(slug: string): string | undefined {
  return latestEdit([`src/content/docs/${slug}.tsx`]);
}

export function comparisonsEditedAt(): string | undefined {
  return latestEdit(["src/lib/comparisons.ts"]);
}
