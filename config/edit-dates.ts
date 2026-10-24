import { execFileSync } from "node:child_process";

export const EDIT_DATE_SOURCES = [
  "src/app",
  "src/components/sections",
  "src/content/docs",
  "src/lib/comparisons.ts",
];

export function collectEditDates(sources: string[]): Record<string, string> {
  try {
    const log = execFileSync("git", ["log", "--format=@%cs", "--name-only", "--", ...sources], {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });
    const dates: Record<string, string> = {};
    let commitDate = "";
    for (const line of log.split("\n").map((l) => l.trim())) {
      if (line.startsWith("@")) commitDate = line.slice(1);
      else if (line && !(line in dates)) dates[line] = commitDate;
    }
    return dates;
  } catch {
    return {};
  }
}
