import { site } from "@/lib/site";
import { FaqBrowser } from "../faq-browser";

export function Faq() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <FaqBrowser
          intro={
            <>
              <h2 className="text-h2 font-medium leading-[1.04] tracking-display">
                Got questions
                <br />
                about <span className="text-accent">{site.name}</span>?
              </h2>
              <p className="mt-5 max-w-xs text-lead leading-snug text-fg-muted">
                Find answers to commonly asked questions.
              </p>
              <p className="mt-4 text-[14px] text-fg-muted">
                Still stuck?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-fg underline underline-offset-4 hover:text-fg-muted"
                >
                  Email us
                </a>{" "}
                — a human replies.
              </p>
            </>
          }
        />
      </div>
    </section>
  );
}
