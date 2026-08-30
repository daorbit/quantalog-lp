"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * One fetch of the public plan data for the whole session.
 *
 * `Pricing` lives on the homepage only, so every time a visitor leaves the
 * homepage and comes back Next.js remounts it and it refetched `/plans` and
 * `/plans/orbit`. This provider sits in the root layout — which does not
 * unmount on client navigation — so the request happens once and the result
 * is handed to whatever mounts later.
 *
 * Two layers of cache:
 *  - a module-scoped promise, so a remount within the same page load reuses
 *    the in-flight or settled request rather than starting a new one;
 *  - `sessionStorage`, so a full reload during the same browsing session
 *    paints from cache and revalidates in the background.
 *
 * The shapes are intentionally `unknown[]` here — `Pricing` owns the typed
 * views. This layer only cares about "did it load".
 */

type PlansState = {
  plans: unknown[] | null;
  orbitPlans: unknown[] | null;
  /** The main plan list failed. The Orbit list failing is folded into `[]`. */
  error: boolean;
};

const EMPTY: PlansState = { plans: null, orbitPlans: null, error: false };

const PlansContext = createContext<PlansState>(EMPTY);

/** Read the shared plan data. Returns nulls until the one fetch resolves. */
export function usePlans() {
  return useContext(PlansContext);
}

const SS_KEY = "quantalog:plans:v1";

type Cache = { plans: unknown[] | null; orbitPlans: unknown[] };

// Module scope: survives component remounts within a single page load.
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
    // Private mode / quota — the module-scoped promise still de-dupes.
  }
}

async function loadPlans(): Promise<Cache> {
  // `/plans` is the one that can put the price list into an error state.
  const plansReq = fetch(`${site.api}/api/public/plans`).then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json() as Promise<unknown[]>;
  });

  // The Orbit row is additive: a failure hides one section, it does not
  // replace the price list with an error — so it resolves to [].
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

/** Kick off (or reuse) the single request. */
function getPlans(): Promise<Cache> {
  if (!inflight) inflight = loadPlans().catch((err) => {
    // Let a later mount retry rather than caching the rejection forever.
    inflight = null;
    throw err;
  });
  return inflight;
}

export function PlansProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PlansState>(() => {
    // Paint immediately from sessionStorage if this session already has it.
    const cached = typeof window !== "undefined" ? readSession() : null;
    return cached
      ? { plans: cached.plans, orbitPlans: cached.orbitPlans, error: false }
      : EMPTY;
  });

  useEffect(() => {
    let cancelled = false;

    // Even with a cached paint, revalidate once so a stale price list cannot
    // sit around for a whole session.
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
            // Keep any cached paint; only show the error state with nothing.
            prev.plans ? prev : { plans: null, orbitPlans: [], error: true },
          );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <PlansContext.Provider value={state}>{children}</PlansContext.Provider>;
}
