import { FieldDropOff, SparkStat } from "../charts";

export function FormDropoffPreview() {
  return (
    <div className="tile tile--static overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-4 sm:px-8">
        <p className="text-[15px] font-semibold tracking-tight text-fg">Contact form — last 30 days</p>
        <p className="text-[12px] text-fg-faint">Sample data</p>
      </div>

      <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <SparkStat
          label="Views"
          value="2,480"
          delta="+9.2%"
          series={[62, 66, 64, 71, 69, 74, 72, 78, 76, 81, 79, 84, 83, 87]}
        />
        <SparkStat
          label="Submissions"
          value="412"
          delta="+4.1%"
          series={[11, 12, 12, 13, 12, 14, 13, 15, 14, 15, 15, 16, 16, 17]}
          delay={0.1}
        />
        <SparkStat
          label="Completion rate"
          value="16.6%"
          delta="−2.8%"
          up={false}
          series={[21, 21, 20, 20, 19, 19, 18, 18, 18, 17, 17, 17, 17, 16]}
          delay={0.2}
        />
      </div>

      <div className="border-t border-border p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[13px] font-medium text-fg-faint">Drop-off by field</p>
          <p className="text-[12px] text-fg-faint">2,480 opened the form · 412 finished it</p>
        </div>
        <div className="mt-5">
          <FieldDropOff
            rows={[
              { label: "Name", reached: 2480, abandoned: 190 },
              { label: "Email", reached: 2290, abandoned: 240 },
              { label: "Phone number", reached: 2050, abandoned: 980 },
              { label: "Company size", reached: 1070, abandoned: 310 },
              { label: "Message", reached: 760, abandoned: 348 },
            ]}
          />
        </div>
        <p className="mt-6 border-t border-border pt-5 text-[15px] leading-relaxed text-fg-muted">
          <span className="font-medium text-fg">Phone number loses 48% of everyone who reaches it</span> —
          more than the other four fields combined. The fix is one setting, and it is only findable because
          the chart exists: make it optional, or show it only to people who want a callback.
        </p>
      </div>
    </div>
  );
}
