import { FaqList } from "../faq-list";
import type { Faq } from "@/lib/faqs";

export function ProductFaq({ faqs, idPrefix }: { faqs: readonly Faq[]; idPrefix: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        <div className="v-rise">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">FAQ</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            Common questions.
          </h2>
        </div>
        <div className="v-rise v-d1 min-w-0">
          <FaqList faqs={faqs} idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}
