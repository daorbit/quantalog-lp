import { Activity, Code2, Mail, MessagesSquare, Search, ShieldCheck } from "lucide-react";
import { CountValue, LiveValue, OrbitNotes } from "./flow-live";
import type { FlowCardData, FlowRow } from "./flow-data";

const ICONS = {
  code: Code2,
  shield: ShieldCheck,
  search: Search,
  mail: Mail,
  activity: Activity,
  orbit: MessagesSquare,
};

const ORDER = ["o0", "o1", "o2", "o3", "o4", "o5"] as const;

function RowValue({ row }: { row: FlowRow }) {
  if (row.live !== undefined) return <LiveValue seed={row.live} />;
  if (row.count !== undefined) return <CountValue seed={row.count} />;
  return <>{row.value}</>;
}

export function FlowCard({ card, order, emphasis = false }: { card: FlowCardData; order: number; emphasis?: boolean }) {
  const Icon = ICONS[card.icon];

  return (
    <div className="hf-card" data-tone={card.tone} data-order={ORDER[order]} data-emphasis={emphasis || undefined}>
      <div className="hf-card__head">
        <span className="hf-card__icon">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="hf-card__title">{card.title}</span>
      </div>
      <div className="hf-card__body">
        {card.rows?.map((row) => (
          <div key={row.label} className="hf-card__row">
            <span className="hf-card__label">{row.label}</span>
            <span className="hf-card__value" data-counter={row.count !== undefined || undefined}>
              <RowValue row={row} />
            </span>
          </div>
        ))}
        {card.note && <p className="hf-card__note">{card.note}</p>}
        {card.notes && <OrbitNotes notes={card.notes} />}
      </div>
    </div>
  );
}
