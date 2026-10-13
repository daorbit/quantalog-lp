import { FaqList } from "../faq-list";
import type { Faq } from "@/lib/faqs";

export function ProductFaq({ faqs, idPrefix }: { faqs: readonly Faq[]; idPrefix: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">FAQ</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            Common questions.
          </h2>
        </div>
        <div className="min-w-0">
          <FaqList faqs={faqs} idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}
