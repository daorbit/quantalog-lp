"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/lib/site";

type PlansState = {
  plans: unknown[] | null;
  orbitPlans: unknown[] | null;

  error: boolean;
};

const EMPTY: PlansState = { plans: null, orbitPlans: null, error: false };

const PlansContext = createContext<PlansState>(EMPTY);

export function usePlans() {
  return useContext(PlansContext);
}

const SS_KEY = "quantalog:plans:v1";

type Cache = { plans: unknown[] | null; orbitPlans: unknown[] };

let inflight: Promise<Cache> | null = null;

function readSession(): Cache | null {
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? (JSON.parse(raw) as Cache) : null;
  } catch {
    return null;
  }
}

function writeSession(value: Cache) {
  try {
    sessionStorage.setItem(SS_KEY, JSON.stringify(value));
  } catch {

  }
}

async function loadPlans(): Promise<Cache> {

  const plansReq = fetch(`${site.api}/api/public/plans`).then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json() as Promise<unknown[]>;
  });

  const orbitReq = fetch(`${site.api}/api/public/plans/orbit`)
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json() as Promise<unknown[]>;
    })
    .catch(() => [] as unknown[]);

  const [plans, orbitPlans] = await Promise.all([plansReq, orbitReq]);
  const value: Cache = { plans, orbitPlans };
  writeSession(value);
  return value;
}

function getPlans(): Promise<Cache> {
  if (!inflight) inflight = loadPlans().catch((err) => {

    inflight = null;
    throw err;
  });
  return inflight;
}

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlansState>(() => {

    const cached = typeof window !== "undefined" ? readSession() : null;
    return cached
      ? { plans: cached.plans, orbitPlans: cached.orbitPlans, error: false }
      : EMPTY;
  });

  useEffect(() => {
    let cancelled = false;

    getPlans()
      .then((cache) => {
        if (!cancelled)
          setState({
            plans: cache.plans,
            orbitPlans: cache.orbitPlans,
            error: false,
          });
      })
      .catch(() => {
        if (!cancelled)
          setState((prev) =>

            prev.plans ? prev : { plans: null, orbitPlans: [], error: true },
          );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <PlansContext.Provider value={state}>{children}</PlansContext.Provider>;
}
