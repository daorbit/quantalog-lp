import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "../ui";
import { AssistantChat } from "../ai-assistants/assistant-chat";

const POINTS = [
  "Forms, leads, bookings and traffic, per workspace",
  "Read-only, and you approve every connection",
  "Works in Claude and ChatGPT with one link",
];

export function AiAssistants() {
  return (
    <section id="ai-assistants" className="section-y">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="text-[15px] font-semibold text-accent">Claude &amp; ChatGPT</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            Ask your AI about your business.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[17px] leading-relaxed text-fg-muted">
            Connect Quantalog to Claude or ChatGPT and ask about your leads, bookings and traffic in plain words. The answers come from your live workspace.
          </p>
          <ul className="mt-7 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[15px] text-fg">
                <Lock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={`${site.app}/signup`} track="cta_start_free" trackProps={{ location: "ai_assistants" }}>
              Start free
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Link
              href="/docs/ai-assistants"
              className="inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
            >
              How to connect
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <AssistantChat />
      </div>
    </section>
  );
}
