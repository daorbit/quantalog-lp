import { A, Callout, H2, H3, Li, P, Ul } from "@/components/prose";
import type { LegalHighlight } from "@/components/legal/legal-data";
import { site } from "@/lib/site";

export const DPA_LEAD = `How ${site.legalName} processes personal data on your behalf when you use ${site.name} — the commitments a controller needs from its processor.`;

export const DPA_HIGHLIGHTS: readonly LegalHighlight[] = [
  {
    title: "You control the data",
    body: "You are the controller. We process analytics and form data only to run the service, on your instructions.",
  },
  {
    title: "Minimal by design",
    body: "The tracker stores no cookies and no raw IP addresses, so most analytics data is not personal data at all.",
  },
  {
    title: "Breaches reported promptly",
    body: "If a breach affects your data, we tell you without undue delay with what you need to meet your own duties.",
  },
  {
    title: "Deleted when you leave",
    body: "Delete a site or close your account and its data is permanently removed from the live system.",
  },
];

export function DpaBody() {
  return (
    <>
      <H2 id="scope">1. Scope and how this applies</H2>
      <P>
        This Data Processing Addendum (&ldquo;DPA&rdquo;) forms part of the{" "}
        <A href="/terms">Terms of Service</A> between you (the &ldquo;Customer&rdquo;) and{" "}
        {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;), which operates {site.name}. It applies
        whenever we process personal data on your behalf while providing the Service, and it takes effect
        automatically when you accept the Terms. If this DPA and the Terms conflict on the processing of
        personal data, this DPA prevails.
      </P>
      <P>
        If your organisation needs a countersigned copy for its records, email{" "}
        <A href={`mailto:${site.email}`}>{site.email}</A> and we will send one.
      </P>

      <H2 id="definitions">2. Definitions</H2>
      <P>
        &ldquo;Personal data&rdquo;, &ldquo;controller&rdquo;, &ldquo;processor&rdquo;, &ldquo;data
        subject&rdquo;, &ldquo;processing&rdquo; and &ldquo;personal data breach&rdquo; have the meanings
        given in the applicable data protection law, including the EU and UK GDPR and India&apos;s Digital
        Personal Data Protection Act, 2023 (&ldquo;Data Protection Law&rdquo;). Where a law uses
        different terms, such as &ldquo;data fiduciary&rdquo; and &ldquo;data processor&rdquo;, the
        equivalent meaning applies.
      </P>

      <H2 id="roles">3. Roles of the parties</H2>
      <P>
        For data collected by the tracker on your websites and apps, for responses submitted to your
        forms, and for content you upload to your workspaces (&ldquo;Customer Data&rdquo;), you are the
        controller and we are your processor. For your own account, billing and support information, we
        act as an independent controller, as described in our <A href="/privacy">Privacy Policy</A>.
      </P>
      <P>
        You are responsible for having a lawful basis for the data you collect through the Service and for
        any notices your visitors and respondents need. Our <A href="/terms">Terms</A> forbid sending
        directly identifying personal data through custom event properties.
      </P>

      <H2 id="details">4. Details of the processing</H2>
      <H3 id="subject-matter">Subject matter, nature and purpose</H3>
      <P>
        Collecting, storing, aggregating and displaying analytics; storing form responses; generating
        reports, audits and AI answers you request; and providing the related support — solely to provide
        the Service to you.
      </P>
      <H3 id="duration">Duration</H3>
      <P>
        For as long as you use the Service, and until Customer Data is deleted under section 11.
      </P>
      <H3 id="data-subjects">Categories of data subjects</H3>
      <Ul>
        <Li>visitors to websites and users of apps on which you install the tracker or SDK;</Li>
        <Li>people who submit your forms; and</Li>
        <Li>members of your workspaces whose activity appears in the Service.</Li>
      </Ul>
      <H3 id="data-categories">Categories of personal data</H3>
      <Ul>
        <Li>
          pseudonymous analytics: page addresses, referrers, campaign parameters, screen size, device type,
          browser, operating system, country, and a daily-rotating visitor hash;
        </Li>
        <Li>app user identifiers, if you choose to send them through the Platform API or mobile SDK;</Li>
        <Li>form responses, which contain whatever your form asks for; and</Li>
        <Li>custom events and properties you choose to send.</Li>
      </Ul>
      <Callout title="What the tracker never stores">
        No cookies or browser storage, no raw IP addresses, and no identifier that follows a visitor across
        days or websites. The IP address is used only at the moment of the request to derive the country
        and the visitor hash, and is then discarded.
      </Callout>
      <P>
        The Service is not designed for special categories of personal data, such as health or biometric
        data. Do not collect them through the tracker or forms unless your own legal basis and safeguards
        allow it.
      </P>

      <H2 id="instructions">5. Processing on your instructions</H2>
      <P>
        We process Customer Data only on your documented instructions. The Terms, this DPA and the settings
        you choose in the Service are your complete instructions. If we believe an instruction breaks Data
        Protection Law, we will tell you. If the law requires us to process Customer Data in another way,
        we will tell you first unless the law forbids it.
      </P>

      <H2 id="confidentiality">6. Confidentiality</H2>
      <P>
        Everyone we authorise to process Customer Data is bound by a duty of confidentiality, and access
        is limited to the people who need it to run and support the Service.
      </P>

      <H2 id="security">7. Security measures</H2>
      <P>We maintain technical and organisational measures appropriate to the risk, including:</P>
      <Ul>
        <Li>TLS encryption for all data in transit;</Li>
        <Li>passwords stored only as one-way bcrypt hashes;</Li>
        <Li>access tokens for connected accounts encrypted at rest;</Li>
        <Li>workspace-level access control enforced on every request, with role-based permissions;</Li>
        <Li>session revocation, optional two-factor authentication and an idle screen lock;</Li>
        <Li>production access limited to the people who need it; and</Li>
        <Li>data minimisation in the tracker itself, as described in section 4.</Li>
      </Ul>
      <P>
        We review these measures as the Service and the risks change, and will not reduce the overall level
        of protection during your use of the Service.
      </P>

      <H2 id="sub-processors">8. Sub-processors</H2>
      <P>
        You authorise us to use the following sub-processors to provide the Service. Each one is bound by
        written terms that protect Customer Data at least as well as this DPA, and we remain responsible
        for their performance.
      </P>
      <Ul>
        <Li>
          <b>MongoDB Atlas</b> — database hosting.
        </Li>
        <Li>
          <b>Vercel</b> — application hosting.
        </Li>
        <Li>
          <b>Cloudflare</b> — content delivery and network security, and Workers AI, which runs Orbit.
        </Li>
        <Li>
          <b>Cloudinary</b> — storage for images and files you upload.
        </Li>
        <Li>
          <b>Razorpay</b> and <b>Cashfree</b> — payment processing.
        </Li>
        <Li>
          <b>Email and WhatsApp delivery providers</b> — sending reports and notifications you set up.
        </Li>
        <Li>
          <b>Google, LinkedIn and Meta</b> — only when you connect an account with them.
        </Li>
      </Ul>
      <P>
        We will update this list before a new sub-processor starts processing Customer Data. If you have a
        reasonable data protection objection to a new sub-processor, tell us within 30 days. We will try
        to resolve it; if we cannot, you may stop using the affected part of the Service or close your
        account.
      </P>

      <H2 id="assistance">9. Helping you meet your obligations</H2>
      <P>
        Most data subject requests can be handled directly in the dashboard, where you can export or
        permanently delete a site&apos;s data. Where you need more, we will reasonably help you respond to
        requests to exercise data subject rights, and with data protection impact assessments and
        consultations with authorities, taking into account the nature of the processing.
      </P>
      <P>
        If a data subject contacts us directly about Customer Data, we will refer them to you. Because the
        tracker does not store identifying data, we usually cannot link records to a specific visitor.
      </P>

      <H2 id="breaches">10. Personal data breaches</H2>
      <P>
        If we become aware of a personal data breach affecting Customer Data, we will notify you without
        undue delay. The notice will describe the nature of the breach, the data and data subjects likely
        affected, the likely consequences, and the steps we have taken or propose, and we will update it as
        more becomes known. Notifying you is not an admission of fault.
      </P>

      <H2 id="deletion">11. Deletion and return</H2>
      <P>
        You can export or delete Customer Data at any time from the dashboard. When you delete a site or
        close your account, we permanently delete the related Customer Data from the live system. Copies
        held in backups are overwritten as backups expire. We keep data longer only where the law requires
        it.
      </P>

      <H2 id="audits">12. Information and audits</H2>
      <P>
        We will make available the information reasonably needed to show that we comply with this DPA.
        Where that information is not enough, you may audit our compliance, at your own cost, no more than
        once a year, with at least 30 days&apos; written notice, during normal business hours and subject
        to reasonable confidentiality terms. Audits must not compromise the security of the Service or of
        other customers&apos; data.
      </P>

      <H2 id="transfers">13. International transfers</H2>
      <P>
        Customer Data may be processed in countries other than your own, including India and the United
        States. Where Data Protection Law restricts a transfer, we rely on an appropriate safeguard, such as
        the standard contractual clauses offered by our sub-processors.
      </P>

      <H2 id="liability">14. Liability</H2>
      <P>
        Each party&apos;s liability under this DPA is subject to the limitations and exclusions in the{" "}
        <A href="/terms">Terms of Service</A>.
      </P>

      <H2 id="changes">15. Changes to this DPA</H2>
      <P>
        We may update this DPA when the Service or the law changes. The date at the top shows the latest
        version. We will not make a change that materially reduces the protection of Customer Data without
        notifying account holders by email before it takes effect.
      </P>

      <H2 id="contact">16. Contact</H2>
      <P>
        For questions about this DPA or to request a signed copy, email{" "}
        <A href={`mailto:${site.email}`}>{site.email}</A> or call {site.phone}. See also our{" "}
        <A href="/privacy">Privacy Policy</A>.
      </P>
    </>
  );
}
