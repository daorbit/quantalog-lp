const BULBS = Array.from({ length: 32 }, (_, i) => i);

export function StringLights() {
  return (
    <div className="offer-lights" aria-hidden="true">
      {BULBS.map((i) => (
        <span key={i} />
      ))}
    </div>
  );
}
