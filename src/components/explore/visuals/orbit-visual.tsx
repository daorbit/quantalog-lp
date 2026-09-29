"use client";

import { useEffect, useState } from "react";
import { OrbitMark } from "../../orbit/orbit-mark";
import { useInView } from "../../use-in-view";
import { useReducedMotion } from "../../use-reduced-motion";

const chats = [
  {
    q: "How do I fix a missing canonical tag?",
    a: "Add one <link rel=\"canonical\"> to your <head>. I'll show you exactly where.",
  },
  {
    q: "What does bounce rate mean?",
    a: "The share of visits that left after one page. Lower usually means people found more to read.",
  },
  {
    q: "Who can connect Google reviews?",
    a: "Workspace admins. Everyone else can read them once they're connected.",
  },
];

type Phase = "ask" | "typing" | "answer" | "hold";

export function OrbitVisual() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ask");
  const [typed, setTyped] = useState(0);
  const still = useReducedMotion();

  const chat = chats[index];

  useEffect(() => {
    if (!inView || still) return;
    if (phase === "ask") {
      const t = window.setTimeout(() => setPhase("typing"), 900);
      return () => window.clearTimeout(t);
    }
    if (phase === "typing") {
      const t = window.setTimeout(() => {
        setTyped(0);
        setPhase("answer");
      }, 1300);
      return () => window.clearTimeout(t);
    }
    if (phase === "answer") {
      if (typed >= chat.a.length) {
        setPhase("hold");
        return;
      }
      const t = window.setTimeout(() => setTyped((n) => n + 1), 22);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % chats.length);
      setTyped(0);
      setPhase("ask");
    }, 3200);
    return () => window.clearTimeout(t);
  }, [inView, still, phase, typed, chat.a.length]);

  const answer = still ? chat.a : chat.a.slice(0, typed);
  const showAnswer = still || phase === "answer" || phase === "hold";

  return (
    <div ref={ref} className="flex w-full max-w-sm flex-col items-center">
      <OrbitMark size={96} alt="Orbit AI" />

      <div className="mt-6 flex min-h-42 w-full flex-col gap-2">
        <p
          key={`q${index}`}
          className="chat-in max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface px-4 py-3 text-left text-[14px] leading-snug text-fg shadow-soft ring-1 ring-border dark:bg-bg-subtle"
        >
          {chat.q}
        </p>

        {phase === "typing" && !still && (
          <p className="typing-dots chat-in flex gap-1 self-end rounded-2xl rounded-br-md bg-accent/10 px-4 py-3.5" aria-label="Orbit is typing">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </p>
        )}

        {showAnswer && (
          <p className="chat-in max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent/10 px-4 py-3 text-left text-[14px] leading-snug text-fg">
            {answer}
            {phase === "answer" && !still && <span className="type-caret" aria-hidden="true" />}
          </p>
        )}
      </div>
    </div>
  );
}
