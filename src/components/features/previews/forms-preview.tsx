import { OrbitMark } from "../../orbit/orbit-mark";
import { PreviewFrame } from "../preview-frame";
import { Meter } from "./meter";

const fields = [
  { label: "Full name", kept: 96 },
  { label: "Work email", kept: 91 },
  { label: "Phone number", kept: 58, worst: true },
  { label: "What do you need?", kept: 52 },
];

export function FormsPreview() {
  return (
    <PreviewFrame title="Forms" context="Demo request" meta="214 entries">
      <div className="flex items-start gap-3 rounded-xl bg-bg-subtle p-3.5">
        <OrbitMark size={24} />
        <p className="text-[13px] leading-relaxed text-fg-muted">
          <span className="font-medium text-fg">Build with Orbit:</span> &ldquo;A demo
          request form with company size and a phone number&rdquo;
        </p>
      </div>

      <p className="mt-5 text-[13px] font-medium text-fg">Where people stop</p>
      <ul className="mt-3 space-y-3.5">
        {fields.map((f) => (
          <li key={f.label}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px]">
              <span className={f.worst ? "font-medium text-fg" : "text-fg"}>{f.label}</span>
              <span className={`tabular-nums ${f.worst ? "font-medium text-fg" : "text-fg-muted"}`}>
                {f.kept}% still here
              </span>
            </div>
            <Meter value={f.kept} label={`${f.label}: ${f.kept}% of visitors still on the form`} />
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-fg-muted">
        <span className="font-medium text-fg">Phone number</span> loses about a
        third of the people who reach it — measured per field, not per form.
      </p>
    </PreviewFrame>
  );
}
