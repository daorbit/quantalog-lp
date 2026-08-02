import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
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
    "embedded analytics",
    "white label analytics",
    "multi-tenant analytics API",
    "SEO audit tool",
    "Lighthouse SEO report",
    "broken link checker",
    "Core Web Vitals monitoring",
    "Google Analytics alternative",
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
  robots: { index: true, follow: true },
  verification: {
    google: "x5mfmCb6H9n_bwTCRDWKN_WviRahTitCtiE9dZdovOo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
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
