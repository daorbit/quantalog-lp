import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ShowcaseTile } from "../dashboards/showcase-tile";
import { IconFacts } from "../icon-facts";
import { InviteVisual } from "../referrals/invite-visual";
import { CouponVisual } from "../referrals/coupon-visual";
import { referralFacts } from "../referrals/referral-data";
import { site } from "@/lib/site";

export function Referrals() {
  return (
    <section id="referrals">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
        <div className="v-rise mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold text-accent sm:text-[17px]">Refer &amp; earn</p>
          <h2 className="mt-3 text-balance text-h2 font-medium leading-[1.06] tracking-display">
            Share Quantalog.
            <br />
            Save on what&apos;s next.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lead leading-normal text-fg-muted">
            Invite a friend, a client or a teammate. When they join with your link, a discount coupon
            lands in your account for your next plan or add-on.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-5">
          <div className="v-rise v-d1 lg:col-span-3">
            <ShowcaseTile
              label="Your link"
              title="One link. Every channel."
              body="Copy it, or send it straight to WhatsApp, email or LinkedIn. Prefer typing? Your short code works the same way."
            >
              <InviteVisual />
            </ShowcaseTile>
          </div>
          <div className="v-rise v-d2 lg:col-span-2">
            <ShowcaseTile
              label="Your reward"
              title="A coupon, the moment they join."
              body="Single-use, tied to your account, and ready at checkout. Every coupon you earn waits in one wallet."
            >
              <CouponVisual />
            </ShowcaseTile>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-10 sm:mt-20 sm:pt-14">
          <IconFacts facts={referralFacts} className="lg:grid-cols-4" />
        </div>

        <div className="v-rise mt-12 flex flex-col items-center gap-4 text-center sm:mt-16">
          <Button
            href={`${site.app}/app/billing?tab=referrals`}
            className="group"
            track="cta_referral_link"
            trackProps={{ location: "referrals" }}
          >
            Get your invite link
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
          <Link
            href="/docs/referrals"
            className="group inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
          >
            How referrals work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
