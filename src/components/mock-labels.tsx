/**
 * Capability labels, pinned around the product shot.
 *
 * The same four or five facts a page usually lists as bullets under the
 * screenshot. Placed around it instead, they are read while the reader is
 * already looking at the picture rather than after they have stopped.
 *
 * Hidden below `lg`: on a narrow screen there is no margin to pin anything to,
 * and floating them over the shot would cover the thing they annotate. The
 * copy is repeated in the section body, so nothing is lost when they go.
 */

const labels = [
  { title: "No cookie banner", note: "Nothing to decline", side: "left", top: "14%" },
  { title: "Live in 3 seconds", note: "One script tag", side: "left", top: "48%" },
  { title: "SEO audits built in", note: "Lighthouse-backed", side: "left", top: "78%" },
  { title: "Real-time", note: "Not sampled", side: "right", top: "22%" },
  { title: "Own your data", note: "Export any time", side: "right", top: "56%" },
] as const;

export function MockLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {labels.map((l, i) => (
        <div
          key={l.title}
          className={`absolute ${
            l.side === "left" ? "-left-6 xl:-left-10" : "-right-6 xl:-right-10"
          } v-rise`}
          style={{
            top: l.top,
            // Staggered so they settle in sequence rather than appearing as a
            // ring of boxes around the shot all at once.
            animationDelay: `${0.5 + i * 0.09}s`,
          }}
        >
          <div className="rounded-xl border border-border bg-surface/80 px-3 py-2 shadow-card backdrop-blur">
            <div className="text-[12px] font-medium leading-tight">{l.title}</div>
            <div className="text-[10.5px] leading-tight text-fg-faint">{l.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
