"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Activity, Code2, Mail, MessagesSquare, Search, ShieldCheck } from "lucide-react";
import { useLiveNumber } from "../use-live-number";

export type FlowRow = { label: string; value?: string; live?: number };

export type CardData = {
  title: string;
  icon: keyof typeof ICONS;
  order: number;
  rows?: FlowRow[];
  note?: string;
  accent?: boolean;
  target?: boolean;
  source?: boolean;
  flare?: "events" | "output";
};

const ICONS = {
  code: Code2,
  shield: ShieldCheck,
  search: Search,
  mail: Mail,
  activity: Activity,
  orbit: MessagesSquare,
};

const HANDLE = "h-1.5! w-1.5! border-0! bg-border-strong!";

function LiveValue({ seed }: { seed: number }) {
  const { value, bumped } = useLiveNumber(seed, { every: 2200, drift: 3, band: 0.25 });
  return (
    <span className="tick-num inline-flex items-center gap-1.5" data-bumped={bumped}>
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
      {value}
    </span>
  );
}

export function FlowCard({ data }: NodeProps & { data: CardData }) {
  const Icon = ICONS[data.icon];

  return (
    <div
      className={`hero-card relative w-55 overflow-hidden rounded-[14px] border ${
        data.accent ? "border-accent/45" : "border-border"
      }`}
      style={{ ["--i" as string]: data.order }}
    >
      {data.flare && <span aria-hidden className={`hero-card__flare hero-card__flare--${data.flare}`} />}
      {data.target && <Handle type="target" position={Position.Left} className={HANDLE} />}

      <div className="flex items-center gap-2 border-b border-hairline px-3.5 py-2.5">
        <span
          className={`grid h-5 w-5 place-items-center rounded-md ${
            data.accent ? "bg-accent/12 text-accent" : "bg-bg-subtle text-fg-muted"
          }`}
        >
          <Icon className="h-3 w-3" />
        </span>
        <span className="text-[11.5px] font-semibold tracking-[-0.005em] text-fg">{data.title}</span>
      </div>

      <div className="px-3.5 py-2.5">
        {data.rows?.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3 py-0.75">
            <span className="text-[10.5px] text-fg-faint">{row.label}</span>
            <span className="text-[11px] font-medium tabular-nums text-fg">
              {row.live !== undefined ? <LiveValue seed={row.live} /> : row.value}
            </span>
          </div>
        ))}
        {data.note && <p className="font-mono text-[10.5px] leading-relaxed text-fg-muted">{data.note}</p>}
      </div>

      {data.source && <Handle type="source" position={Position.Right} className={HANDLE} />}
    </div>
  );
}
