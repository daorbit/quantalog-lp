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
    <LegalPage title="Privacy" updated="August 20, 2026">
      <p>
        This page describes what {site.name} collects on the sites that embed our
        tracker, what we collect from you as a customer, and what happens when you
        connect a third-party account or ask our AI assistant a question. It is
        written to be read, not to be survived.
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
        <li>
          No cookies are set, and the tracker writes nothing to localStorage.
          (This website — not the tracker — stores one flag to remember that you
          closed the newsletter dialog, so it is not shown again. It identifies
          nobody and is never sent anywhere.)
        </li>
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
        is handled by our payment processor (Razorpay) and we never see your card
        details.
      </p>

      <h2>Lead forms you build</h2>
      <p>
        Our forms feature lets you collect responses from your own site&apos;s
        visitors — whatever fields you design the form to ask for. That response
        data belongs to you, not to us: we store it so your form works, we do not
        read it, sell it, or use it for anything of our own. You can set a
        retention window per form so old responses are deleted automatically, and
        you can delete a form&apos;s responses at any time.
      </p>

      <h2>Connecting a social account</h2>
      <p>
        If you connect LinkedIn (or another network we add support for) to
        schedule posts, we store the access token that connection grants, the
        account&apos;s name and profile picture, and a record of what was
        published through it — never anything else from that account, and never
        anything the network itself doesn&apos;t hand us. The token is encrypted
        at rest and is used only to publish the posts you compose and schedule
        yourself. We never post anything you didn&apos;t write, and disconnecting
        the account deletes the stored token immediately.
      </p>

      <h2>Orbit, our AI assistant</h2>
      <p>
        Questions you ask Orbit are sent to a third-party AI model to generate an
        answer — the specific provider (Google Gemini, or one of several models
        reached through OpenRouter, depending on your plan and availability at the
        time) is chosen automatically and is not something we can guarantee in
        advance. We do not store your Orbit conversations on our servers beyond
        what is needed to answer the question in front of you, and we do not use
        anything you ask Orbit to train a model of our own.
      </p>

      <h2>Retention and deletion</h2>
      <p>
        Event data is retained according to your plan — 30 days on Hobby, 2 years on
        Pro. You can export or permanently delete a site&apos;s data at any time from
        the dashboard, and deleting your account removes everything associated with
        it, including any connected social accounts and stored form responses.
      </p>

      <h2>Sub-processors</h2>
      <p>
        Data is stored in MongoDB Atlas and served from Vercel and Cloudflare.
        Images you upload (for scheduled posts or elsewhere in the product) are
        stored with Cloudinary. Payments are processed by Razorpay. We do not sell
        data, share it with advertising networks, or use it to train anything.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about any of this go to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
