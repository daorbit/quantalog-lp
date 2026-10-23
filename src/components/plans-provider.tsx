"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/lib/site";

type PlansState = {
  plans: unknown[] | null;
  error: boolean;
};

const EMPTY: PlansState = { plans: null, error: false };

const PlansContext = createContext<PlansState>(EMPTY);

export function usePlans() {
  return useContext(PlansContext);
}

const SS_KEY = "quantalog:plans:v2";

type Cache = { plans: unknown[] | null };

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
  const response = await fetch(`${site.api}/api/public/plans`);
  if (!response.ok) throw new Error(String(response.status));
  const value: Cache = { plans: (await response.json()) as unknown[] };
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
  // Always starts empty, on both sides. Seeding this from sessionStorage in
  // the initializer made the first client render disagree with the server's
  // (which has no session storage and always rendered the loading state), and
  // React threw that away as a hydration mismatch. The cache is adopted in the
  // effect below instead, which runs after hydration has matched.
  const [state, setState] = useState<PlansState>(EMPTY);

  useEffect(() => {
    let cancelled = false;

    // Paint from the cache immediately if this session already has it, so the
    // spinner does not flash on every navigation; the fetch below still runs
    // and refreshes it.
    const cached = readSession();
    if (cached) {
      setState({ plans: cached.plans, error: false });
    }

    getPlans()
      .then((cache) => {
        if (!cancelled) setState({ plans: cache.plans, error: false });
      })
      .catch(() => {
        if (!cancelled)
          setState((prev) =>

            prev.plans ? prev : { plans: null, error: true },
          );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <PlansContext.Provider value={state}>{children}</PlansContext.Provider>;
}
