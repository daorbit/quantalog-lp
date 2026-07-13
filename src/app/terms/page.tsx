import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms that govern use of ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 13, 2026">
      <p>
        These terms govern your use of {site.name}. By creating an account you agree
        to them.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for keeping your password and API keys secret, and for
        everything done with them. Tell us immediately if a key is exposed and we
        will help you rotate it.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Only install the tracker on sites you own or are authorised to instrument.</li>
        <li>
          Do not use the service to collect personal data through custom properties,
          or to circumvent the privacy design described in our privacy policy.
        </li>
        <li>Do not attempt to read data belonging to another workspace.</li>
        <li>Do not resell raw access to the API outside the terms of a Platform plan.</li>
      </ul>

      <h2>Plans and billing</h2>
      <p>
        Paid plans are billed monthly in advance and can be cancelled at any time;
        cancellation takes effect at the end of the current period. If you exceed
        your pageview allowance we will contact you before restricting anything.
      </p>

      <h2>Availability</h2>
      <p>
        We aim for high availability and publish an SLA on Platform plans. On free
        plans the service is provided as-is, without a uptime guarantee.
      </p>

      <h2>Your data</h2>
      <p>
        The analytics data collected for your sites belongs to you. You can export or
        delete it at any time. If you close your account we delete it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. Material changes will be announced by email before
        they take effect.
      </p>

      <h2>Contact</h2>
      <p>
        Reach us at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
