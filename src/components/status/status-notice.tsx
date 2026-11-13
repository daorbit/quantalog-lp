"use client";

import { useSearchParams } from "next/navigation";

const NOTICES: Record<string, string> = {
  subscribed: "You're subscribed. We'll email you when there is an incident or planned maintenance.",
  unsubscribed: "You're unsubscribed. No more status emails will be sent.",
  link: "That link has expired or was already used. Subscribe again below.",
};

export function StatusNotice() {
  const params = useSearchParams();
  const key = ["subscribed", "unsubscribed", "link"].find((k) => params.has(k));
  if (!key) return null;
  return (
    <p className="mb-8 rounded-[8px] border border-border bg-bg-subtle px-4 py-3 text-[14px] text-fg" role="status">
      {NOTICES[key]}
    </p>
  );
}
