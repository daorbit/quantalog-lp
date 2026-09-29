import { A, Callout, H2, H3, Li, P, Ul } from "@/components/prose";
import type { LegalHighlight } from "@/components/legal/legal-data";
import { site } from "@/lib/site";

export const TERMS_LEAD = `The agreement between you and ${site.legalName} that governs your use of ${site.name}.`;

export const TERMS_HIGHLIGHTS: readonly LegalHighlight[] = [
  {
    title: "Nothing auto-renews",
    body: "Paid plans are one-time payments for a fixed period. No card is stored and you are never charged again without choosing to.",
  },
  {
    title: "Your data is yours",
    body: "Analytics, form responses and scheduled content belong to you. Export or delete them at any time.",
  },
  {
    title: "Use it responsibly",
    body: "Only track sites you control, never send personal data through events, and follow the acceptable use rules.",
  },
  {
    title: "AI output needs review",
    body: "Orbit can be wrong. Check anything it writes before you rely on it or publish it.",
  },
];

export function TermsBody() {
  return (
    <>
      <H2 id="agreement">1. The agreement</H2>
      <P>
        These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and {site.legalName}{" "}
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;), which operates {site.name} (the &ldquo;Service&rdquo;). By
        creating an account or using the Service you accept these Terms and our{" "}
        <A href="/privacy">Privacy Policy</A>.
      </P>
      <P>
        If you use the Service on behalf of an organisation, you confirm you are authorised to accept
        these Terms for it, and &ldquo;you&rdquo; includes that organisation. You must be at least 18
        years old to use the Service.
      </P>

      <H2 id="service">2. The Service</H2>
      <P>
        {site.name} provides privacy-first web analytics together with SEO audits, search visibility,
        scheduled reports, forms, social post scheduling, the Orbit AI assistant and a Platform API.
        Features available to you depend on your plan.
      </P>

      <H2 id="accounts">3. Your account</H2>
      <Ul>
        <Li>Provide accurate information and keep it up to date.</Li>
        <Li>
          Keep your password and API keys confidential. You are responsible for activity carried out
          with them.
        </Li>
        <Li>
          Tell us promptly at <A href={`mailto:${site.email}`}>{site.email}</A> if you suspect
          unauthorised access or a key is exposed, and we will help you rotate it.
        </Li>
      </Ul>

      <H2 id="plans-payments">4. Plans and payments</H2>
      <Ul>
        <Li>The Free plan needs no payment and has no end date.</Li>
        <Li>
          Paid plans and add-on credit packs are bought through Razorpay as one-time payments, for a
          monthly or yearly period. Yearly plans are priced at ten months for twelve.
        </Li>
        <Li>
          <b>Plans do not renew automatically.</b> No card is stored, and a plan simply ends on its
          end date. To continue, you buy the same or a different plan again.
        </Li>
        <Li>Prices are shown and charged in INR or USD. Coupons are applied before payment.</Li>
        <Li>
          Each payment produces a receipt. Receipts are payment receipts, not tax invoices; no GST is
          charged on them. If you need a tax invoice, contact us before purchasing.
        </Li>
        <Li>
          Add-on credits never expire and carry across plan periods and plan changes.
        </Li>
        <Li>
          We may change prices for future purchases. A change never affects a period you have already
          paid for.
        </Li>
      </Ul>

      <H2 id="refunds">5. Refunds</H2>
      <P>
        A plan period starts, and its quota becomes available, the moment payment clears, so payments
        are generally non-refundable. If you were charged twice, charged in error, or the Service was
        unavailable for a substantial part of a period you paid for, email us within 14 days of the
        payment and we will review it and refund where appropriate to the original payment method.
      </P>

      <H2 id="limits">6. Quotas and expiry</H2>
      <Ul>
        <Li>
          Each plan includes a monthly allowance of tracked events, audits and crawls. Unused allowance
          does not roll over.
        </Li>
        <Li>
          When the event allowance is used up, new events are not recorded until the next period.
          Everything already collected stays available.
        </Li>
        <Li>
          When a paid period ends, tracking, audits and crawls pause until a new plan is bought. Your
          data, sites and dashboards are kept.
        </Li>
      </Ul>
      <Callout variant="warn">
        Events that arrive while you are over quota or while a plan has expired are not recorded and
        cannot be recovered later.
      </Callout>

      <H2 id="acceptable-use">7. Acceptable use</H2>
      <P>You agree not to:</P>
      <Ul>
        <Li>install the tracker on a website you do not own or are not authorised to measure;</Li>
        <Li>
          send personal data through custom events or properties, or otherwise work around the privacy
          design described in our Privacy Policy;
        </Li>
        <Li>attempt to access data belonging to another workspace or customer;</Li>
        <Li>
          probe, overload, reverse engineer or disrupt the Service, or bypass its limits or security;
        </Li>
        <Li>
          use forms to collect data or payments unlawfully, or to send spam, phishing or malware;
        </Li>
        <Li>
          connect a social account you are not authorised to post from, or publish content you do not
          have the right to publish;
        </Li>
        <Li>
          use Orbit to create content that is unlawful, infringing, deceptive or that impersonates
          someone without their consent; or
        </Li>
        <Li>resell or sublicense raw access to the Service or API without our written agreement.</Li>
      </Ul>

      <H2 id="your-data">8. Your data and responsibilities</H2>
      <P>
        The analytics collected for your sites, the responses to your forms and the content you schedule
        belong to you. You grant us a limited licence to host, process and display them only as needed
        to provide the Service to you. You can export or delete them at any time.
      </P>
      <P>
        You are responsible for the websites and forms you use with {site.name}, including giving any
        notices and obtaining any permissions the law requires of you. Where we process personal data
        on your behalf, we do so under our <A href="/privacy">Privacy Policy</A>; contact us if your
        organisation needs a data processing agreement.
      </P>

      <H2 id="third-parties">9. Third-party services</H2>
      <P>
        Some features rely on services you connect or that we integrate with, including Google Search
        Console, LinkedIn, Instagram, Razorpay (including your own Razorpay account for form payments)
        and WhatsApp. Your use of those services is governed by their own terms. If a third party
        changes, limits or withdraws its service, the related feature may stop working, and we will
        tell you rather than silently retry or substitute different content.
      </P>

      <H2 id="orbit">10. Orbit and AI features</H2>
      <P>
        Orbit&apos;s answers and drafts are generated by third-party AI models and may be inaccurate,
        incomplete or out of date. They are not professional, legal or financial advice. You are
        responsible for reviewing anything Orbit produces before relying on it or publishing it.
      </P>

      <H2 id="api">11. Platform API</H2>
      <P>
        API access is subject to rate limits and to the limits of your plan. Keep API keys secret and
        rotate any key you believe is exposed. Offering the API&apos;s data to your own customers as
        part of your product is permitted; reselling raw API access requires our written agreement.
      </P>

      <H2 id="ip">12. Intellectual property</H2>
      <P>
        We own the Service, including its software, design and the {site.name} name and brand. These
        Terms do not transfer any of those rights to you. If you send us feedback, we may use it
        without obligation to you.
      </P>

      <H2 id="availability">13. Availability and changes</H2>
      <P>
        We work to keep the Service fast and available, but we do not guarantee uninterrupted access
        unless a separate written agreement says so. We may improve, change or retire features over
        time. If we remove a significant paid feature during a period you have paid for, we will give
        notice and a fair remedy.
      </P>

      <H2 id="termination">14. Suspension and termination</H2>
      <H3 id="by-you">By you</H3>
      <P>
        You can stop using the Service and close your account at any time. Closing your account
        deletes your data, so export anything you need first.
      </P>
      <H3 id="by-us">By us</H3>
      <P>
        We may suspend or close an account that breaches these Terms, creates a security or legal risk,
        or is used fraudulently. Where practical, we will tell you first and give you a chance to fix
        the problem and export your data.
      </P>

      <H2 id="disclaimers">15. Disclaimers</H2>
      <P>
        Except as expressly stated in these Terms, the Service is provided &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied,
        including fitness for a particular purpose. Nothing in these Terms excludes rights you have
        under law that cannot be excluded.
      </P>

      <H2 id="liability">16. Limitation of liability</H2>
      <P>
        To the extent permitted by law, we are not liable for indirect, incidental, special or
        consequential losses, or for loss of profits, revenue or data. Our total liability arising out
        of or relating to the Service is limited to the amount you paid us in the twelve months before
        the event giving rise to the claim.
      </P>

      <H2 id="indemnity">17. Indemnity</H2>
      <P>
        You agree to indemnify us against claims arising from your content, your websites and forms,
        or your breach of these Terms or of the law.
      </P>

      <H2 id="law">18. Governing law</H2>
      <P>
        These Terms are governed by the laws of India. Any dispute will be subject to the exclusive
        jurisdiction of the courts of India, unless the law of your country gives you the right to
        bring a claim where you live.
      </P>

      <H2 id="changes">19. Changes to these Terms</H2>
      <P>
        We may update these Terms. The date at the top shows the latest version. We will email account
        holders before a material change takes effect. Continuing to use the Service afterwards means
        you accept the updated Terms.
      </P>

      <H2 id="contact">20. Contact</H2>
      <P>
        Questions about these Terms go to <A href={`mailto:${site.email}`}>{site.email}</A> or{" "}
        {site.phone}.
      </P>
    </>
  );
}
