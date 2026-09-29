import Link from "next/link";
import { FileText } from "lucide-react";
import { OrbitMark } from "./orbit-mark";
import { SUMMARISE_PROMPT } from "./orbit-open";
import { OrbitSuggestion } from "./orbit-suggestion";
import { OrbitRotatingSuggestions } from "./orbit-rotating-suggestions";
import { ORBIT_HELP_LINKS, ORBIT_QUESTION_POOL } from "./orbit-home-data";

function hasSummarisablePage(): boolean {
  if (typeof document === "undefined") return false;
  const main = document.querySelector("main");
  return (main?.innerText ?? "").trim().length >= 400;
}

export function OrbitHome({
  onPick,
  prompts,
}: {
  onPick: (q: string) => void;
  prompts: string[];
}) {
  const questions = [...new Set([...prompts, ...ORBIT_QUESTION_POOL])];

  return (
    <div className="orbit-home">
      <section className="orbit-home__hero">
        <OrbitMark size={64} />
        <h2 className="orbit-home__title">Hi there, how can we help?</h2>
        <p className="orbit-home__lead">
          I&apos;m Orbit, Quantalog&apos;s AI assistant. Ask about tracking, plans or privacy —
          answers come back in seconds.
        </p>
      </section>

      <section className="space-y-2">
        <p className="orbit-home__label">Suggested</p>
        {hasSummarisablePage() && (
          <OrbitSuggestion question={SUMMARISE_PROMPT} onPick={onPick} icon={FileText} />
        )}
        <OrbitRotatingSuggestions questions={questions} onPick={onPick} />
      </section>

      <p className="orbit-home__footer">
        Need more help?
        {ORBIT_HELP_LINKS.map(({ label, href }) => (
          <Link key={href} href={href} className="orbit-home__footer-link">
            {label}
          </Link>
        ))}
      </p>
    </div>
  );
}
