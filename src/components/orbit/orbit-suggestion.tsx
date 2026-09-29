import { ChevronRight, CornerDownRight, MessageSquareText, type LucideIcon } from "lucide-react";

export function OrbitSuggestion({
  question,
  onPick,
  variant = "starter",
  icon,
}: {
  question: string;
  onPick: (q: string) => void;
  variant?: "starter" | "follow-up";
  icon?: LucideIcon;
}) {
  const Icon = icon ?? (variant === "starter" ? MessageSquareText : CornerDownRight);
  return (
    <button type="button" className="orbit-suggestion" onClick={() => onPick(question)}>
      <Icon size={14} className="orbit-suggestion__icon" aria-hidden="true" />
      <span className="orbit-suggestion__text">{question}</span>
      <ChevronRight size={16} className="orbit-suggestion__arrow" aria-hidden="true" />
    </button>
  );
}
