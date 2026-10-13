"use client";

import { useCallback, useMemo, useState } from "react";
import { DEFAULT_DAY, slotsFor } from "./booking-data";

export function useBookingDemo() {
  const [day, setDay] = useState(DEFAULT_DAY);
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const slots = useMemo(() => slotsFor(day), [day]);

  const pickDay = useCallback((next: number) => {
    setDay(next);
    setSlot(null);
  }, []);

  const confirm = useCallback(() => {
    if (slot) setConfirmed(true);
  }, [slot]);

  const reset = useCallback(() => {
    setConfirmed(false);
    setSlot(null);
  }, []);

  return { day, slot, slots, confirmed, pickDay, pickSlot: setSlot, confirm, reset };
}

export type BookingDemo = ReturnType<typeof useBookingDemo>;
