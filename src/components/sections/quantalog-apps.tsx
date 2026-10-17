"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "../ui";
import { SegmentedControl } from "../segmented-control";
import { APP_CATEGORIES, allApps, type AppCategory } from "../apps-carousel/app-items";
import { AppCard } from "../apps-carousel/app-card";
import { ShelfControls } from "../apps-carousel/shelf-controls";
import { useShelf } from "../apps-carousel/use-shelf";

const TRACK_ID = "apps-shelf";

export function QuantalogApps() {
  const [category, setCategory] = useState<AppCategory | "all">("all");
  const apps = useMemo(() => (category === "all" ? allApps : allApps.filter((a) => a.category === category)), [category]);
  const shelf = useShelf(category);

  return (
    <section id="apps" className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Apps"
          title="Everything you use, connected."
          body="Built-in Quantalog apps you switch on for your whole team, and the tools you already rely on, from Slack and WhatsApp to Razorpay and Google Sheets."
          centered
        />
        <div className="mt-8 sm:mt-10">
          <SegmentedControl
            options={APP_CATEGORIES}
            value={category}
            onChange={(id) => setCategory(id as AppCategory | "all")}
            label="Filter apps"
            idPrefix="apps-filter"
            controls={TRACK_ID}
          />
        </div>
      </div>

      <div
        id={TRACK_ID}
        ref={shelf.ref}
        role="tabpanel"
        aria-label={`${apps.length} apps`}
        className="apps-track mt-8 sm:mt-10"
      >
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      <ShelfControls
        progress={shelf.progress}
        ratio={shelf.ratio}
        atStart={shelf.atStart}
        atEnd={shelf.atEnd}
        onPrev={shelf.prev}
        onNext={shelf.next}
      />
    </section>
  );
}
