import {
  AtSign,
  CalendarDays,
  ChevronDown,
  GripVertical,
  Hash,
  Star,
  Type,
  Upload,
} from "lucide-react";

const palette = [
  { icon: Type, label: "Short text" },
  { icon: AtSign, label: "Email" },
  { icon: Hash, label: "Number" },
  { icon: CalendarDays, label: "Date" },
  { icon: Star, label: "Rating" },
  { icon: Upload, label: "File" },
];

function CanvasField({
  label,
  children,
  active = false,
}: {
  label: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 transition ${
        active
          ? "border-accent/50 bg-accent/[0.06] ring-1 ring-accent/20"
          : "border-border bg-bg"
      }`}
    >
      <div className="flex items-center gap-2">
        <GripVertical
          className="h-3.5 w-3.5 shrink-0 text-fg-faint"
          aria-hidden="true"
        />
        <span className="text-[11px] font-medium text-fg">{label}</span>
      </div>
      <div className="mt-2 pl-[1.375rem]">{children}</div>
    </div>
  );
}

function InputShape({ text }: { text?: string }) {
  return (
    <div className="flex h-7 items-center rounded-md border border-border bg-bg-subtle px-2.5 text-[11px] text-fg-faint">
      {text}
    </div>
  );
}

export function FormBuilderPreview() {
  return (
    <div
      className="card overflow-hidden"
      role="img"
      aria-label="The Quantalog form builder: a palette of field types on the left, and a contact form being assembled on the right with name, email, rating and a conditional phone number field."
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/25" />
        </div>
        <p className="ml-1 text-[11px] font-medium text-fg-muted">
          Contact form — editing
        </p>
      </div>

      <div className="grid sm:grid-cols-[9.5rem_1fr]">

        <div className="border-b border-border p-3 sm:border-b-0 sm:border-r">
          <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-faint">
            Fields
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:grid-cols-2">
            {palette.map((p) => (
              <div
                key={p.label}
                className="flex flex-col items-center gap-1.5 rounded-md border border-border bg-bg px-1.5 py-2 text-center"
              >
                <p.icon
                  className="h-3.5 w-3.5 text-accent"
                  aria-hidden="true"
                />
                <span className="text-[9px] leading-tight text-fg-muted">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 bg-bg-subtle/40 p-4">
          <CanvasField label="Full name">
            <InputShape text="Jane Doe" />
          </CanvasField>

          <CanvasField label="Email">
            <InputShape text="jane@example.com" />
          </CanvasField>

          <CanvasField label="How did you hear about us?">
            <div className="flex h-7 items-center justify-between rounded-md border border-border bg-bg-subtle px-2.5 text-[11px] text-fg-faint">
              Search
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </div>
          </CanvasField>

          <CanvasField label="Phone number" active>
            <InputShape />
            <div className="mt-2 flex items-center gap-1.5 rounded-md bg-accent/10 px-2 py-1">
              <span className="text-[10px] font-medium text-accent">
                Shown only if
              </span>
              <span className="text-[10px] text-fg-muted">
                “Prefer a callback” is Yes
              </span>
            </div>
          </CanvasField>
        </div>
      </div>
    </div>
  );
}
