import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} collects, hashes and stores analytics data — and what it deliberately does not collect.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="July 13, 2026">
      <p>
        This page describes what {site.name} collects on the sites that embed our
        tracker, and what we collect from you as a customer of ours. It is written
        to be read, not to be survived.
      </p>

      <h2>What the tracker collects</h2>
      <p>
        When someone visits a site running our script, we receive the page path,
        the referrer, the screen size, any UTM parameters in the query string, and
        the HTTP request itself. From the request we derive the device type,
        operating system, browser and country.
      </p>

      <h2>What the tracker does not collect</h2>
      <ul>
        <li>No cookies are set, and nothing is written to localStorage.</li>
        <li>No cross-site identifier is created, so no browsing profile exists.</li>
        <li>No raw IP address is stored. It is hashed on receipt and discarded.</li>
        <li>No form input, keystrokes, session recordings or mouse movement.</li>
      </ul>

      <h2>How visitors are counted</h2>
      <p>
        A visitor is a SHA-256 hash of the IP address, the user agent, the site key
        and a salt that rotates every day. Because the salt changes daily, the same
        person visiting tomorrow appears as a new visitor, and the same person on
        two different sites produces two unrelated hashes. The hash cannot be
        reversed into an identity.
      </p>

      <h2>Data we hold about you as a customer</h2>
      <p>
        Your name, your email address, a bcrypt hash of your password, and the
        workspaces and sites you create. If you subscribe to a paid plan, payment
        is handled by our payment processor and we never see your card details.
      </p>

      <h2>Retention and deletion</h2>
      <p>
        Event data is retained according to your plan — 30 days on Hobby, 2 years on
        Pro. You can export or permanently delete a site&apos;s data at any time from
        the dashboard, and deleting your account removes everything associated with
        it.
      </p>

      <h2>Sub-processors</h2>
      <p>
        Data is stored in MongoDB Atlas and served from Vercel. We do not sell data,
        share it with advertising networks, or use it to train anything.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about any of this go to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
