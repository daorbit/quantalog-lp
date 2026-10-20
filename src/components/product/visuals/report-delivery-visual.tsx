"use client";

import { FileSpreadsheet, Mail } from "lucide-react";
import { useCycle } from "../../use-cycle";

const CHANNELS = [
  { id: "email", name: "Email", to: "team@acme.com", logo: null },
  { id: "whatsapp", name: "WhatsApp", to: "+91 98••• ••210", logo: "whatsapp" },
  { id: "telegram", name: "Telegram", to: "Acme growth chat", logo: "telegram" },
] as const;

const SUMMARY =
  "Traffic is up 22% on last week, mostly from Google. The pricing page converted best, and two new pages scored above 95.";

function ChannelMark({ logo }: { logo: string | null }) {
  return (
    <span className="report-channel-mark">
      {logo ? <img src={`/brands/${logo}.svg`} alt="" className="h-1/2 w-1/2 object-contain" /> : <Mail className="h-4 w-4 text-accent" />}
    </span>
  );
}

export function ReportDeliveryVisual() {
  const { ref, index } = useCycle<HTMLDivElement>(CHANNELS.length, 3600);
  const channel = CHANNELS[index];

  return (
    <div ref={ref} className="w-full max-w-md">
      <div key={channel.id} className="report-delivery chat-in">
        <div className="flex items-center gap-3">
          <ChannelMark logo={channel.logo} />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-fg-faint">{channel.name}</p>
            <p className="truncate text-[13px] text-fg-muted">to {channel.to}</p>
          </div>
          <span className="text-[12px] text-fg-faint">Mon 9:00</span>
        </div>
        <p className="mt-4 text-[17px] font-semibold tracking-tight text-fg">Your week at acme.com</p>
        <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{SUMMARY}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-bg-subtle px-3 py-1.5 text-[12.5px] font-medium text-fg dark:bg-surface-raised">
          <FileSpreadsheet className="h-4 w-4 text-accent" aria-hidden="true" />
          acme-weekly.xlsx
        </p>
      </div>

      <ul className="mt-5 flex justify-center gap-2" aria-hidden="true">
        {CHANNELS.map((c, i) => (
          <li key={c.id} className="report-channel-pill" data-active={i === index || undefined}>
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
