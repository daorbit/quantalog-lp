import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DisplayMenu } from "@/components/display/display-menu";
import { NewsletterDialog } from "@/components/newsletter-dialog";
import { OrbitBubble } from "@/components/orbit/orbit-bubble";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Plus Jakarta Sans, in place of Inter.
 *
 * Inter is the default of every SaaS page built since 2020 — excellent, and
 * invisible for exactly that reason. This is a geometric grotesque with wider
 * apertures and a little warmth in the terminals: it reads as chosen rather
 * than defaulted, without giving up the neutrality a page full of numbers
 * needs. Variable, so weight is a single axis rather than five files.
 */
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  // Emits <meta name="author">. Answer engines look for a named author before
  // they will attribute a quote, and several read the meta tag rather than
  // parsing JSON-LD for it.
  authors: [{ name: site.author, url: site.url }],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  // Google ignores this tag; Bing and several AI crawlers still read it, and it
  // costs nothing. The terms that matter are carried by the headings and body
  // copy, not here.
  keywords: [
    "web analytics",
    "real-time analytics",
    "privacy-first analytics",
    "cookieless analytics",
    "analytics without cookie banner",
    "GDPR compliant analytics",
    "no cookie banner analytics",
    "server side analytics",
    "first party analytics",
    "ad blocker proof analytics",
    "embedded analytics",
    "white label analytics",
    "multi-tenant analytics API",
    "analytics API for SaaS",
    "client dashboard analytics",
    "agency analytics reporting",
    "SEO audit tool",
    "Lighthouse SEO report",
    "technical SEO audit",
    "broken link checker",
    "Core Web Vitals monitoring",
    "INP optimization",
    "Google Analytics alternative",
    "GA4 alternative",
    "migrate from Google Analytics",
    "Plausible alternative",
    "Matomo alternative",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/OgImage.png",
        width: 1369,
        height: 1149,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/OgImage.png"],
  },
  // The <link rel="alternate"> that makes the feed discoverable — a feed nothing
  // points at is a feed nothing finds.
  alternates: {
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    // Without these, Google truncates the snippet and suppresses large preview
    // thumbnails on its own judgement. Both are worth asking for explicitly.
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "x5mfmCb6H9n_bwTCRDWKN_WviRahTitCtiE9dZdovOo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <head>
        {/* The contact form is a da-forms iframe on another origin. Warming DNS
            and TLS on every page, and prefetching the form document in idle
            time, means /contact opens with the form already in cache rather
            than starting a cross-origin round trip on click. */}
        <link rel="preconnect" href="https://forms.daorbit.in" />
        <link
          rel="prefetch"
          as="document"
          href="https://forms.daorbit.in/form/6a89a4af44a2ed606590a54a/view"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          {/* Bottom-left, opposite the theme toggle and clear of anything that
              would cover the footer's own links. */}
          <DisplayMenu />
          {/* Opens itself once per visitor, after a delay, and never again once
              dismissed. It excludes the pages where asking would be tactless —
              see the component. */}
          <NewsletterDialog />
          {/* Bottom-right "Ask Orbit" chat. Talks to the public, unauthenticated
              /api/public/orbit endpoint — Cloudflare-only models, rate-limited
              per IP server-side. */}
          <OrbitBubble />
        </ThemeProvider>

        {/* Quantalog eats its own dog food: this landing page is tracked by Quantalog. */}
        <Script
          src={`${site.api}/tracker.js`}
          data-site={site.siteId}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
