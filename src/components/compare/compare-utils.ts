import type { Comparison } from "@/lib/comparisons";

export function tally(c: Comparison) {
  const ours = c.rows.filter((r) => r.verdict === "quantalog").length;
  const theirs = c.rows.filter((r) => r.verdict === "rival").length;
  return { ours, theirs, tied: c.rows.length - ours - theirs, total: c.rows.length };
}
