import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DisplayMenu } from "@/components/display/display-menu";
import { NewsletterDialog } from "@/components/newsletter-dialog";
import { OrbitBubble } from "@/components/orbit/orbit-bubble";
import { ScrollRise } from "@/components/scroll-rise";
import { Starfield } from "@/components/starfield";
import { PlansProvider } from "@/components/plans-provider";
import { ContactFormPrewarm } from "@/components/contact-form-prewarm";
import { site } from "@/lib/site";
import "./globals.css";

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

  authors: [{ name: site.author, url: site.url }],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },

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

  alternates: {
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,

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

        <link rel="preconnect" href="https://forms.daorbit.in" />
        <link rel="prefetch" as="document" href={site.contactFormSrc} />
      </head>
      <body className="font-sans antialiased">

        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider>
          {/* Behind every page, at z-index -1. Client-only: the positions are
              random per visit, so rendering it on the server would guarantee a
              hydration mismatch. */}
          <Starfield />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            Skip to content
          </a>
          <Header />

          <PlansProvider>
            <main id="main">{children}</main>
          </PlansProvider>
          <Footer />

          <DisplayMenu />

          <NewsletterDialog />

          <OrbitBubble />

          <ScrollRise />

          <ContactFormPrewarm />
        </ThemeProvider>

        <Script
          src={`${site.api}/tracker.js`}
          data-site={site.siteId}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
