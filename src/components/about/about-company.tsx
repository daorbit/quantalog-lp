import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { aboutFaqs, companyFacts } from "./about-data";

export function AboutCompany() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="v-rise">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Company</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            The team behind it.
          </h2>

          <dl className="mt-8 divide-y divide-border border-y border-border">
            {companyFacts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="text-[14px] text-fg-muted">{f.label}</dt>
                <dd className="text-right text-[14px] font-medium text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 space-y-2.5 text-[14px]">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 text-fg transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 text-fg transition-colors hover:text-accent"
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="v-rise v-d1">
          <h3 className="text-[1.25rem] font-semibold tracking-tight text-fg">Common questions</h3>
          <dl className="mt-5 space-y-3">
            {aboutFaqs.map((f) => (
              <div key={f.q} className="rounded-(--radius-card) border border-border bg-surface px-5 py-5 sm:px-6">
                <dt className="text-[16px] font-medium text-fg">{f.q}</dt>
                <dd className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
