import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { ConsentGap } from "@/components/sections/consent-gap";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Compare } from "@/components/sections/compare";
import { Platform } from "@/components/sections/platform";
import { Pricing } from "@/components/sections/pricing";
import { Faq, faqs } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: site.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: site.description,
      url: site.url,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Hobby plan — 10k pageviews per month, free forever",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Logos />
      {/* The argument, before the feature list: why cookie-based tools
          under-report, then what you get instead. */}
      <ConsentGap />
      <Features />
      <HowItWorks />
      <Compare />
      <Platform />
      {/* <Pricing /> */}
      <Faq />
      <Cta />
    </>
  );
}
