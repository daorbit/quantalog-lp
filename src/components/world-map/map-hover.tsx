"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { MapTooltip, type MapHit } from "./map-tooltip";

const OFFSET = 16;

export function MapHover({ countries, viewBox, children }: { countries: number; viewBox: string; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const focus = useRef<SVGGElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const active = useRef<SVGPathElement | null>(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });
  const [hit, setHit] = useState<MapHit | null>(null);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const placeTip = () => {
    frame.current = 0;
    const el = tip.current;
    const wrap = box.current;
    if (!el || !wrap) return;
    const { x, y } = point.current;
    const flip = x + el.offsetWidth + OFFSET * 2 > wrap.clientWidth;
    const left = flip ? x - el.offsetWidth - OFFSET : x + OFFSET;
    el.style.transform = `translate3d(${left}px, ${y - el.offsetHeight / 2}px, 0)`;
  };

  const clear = () => {
    active.current = null;
    focus.current?.replaceChildren();
    box.current?.removeAttribute("data-hovering");
    setHit(null);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const wrap = box.current;
    const el = (e.target as Element).closest<SVGPathElement>("path[data-country]");
    if (!wrap || !el) {
      if (active.current) clear();
      return;
    }

    if (active.current !== el) {
      active.current = el;
      const copy = el.cloneNode() as SVGPathElement;
      copy.removeAttribute("filter");
      copy.setAttribute("fill-opacity", "1");
      focus.current?.replaceChildren(copy);
      wrap.setAttribute("data-hovering", "");
      const { country, tone, rank, visitors, views, share } = el.dataset;
      setHit({ name: country ?? "", tone, rank: rank ?? "", visitors: visitors ?? "", views: views ?? "", share: share ?? "" });
    }

    const rect = wrap.getBoundingClientRect();
    point.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!frame.current) frame.current = requestAnimationFrame(placeTip);
  };

  return (
    <div ref={box} className="map-hover" onPointerMove={onMove} onPointerLeave={clear}>
      {children}
      <div className="map-dim" aria-hidden="true" />
      <svg viewBox={viewBox} className="map-focus" aria-hidden="true">
        <g ref={focus} />
      </svg>
      <MapTooltip ref={tip} hit={hit} countries={countries} />
    </div>
  );
}
