import type { Post } from "@/lib/blog";
import { A, Callout, H2, H3, Li, P, Pre, Ul } from "@/components/prose";
import { site } from "@/lib/site";

const functionsPhp = `// In your theme's functions.php, or a small custom plugin.
// A child theme or plugin means a theme update will not wipe it.
add_action('wp_footer', function () {
  ?>
  <script async src="${site.api}/tracker.js" data-site="YOUR_SITE_KEY"></script>
  <?php
});`;

const goal = `<!-- On a "thank you" page, or in a form plugin's confirmation HTML -->
<script>
  window.quantalog && window.quantalog("lead_submitted");
</script>`;

function Body() {
  return (
    <>
      <P>
        WordPress gives you three places to put an analytics tag. One is right,
        one is fragile, one is fine if you already have the plugin. All three
        are cookieless here, with no consent banner to configure.
      </P>

      <H2 id="options">The three ways, ranked</H2>
      <Ul>
        <Li>
          <strong>A header/footer plugin.</strong> If you already run one (WPCode,
          Insert Headers and Footers, or similar), paste the tag into the footer
          box and you are done. Nothing to maintain.
        </Li>
        <Li>
          <strong>A child theme or small custom plugin.</strong> The clean way
          if you do not want another plugin. Survives theme updates.
        </Li>
        <Li>
          <strong>Editing the active theme&apos;s{" "}
          <code>header.php</code> directly.</strong> Works, but the next theme
          update overwrites it. Avoid.
        </Li>
      </Ul>

      <H2 id="plugin-method">Header/footer plugin</H2>
      <P>
        Paste this into the plugin&apos;s <em>footer</em> field (not the header
        field — the footer keeps it off the critical path):
      </P>
      <Pre label="footer snippet">{`<script async src="${site.api}/tracker.js" data-site="YOUR_SITE_KEY"></script>`}</Pre>

      <H2 id="code-method">Child theme or custom plugin</H2>
      <P>
        Hook <code>wp_footer</code> and print the tag. Put this in a child
        theme&apos;s <code>functions.php</code> or a one-file plugin so a parent
        theme update cannot remove it.
      </P>
      <Pre label="functions.php">{functionsPhp}</Pre>

      <H3 id="caching">Page caching is fine</H3>
      <P>
        The tag is static markup with no server-rendered values, so WP Rocket,
        W3 Total Cache, LiteSpeed and a CDN all serve it correctly from a cached
        page. No cache exclusions needed.
      </P>

      <H2 id="events">Tracking form submissions and other goals</H2>
      <P>
        Most WordPress conversions are a form submit. If your form plugin
        redirects to a thank-you page, put a one-line script on that page. If it
        shows an inline confirmation, add the script to the confirmation
        message&apos;s HTML.
      </P>
      <Pre label="thank-you page">{goal}</Pre>
      <P>
        For form plugins that fire a JavaScript event on success (Gravity Forms,
        WPForms, Contact Form 7), you can listen for that event and call{" "}
        <code>window.quantalog</code> from it instead of relying on a redirect.
      </P>

      <H2 id="no-banner">The consent banner question</H2>
      <P>
        The tracker sets no cookies, so it adds nothing you need to disclose or
        block behind consent. A stock WordPress install with this tag and
        nothing else may not need a banner at all. The moment you add a plugin
        that sets cookies — many embed and marketing plugins do — the banner is
        back, and it covers the whole site. See{" "}
        <A href="/blog/do-you-need-a-cookie-banner-for-analytics">
          do you need a cookie banner for analytics
        </A>
        .
      </P>

      <Callout>
        Running a client site on WordPress?{" "}
        <A href="/reports">Scheduled reports</A> send the traffic and SEO
        summary to the client by email or WhatsApp with no dashboard login, and{" "}
        <A href="/seo-audits">the SEO audit</A> flags the broken links and
        missing structured data WordPress themes tend to accumulate.
      </Callout>
    </>
  );
}

export const addAnalyticsToWordpress: Post = {
  slug: "add-analytics-to-wordpress",
  title: "Add cookieless analytics to a WordPress site",
  description:
    "The three places to put the tag ranked by how well they survive updates, why page caching is not a problem, and how to track form submissions — no consent banner for the analytics itself.",
  date: "2026-08-23",
  tags: ["Analytics", "WordPress", "Guide"],
  author: { name: "DA Orbit", role: "Founder" },
  readingMinutes: 5,
  Body,
};
