"use client";

import { Check } from "lucide-react";
import { useInView } from "../use-in-view";
import { useReducedMotion } from "../use-reduced-motion";
import { ASSISTANT_CHATS } from "./assistant-chats";
import { useChatScript } from "./use-chat-script";

const ANSWER_LENGTHS = ASSISTANT_CHATS.map((c) => c.answer.length);

export function AssistantChat() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35, false);
  const still = useReducedMotion();
  const { index, phase, typed } = useChatScript(ANSWER_LENGTHS, inView && !still);
  const chat = ASSISTANT_CHATS[index];

  const showTool = still || phase !== "ask";
  const showAnswer = still || phase === "answer" || phase === "hold";
  const answer = still ? chat.answer : chat.answer.slice(0, typed);

  return (
    <div ref={ref} className="mx-auto w-full max-w-lg">
      <p key={`h${index}`} className="chat-in flex items-center gap-2.5 text-[14px] font-semibold text-fg">
        <img src={chat.logo} alt={chat.assistant} width={22} height={22} className="h-5.5 w-5.5" />
        {chat.assistant}
        <span className="font-normal text-fg-faint">with Quantalog connected</span>
      </p>

      <div className="mt-6 flex min-h-64 flex-col gap-3">
        <p
          key={`q${index}`}
          className="chat-in max-w-[85%] self-end rounded-2xl rounded-br-md bg-fg/6 px-4 py-3 text-[15px] leading-snug text-fg"
        >
          {chat.question}
        </p>

        {showTool && (
          <p key={`t${index}`} className="chat-in assistant-tool">
            <span className="assistant-tool-dot" data-done={showAnswer || undefined}>
              {showAnswer && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            {showAnswer ? "Read from Quantalog" : "Reading Quantalog"}
            <span className="font-mono text-fg-faint">{chat.tool}</span>
          </p>
        )}

        {showAnswer && (
          <p className="max-w-[92%] text-pretty text-[15px] leading-relaxed text-fg">
            {answer}
            {phase === "answer" && !still && <span className="type-caret" aria-hidden="true" />}
          </p>
        )}
      </div>
    </div>
  );
}
