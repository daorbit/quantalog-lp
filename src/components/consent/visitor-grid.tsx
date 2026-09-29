const TOTAL = 100;
const LOST = 45;

function pickLost(): Set<number> {
  const order = Array.from({ length: TOTAL }, (_, i) => i);
  let seed = 20260929;
  for (let i = order.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return new Set(order.slice(0, LOST));
}

const lost = pickLost();

export function VisitorGrid({ active, showLoss }: { active: boolean; showLoss: boolean }) {
  return (
    <div className="w-full max-w-[22rem]">
      <div
        className="visitor-grid"
        data-active={active || undefined}
        role="img"
        aria-label={
          showLoss
            ? `${TOTAL - LOST} of ${TOTAL} visitors recorded; ${LOST} lost to the cookie banner`
            : `All ${TOTAL} visitors recorded`
        }
      >
        {Array.from({ length: TOTAL }, (_, i) => (
          <span key={i} className="visitor-dot" data-lost={(showLoss && lost.has(i)) || undefined} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6 text-[13px] text-fg-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
          Recorded
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-border-strong" aria-hidden="true" />
          Never counted
        </span>
      </div>
    </div>
  );
}
