import { MAP_HEIGHT, MAP_WIDTH, type CountryShape } from "./world-shapes";
import { flagAccent } from "./flag-palette";

export const CALLOUT = { height: 40, padLeft: 22, radius: 7 };
export const UNIT = 0.52;

const PAD_RIGHT = 12;
const MIN_TEXT = 34;
const CHAR_WIDTH = 6.1;
const MAX_NAME = 16;
const MARGIN = 8;
const GAP = 8;
const KNEE = 14;
const ANCHOR_BOX = 7;
const SIDE_OFFSETS = [36, 64, 96, 136, 184];
const SHIFTS = [0, -26, 26, -52, 52, -84, 84, -120, 120];
const STACK_OFFSETS = [30, 56, 86];
const LINE_HIT = 400;
const ANCHOR_COVER = 4000;
const ANCHOR_CROSS = 40;
const COUNTRY_HIT = 0.03;
const FALLBACK_TONES = ["#f59e0b", "#2563eb", "#6d28d9", "#059669", "#e11d48", "#0891b2"];

export type Ranked = { shape: CountryShape; code: string; count: number };

export type Spotlight = Ranked & {
  label: string;
  share: number;
  tone: string;
  x: number;
  y: number;
  width: number;
  unit: number;
  leader: string;
};

type Rect = { x: number; y: number; w: number; h: number };
type Point = [number, number];

const overlapArea = (a: Rect, b: Rect) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  return w > 0 && h > 0 ? w * h : 0;
};

const grow = (r: Rect, by: number): Rect => ({ x: r.x - by, y: r.y - by, w: r.w + by * 2, h: r.h + by * 2 });

const contains = (r: Rect, [x, y]: Point) => x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;

const fit = (name: string) => (name.length > MAX_NAME ? `${name.slice(0, MAX_NAME - 1)}…` : name);

const shapeRect = ({ bounds: [[x0, y0], [x1, y1]] }: CountryShape): Rect => ({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function sample(points: Point[]): Point[] {
  const out: Point[] = [];
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    for (let t = 0; t <= 1; t += 0.1) out.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
  }
  return out;
}

function leaderPoints([ax, ay]: Point, r: Rect): Point[] {
  if (r.x >= ax || r.x + r.w <= ax) {
    const left = r.x + r.w <= ax;
    const edgeX = left ? r.x + r.w : r.x;
    const edgeY = r.y + r.h / 2;
    const knee = KNEE * UNIT;
    return [[ax, ay], [left ? edgeX + knee : edgeX - knee, edgeY], [edgeX, edgeY]];
  }
  return [[ax, ay], [ax, r.y >= ay ? r.y : r.y + r.h]];
}

type Layout = { placed: Rect[]; lines: Point[][]; countries: Rect[]; anchors: Rect[] };

function candidates([ax, ay]: Point, w: number, h: number): Rect[] {
  const out: Rect[] = [];
  for (const offset of SIDE_OFFSETS) {
    for (const shift of SHIFTS) {
      const y = ay - h / 2 + shift * UNIT;
      out.push({ x: ax + offset * UNIT, y, w, h }, { x: ax - offset * UNIT - w, y, w, h });
    }
  }
  for (const offset of STACK_OFFSETS) {
    out.push({ x: ax - w / 2, y: ay - offset * UNIT - h, w, h }, { x: ax - w / 2, y: ay + offset * UNIT, w, h });
  }
  return out;
}

function place(anchor: Point, own: number, w: number, layout: Layout): { rect: Rect; line: Point[] } {
  const { placed, lines, countries, anchors } = layout;
  const h = CALLOUT.height * UNIT;
  const inBounds = (r: Rect) =>
    r.x >= MARGIN && r.y >= MARGIN && r.x + r.w <= MAP_WIDTH - MARGIN && r.y + r.h <= MAP_HEIGHT - MARGIN;

  let best: { rect: Rect; line: Point[] } | null = null;
  let bestCost = Infinity;
  for (const r of candidates(anchor, w, h)) {
    if (!inBounds(r)) continue;
    if (placed.some((p) => overlapArea(grow(p, GAP * UNIT), r) > 0)) continue;
    const line = leaderPoints(anchor, r);
    const ownSamples = sample(line);
    let cost = Math.hypot(r.x + r.w / 2 - anchor[0], r.y + r.h / 2 - anchor[1]);
    for (const c of countries) cost += overlapArea(r, c) * COUNTRY_HIT;
    anchors.forEach((a, i) => {
      if (i === own) return;
      if (overlapArea(r, a) > 0) cost += ANCHOR_COVER;
      if (ownSamples.some((p) => contains(a, p))) cost += ANCHOR_CROSS;
    });
    for (const p of placed) if (ownSamples.some((pt) => contains(grow(p, GAP / 2), pt))) cost += LINE_HIT;
    for (const l of lines) if (sample(l).some((pt) => contains(grow(r, GAP / 2), pt))) cost += LINE_HIT;
    if (cost < bestCost) {
      bestCost = cost;
      best = { rect: r, line };
    }
  }
  if (best) return best;
  const rect = { x: Math.min(anchor[0] + SIDE_OFFSETS[0] * UNIT, MAP_WIDTH - MARGIN - w), y: anchor[1] - h / 2, w, h };
  return { rect, line: leaderPoints(anchor, rect) };
}

export function buildSpotlights(ranked: Ranked[], total: number, limit: number): Spotlight[] {
  const top = ranked.slice(0, limit);
  const layout: Layout = {
    placed: [],
    lines: [],
    countries: top.map((r) => grow(shapeRect(r.shape), 2)),
    anchors: top.map(({ shape: { anchor: [x, y] } }) => {
      const b = ANCHOR_BOX * UNIT;
      return { x: x - b, y: y - b, w: b * 2, h: b * 2 };
    }),
  };

  return top.map((r, index) => {
    const label = fit(regionNames.of(r.code) ?? r.shape.name);
    const width = Math.ceil(CALLOUT.padLeft + Math.max(MIN_TEXT, label.length * CHAR_WIDTH) + PAD_RIGHT);
    const { rect, line } = place(r.shape.anchor, index, width * UNIT, layout);
    layout.placed.push(rect);
    layout.lines.push(line);
    return {
      ...r,
      label,
      share: r.count / total,
      tone: flagAccent(r.code) ?? FALLBACK_TONES[index % FALLBACK_TONES.length],
      x: rect.x,
      y: rect.y,
      width,
      unit: UNIT,
      leader: line.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" "),
    };
  });
}

export function formatShare(share: number): string {
  const pct = share * 100;
  if (pct > 0 && pct < 1) return "<1%";
  return `${Math.round(pct)}%`;
}
