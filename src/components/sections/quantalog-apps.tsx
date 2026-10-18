import { SectionHeading } from "../ui";
import { allApps } from "../apps-carousel/app-items";
import { AppCard } from "../apps-carousel/app-card";

const half = Math.ceil(allApps.length / 2);
const rows = [allApps.slice(0, half), allApps.slice(half)];

export function QuantalogApps() {
  return (
    <section id="apps" className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Apps"
          title="Everything you use, connected."
          body="Built-in Quantalog apps you switch on for your whole team, and the tools you already rely on, from Slack and WhatsApp to Razorpay and Google Sheets."
          centered
        />
      </div>

      <div className="marquee-mask mt-10 space-y-5 overflow-hidden sm:mt-12">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`marquee-track apps-marquee ${r ? "marquee-track--reverse" : ""}`}
          >
            {[...row, ...row].map((app, i) => (
              <div key={`${app.id}-${i}`} className="flex" aria-hidden={i >= row.length || undefined} inert={i >= row.length || undefined}>
                <AppCard app={app} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
