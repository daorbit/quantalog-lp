import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          eyebrow="Q Apps"
          title="Everything you use, connected."
          body="Built-in Quantalog Apps you switch on for your whole team, and the tools you already rely on, from Claude and ChatGPT to Slack, WhatsApp, Razorpay and Google Sheets."
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

      <div className="mt-10 text-center sm:mt-12">
        <Link
          href="/apps"
          className="inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
        >
          See all Quantalog Apps and how to set them up
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
