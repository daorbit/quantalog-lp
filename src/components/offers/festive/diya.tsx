export function Diya() {
  return (
    <svg viewBox="0 0 32 32" className="offer-diya" aria-hidden="true">
      <g className="offer-diya__flame">
        <path d="M16 2.5c3.2 4.6 4.8 7.7 4.8 10.4a4.8 4.8 0 0 1-9.6 0c0-2.7 1.6-5.8 4.8-10.4z" />
        <path className="offer-diya__core" d="M16 8.5c1.5 2.3 2.3 3.8 2.3 5.1a2.3 2.3 0 0 1-4.6 0c0-1.3.8-2.8 2.3-5.1z" />
      </g>
      <path className="offer-diya__bowl" d="M3 19.5h26c-.6 5.6-6.2 9.5-13 9.5S3.6 25.1 3 19.5z" />
      <ellipse className="offer-diya__rim" cx="16" cy="19.5" rx="13" ry="2.4" />
      <g className="offer-diya__dots">
        <circle cx="10" cy="24" r="0.9" />
        <circle cx="16" cy="25.5" r="0.9" />
        <circle cx="22" cy="24" r="0.9" />
      </g>
    </svg>
  );
}
