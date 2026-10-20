import { longDay } from "./booking-data";

type Props = {
  day: number;
  slots: string[];
  slot: string | null;
  cueSlot?: string;
  cueConfirm: boolean;
  onPick: (slot: string) => void;
  onConfirm: () => void;
};

export function BookingSlots({ day, slots, slot: picked, cueSlot, cueConfirm, onPick, onConfirm }: Props) {
  return (
    <div className="border-t border-border p-6 sm:border-l sm:border-t-0 sm:px-4">
      <p className="text-[13px] font-semibold">{longDay(day)}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-1">
        {slots.map((slot) =>
          slot === picked ? (
            <div key={slot} className="col-span-3 grid grid-cols-2 gap-2 sm:col-span-1">
              <span className="bm-slot bm-slot--picked">{slot}</span>
              <button
                type="button"
                className="bm-slot bm-slot--confirm"
                data-cue={cueConfirm || undefined}
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          ) : (
            <button
              key={slot}
              type="button"
              className="bm-slot"
              data-cue={slot === cueSlot || undefined}
              onClick={() => onPick(slot)}
            >
              {slot}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
