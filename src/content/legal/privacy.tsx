import { A, Callout, H2, H3, Li, P, Ul } from "@/components/prose";
import type { LegalHighlight } from "@/components/legal/legal-data";
import { site } from "@/lib/site";

export const PRIVACY_LEAD = `How ${site.name} handles data — for visitors to the sites that use it, for our customers, and for anyone using this website.`;

export const PRIVACY_HIGHLIGHTS: readonly LegalHighlight[] = [
  {
    title: "No cookies, no personal data",
    body: "The tracker sets no cookies, writes nothing to the browser and never stores a raw IP address.",
  },
  {
    title: "Visitors can't be identified",
    body: "A visitor is a daily-rotating hash that cannot be reversed or linked across days or sites.",
  },
  {
    title: "We never sell data",
    body: "Nothing is sold, shared with advertisers or used to build profiles. We are paid by subscriptions.",
  },
  {
    title: "You stay in control",
    body: "Customers can export or permanently delete their data at any time from the dashboard.",
  },
];

export function PrivacyBody() {
  return (
    <>
      <H2 id="who-we-are">1. Who we are</H2>
      <P>
        {site.name} is operated by {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;). This policy explains what we collect, why, and the choices you have.
        It applies to:
      </P>
      <Ul>
        <Li>
          <b>Visitors</b> to websites that have installed the {site.name} tracker;
        </Li>
        <Li>
          <b>Customers</b> who create a {site.name} account;
        </Li>
        <Li>
          <b>Respondents</b> who submit a form built with {site.name}; and
        </Li>
        <Li>
          <b>Anyone</b> using {site.url.replace("https://", "")}, including the Orbit assistant on it.
        </Li>
      </Ul>

      <H2 id="our-role">2. Our role</H2>
      <P>
        For analytics collected on a customer&apos;s website and for responses to a customer&apos;s
        forms, the customer decides what is collected and why. They are the data controller, and we
        process that data on their behalf and on their instructions. For account, billing and support
        information, and for this website, we are the controller.
      </P>
      <P>
        If you visited a website that uses {site.name} and have a question about it, the owner of that
        website is the right first contact.
      </P>

      <H2 id="tracker-collects">3. What the tracker collects</H2>
      <P>When a page running the tracker loads, we receive:</P>
      <Ul>
        <Li>the page address, the referring address and any UTM campaign parameters;</Li>
        <Li>the screen size;</Li>
        <Li>custom events and properties that the website owner has chosen to send; and</Li>
        <Li>
          the HTTP request itself, from which we derive the device type, operating system, browser and
          country.
        </Li>
      </Ul>
      <Callout title="Raw IP addresses are never stored">
        The IP address is used only at the moment of the request — to derive the country and to form
        the visitor hash described below — and is then discarded.
      </Callout>

      <H2 id="tracker-does-not-collect">4. What the tracker does not collect</H2>
      <Ul>
        <Li>No cookies, localStorage or any other data is written to the visitor&apos;s browser.</Li>
        <Li>No identifier is created that follows a visitor across websites or across days.</Li>
        <Li>No keystrokes, form input, mouse movement or session recordings.</Li>
        <Li>No names, email addresses or other directly identifying information.</Li>
      </Ul>
      <P>
        Our terms forbid customers from sending personal data through custom event properties.
      </P>

      <H2 id="counting-visitors">5. How visitors are counted</H2>
      <P>
        A visitor is a SHA-256 hash of the IP address, the user agent, the website&apos;s site key and a
        salt that changes every day. Because the salt rotates daily, the same person appears as a new
        visitor tomorrow, and the same person on two different websites produces two unrelated hashes.
        The hash cannot be reversed into an IP address or an identity, by us or by anyone else.
      </P>

      <H2 id="customer-data">6. Information about customers</H2>
      <P>When you create and use an account, we hold:</P>
      <Ul>
        <Li>
          <b>Account details</b> — your name, email address and a one-way (bcrypt) hash of your password.
        </Li>
        <Li>
          <b>Workspace configuration</b> — the workspaces, sites, goals, reports and settings you create.
        </Li>
        <Li>
          <b>Mobile number</b> — only if you add one to receive reports on WhatsApp.
        </Li>
        <Li>
          <b>Billing records</b> — the plan or pack bought, the amount, currency, any coupon, the receipt
          number and the Razorpay payment reference. Card and bank details are entered in
          Razorpay&apos;s own window; we never see or store them.
        </Li>
        <Li>
          <b>Support correspondence</b> — the messages you send us and our replies.
        </Li>
        <Li>
          <b>Technical logs</b> — standard server logs used to keep the service secure and working.
        </Li>
      </Ul>

      <H2 id="connected-accounts">7. Connected accounts</H2>
      <P>
        Some features ask you to connect an account you hold with another service. You choose whether
        to connect each one, and you can disconnect it at any time.
      </P>
      <H3 id="search-console">Google Search Console</H3>
      <P>
        We request Google&apos;s Search Console permission and use it to show clicks, impressions,
        rankings, index status and sitemaps for the properties you select. The only change we make to
        your Search Console account is submitting or removing a sitemap, and only when you ask us to.
        We never add or remove properties, users or other settings.
      </P>
      <H3 id="social-accounts">LinkedIn and Instagram</H3>
      <P>
        To schedule posts on LinkedIn (and on Instagram, where available to your account), we store the access token the network grants, the account name and picture,
        and a record of what was published. The token is used only to publish posts you compose and
        schedule yourself. We never publish anything you did not create or approve.
      </P>
      <P>
        Access tokens are encrypted at rest. Disconnecting an account deletes its stored token
        immediately.
      </P>

      <H2 id="forms">8. Forms and respondents</H2>
      <P>
        When someone submits a form built with {site.name}, the answers are stored for the customer who
        owns that form, alongside the analytics that led to the submission. If the form takes a payment,
        it is processed through the form owner&apos;s own payment account, and we store the payment
        reference, status, method and the contact details the payment provider returns.
      </P>
      <P>
        Form owners may configure notification emails and webhooks. A webhook sends each submission to
        an address the form owner chooses, and what happens there is governed by the form owner.
      </P>

      <H2 id="orbit">9. Orbit, our AI assistant</H2>
      <P>
        Questions you ask Orbit are sent to a third-party AI model to generate an answer. Orbit
        currently uses Meta&apos;s Llama models hosted on Cloudflare Workers AI; when more than one
        model is available, the one that answers is chosen automatically.
      </P>
      <Ul>
        <Li>
          <b>On this website</b>, each question is sent together with the text of the page you are
          viewing so Orbit can answer in context. These conversations are not saved to an account and
          are gone when you close the tab.
        </Li>
        <Li>
          <b>In the dashboard</b>, conversations are saved to your workspace so you can return to them.
          They are visible to members of that workspace and you can delete any of them.
        </Li>
      </Ul>
      <P>
        We do not use your questions or answers to train AI models. Please don&apos;t share sensitive
        personal information with Orbit.
      </P>

      <H2 id="this-website">10. This website</H2>
      <P>
        This website measures its own traffic with {site.name}, so it sets no cookies either. If you
        use our contact form, we use what you send only to reply to you and keep it with our support
        correspondence.
      </P>

      <H2 id="how-we-use">11. How we use information</H2>
      <Ul>
        <Li>to provide, maintain and improve the service;</Li>
        <Li>to process payments and issue receipts;</Li>
        <Li>to send service messages — receipts, scheduled reports and notice of material changes;</Li>
        <Li>to respond to support requests;</Li>
        <Li>to detect and prevent abuse, fraud and security incidents; and</Li>
        <Li>to meet our legal obligations.</Li>
      </Ul>
      <P>
        We do not use your information for advertising, and we do not sell or rent it to anyone.
      </P>

      <H2 id="legal-bases">12. Legal bases</H2>
      <P>
        Where laws such as the EU and UK GDPR or India&apos;s Digital Personal Data Protection Act, 2023
        apply, we rely on: performing our contract with you; our legitimate interests in running a
        secure, reliable service; your consent, where you connect a third-party account or choose to
        receive something optional; and compliance with legal obligations such as tax and accounting
        rules.
      </P>

      <H2 id="sub-processors">13. Service providers</H2>
      <P>We use a small number of trusted providers to run {site.name}:</P>
      <Ul>
        <Li>
          <b>MongoDB Atlas</b> — database hosting.
        </Li>
        <Li>
          <b>Vercel</b> and <b>Cloudflare</b> — hosting, content delivery and network security;
          Cloudflare Workers AI also runs Orbit.
        </Li>
        <Li>
          <b>Cloudinary</b> — storage for images you upload.
        </Li>
        <Li>
          <b>Razorpay</b> — payment processing.
        </Li>
        <Li>
          <b>Email and WhatsApp delivery providers</b> — to send receipts, reports and notifications.
        </Li>
        <Li>
          <b>Google, LinkedIn and Meta</b> — only when you connect an account with them.
        </Li>
      </Ul>
      <P>
        Each provider receives only what it needs to perform its service. We may also disclose
        information where the law requires it, and only to the extent required.
      </P>

      <H2 id="transfers">14. International transfers</H2>
      <P>
        Our providers may process data in countries other than your own, including India and the
        United States. Where data leaves the EU, UK or another region with transfer rules, we rely on
        appropriate safeguards such as standard contractual clauses offered by our providers.
      </P>

      <H2 id="retention">15. Retention and deletion</H2>
      <Ul>
        <Li>
          <b>Analytics events</b> are kept for 25 months on every plan, then deleted automatically.
          Your plan sets how far back the dashboard can show within that window.
        </Li>
        <Li>
          <b>Form data</b> is kept until the customer deletes it, deletes the workspace or closes their
          account.
        </Li>
        <Li>
          <b>Account data</b> is kept while your account is open. You can delete your account yourself
          under Settings, then Security. That deletes it together with every workspace you own, their
          sites, analytics, forms and submissions, media files, and any connected account tokens, which
          are also revoked with the provider.
        </Li>
        <Li>
          <b>Billing records</b> are kept for as long as tax and accounting law requires, even after an
          account is closed.
        </Li>
      </Ul>
      <P>
        You can export or permanently delete a site&apos;s data at any time from the dashboard.
      </P>

      <H2 id="security">16. Security</H2>
      <P>
        Data is encrypted in transit with TLS. Passwords are stored only as one-way hashes, access tokens
        for connected accounts are encrypted at rest, and access to production systems is limited to the
        people who need it. No system is perfectly secure; if we become aware of a breach affecting your
        data, we will notify you and the relevant authorities as the law requires.
      </P>

      <H2 id="your-rights">17. Your rights</H2>
      <P>
        Depending on where you live, you may have the right to access, correct, export or delete your
        personal data, to object to or restrict certain processing, to withdraw consent, and to complain
        to a data protection authority.
      </P>
      <P>
        Customers can exercise most of these directly in the dashboard, or by emailing{" "}
        <A href={`mailto:${site.email}`}>{site.email}</A>. Because the tracker does not store
        identifying data, we are generally unable to find records relating to a specific visitor; the
        website owner is the right contact for questions about their site.
      </P>

      <H2 id="children">18. Children</H2>
      <P>
        {site.name} is a business service and is not intended for anyone under 18. We do not knowingly
        collect personal data from children.
      </P>

      <H2 id="changes">19. Changes to this policy</H2>
      <P>
        We may update this policy as the product or the law changes. The date at the top shows the
        latest version. If a change materially affects how we handle your data, we will email account
        holders before it takes effect.
      </P>

      <H2 id="contact">20. Contact</H2>
      <P>
        For any privacy question or request, email <A href={`mailto:${site.email}`}>{site.email}</A>.
        See also our <A href="/terms">Terms of Service</A>.
      </P>
    </>
  );
}
