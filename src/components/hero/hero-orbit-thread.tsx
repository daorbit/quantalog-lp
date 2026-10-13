import Image from "next/image";
import { Hash } from "lucide-react";
import { THREAD } from "./hero-data";

export function HeroOrbitThread() {
  const { channel, question, answer } = THREAD;

  return (
    <div className="hero-panel hero-in hero-in--thread overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 text-[12.5px] font-medium">
        <Hash className="h-3.5 w-3.5 text-fg-faint" />
        {channel}
      </div>
      <div className="space-y-4 p-4 text-[12px] leading-[1.55]">
        <div className="hero-msg-q flex gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-amber-500 text-[10.5px] font-semibold text-white">
            {question.initials}
          </span>
          <div className="min-w-0">
            <p className="flex items-baseline gap-2">
              <span className="font-semibold">{question.name}</span>
              <span className="text-[10.5px] text-fg-faint">{question.time}</span>
            </p>
            <p className="text-fg-muted">
              <span className="rounded bg-accent/10 px-1 font-medium text-accent">@Orbit</span> {question.text}
            </p>
          </div>
        </div>
        <div className="grid">
          <div className="hero-typing flex items-center gap-2.5 [grid-area:1/1] self-start">
            <Image src="/favicon-rounded.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-md" />
            <span className="flex gap-1 rounded-full border border-border px-2.5 py-2">
              <span className="h-1 w-1 rounded-full bg-fg-faint" />
              <span className="h-1 w-1 rounded-full bg-fg-faint" />
              <span className="h-1 w-1 rounded-full bg-fg-faint" />
            </span>
          </div>
          <div className="hero-msg-a flex gap-2.5 [grid-area:1/1]">
            <Image src="/favicon-rounded.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-md" />
            <div className="min-w-0">
              <p className="flex items-baseline gap-2">
                <span className="font-semibold">Orbit</span>
                <span className="rounded border border-border px-1 text-[9.5px] font-semibold text-fg-faint">APP</span>
                <span className="text-[10.5px] text-fg-faint">{answer.time}</span>
              </p>
              <p className="text-fg-muted">{answer.text}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {answer.chips.map((chip) => (
                  <span key={chip} className="rounded-md border border-border px-1.5 py-0.5 text-[10.5px] text-fg-muted">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
