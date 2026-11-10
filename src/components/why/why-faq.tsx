import { SectionHeading } from "../ui";
import { FaqList } from "../faq-list";
import { whyFaqs } from "./why-data";

export function WhyFaq() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 section-y">
      <SectionHeading eyebrow="Questions" title="Common questions." centered />
      <div className="mt-10">
        <FaqList faqs={whyFaqs} idPrefix="why-faq" />
      </div>
    </section>
  );
}
