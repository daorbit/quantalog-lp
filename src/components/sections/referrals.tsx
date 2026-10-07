import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { ExploreTile } from "../explore/explore-tile";
import { referralItems } from "../referrals/referral-items";
import { site } from "@/lib/site";

export function Referrals() {
  return (
    <section id="referrals" className="py-14 sm:py-28">
      <div className="v-rise mx-auto max-w-3xl px-4 text-center">
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

      <div className="mt-8 grid gap-2 sm:mt-16 lg:grid-cols-2">
        {referralItems.map((item, i) => (
          <div key={item.label} className={`v-rise ${i % 2 ? "v-d2" : "v-d1"}`}>
            <ExploreTile item={item} />
          </div>
        ))}
      </div>

      <div className="v-rise mt-10 flex justify-center px-4 sm:mt-14">
        <Button
          href={`${site.app}/app/billing?tab=referrals`}
          className="group"
          track="cta_referral_link"
          trackProps={{ location: "referrals" }}
        >
          Get your invite link
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}
