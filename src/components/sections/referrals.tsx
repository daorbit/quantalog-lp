import { ArrowRight } from "lucide-react";
import { Button, SectionHeading } from "../ui";
import { ExploreTile } from "../explore/explore-tile";
import { referralItems } from "../referrals/referral-items";
import { site } from "@/lib/site";

export function Referrals() {
  return (
    <section id="referrals" className="section-y">
      <div className="px-4">
        <SectionHeading
          eyebrow="Refer & earn"
          title={
            <>
              Share Quantalog.
              <br />
              Save on what’s next.
            </>
          }
          body="Invite a friend, a client or a teammate. When they join with your link, a discount coupon lands in your account for your next plan or add-on."
          centered
        />
      </div>

      <div className="mt-10 grid gap-3 px-3 sm:mt-16 sm:px-4 lg:grid-cols-2">
        {referralItems.map((item) => (
          <div key={item.label}>
            <ExploreTile item={item} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center px-4 sm:mt-14">
        <Button
          href={`${site.app}/app/billing?tab=referrals`}
          track="cta_referral_link"
          trackProps={{ location: "referrals" }}
        >
          Get your invite link
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </section>
  );
}
