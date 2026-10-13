"use client";

import { CalendarClock } from "lucide-react";
import { useCycle } from "../../use-cycle";

const posts = [
  { when: "Tue · 09:00", text: "Our traffic doubled this month. Here is what changed." },
  { when: "Thu · 12:30", text: "Three SEO fixes that took us from 71 to 92." },
  { when: "Mon · 08:45", text: "We just shipped booking pages for every form." },
];

export function SocialVisual() {
  const { ref, index, inView } = useCycle<HTMLDivElement>(posts.length, 2400);

  return (
    <div ref={ref} className="stagger-in w-full max-w-xs space-y-2.5" data-active={inView || undefined}>
      {posts.map((post, i) => (
        <div
          key={post.when}
          className={`rounded-2xl bg-surface px-4 py-3 text-left shadow-soft transition-shadow duration-300 dark:bg-bg-subtle ${
            i === index ? "ring-2 ring-accent" : "ring-1 ring-border"
          }`}
        >
          <p className="flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-1.5 font-medium text-fg-muted">
              <CalendarClock className="h-3.5 w-3.5" />
              {post.when}
            </span>
            <span className={`font-semibold ${i === index ? "text-accent" : "text-fg-faint"}`}>
              {i === index ? "Up next" : "Scheduled"}
            </span>
          </p>
          <p className="mt-1.5 text-[13px] leading-snug text-fg">{post.text}</p>
        </div>
      ))}
    </div>
  );
}
