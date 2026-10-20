"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Activity, Code2, Mail, MessagesSquare, Search, ShieldCheck } from "lucide-react";
import { CountValue, LiveValue, OrbitNotes } from "./flow-live";

export type FlowRow = { label: string; value?: string; live?: number; count?: number };

export type CardData = {
  title: string;
  icon: keyof typeof ICONS;
  order: number;
  rows?: FlowRow[];
  note?: string;
  notes?: string[];
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

const HANDLE = "hero-handle";

function RowValue({ row }: { row: FlowRow }) {
  if (row.live !== undefined) return <LiveValue seed={row.live} />;
  if (row.count !== undefined) return <CountValue seed={row.count} />;
  return <>{row.value}</>;
}

export function FlowCard({ data }: NodeProps & { data: CardData }) {
  const Icon = ICONS[data.icon];

  return (
    <div className="relative" style={{ ["--i" as string]: data.order }}>
      {data.target && <Handle type="target" position={Position.Left} className={HANDLE} />}

      <div
        className={`hero-card relative w-55 overflow-hidden rounded-[14px] border ${
          data.accent ? "border-accent/45" : "border-border"
        }`}
      >
        {data.flare && <span aria-hidden className={`hero-card__flare hero-card__flare--${data.flare}`} />}

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
                <RowValue row={row} />
              </span>
            </div>
          ))}
          {data.note && <p className="font-mono text-[10.5px] leading-relaxed text-fg-muted">{data.note}</p>}
          {data.notes && <OrbitNotes notes={data.notes} />}
        </div>
      </div>

      {data.source && <Handle type="source" position={Position.Right} className={HANDLE} />}
    </div>
  );
}
