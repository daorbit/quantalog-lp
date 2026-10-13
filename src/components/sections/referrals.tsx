import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { TileSection } from "../explore/tile-section";
import { referralItems } from "../referrals/referral-items";
import { site } from "@/lib/site";

export function Referrals() {
  return (
    <TileSection
      id="referrals"
      eyebrow="Refer & earn"
      title={
        <>
          Share Quantalog.
          <br />
          Save on what’s next.
        </>
      }
      body="Invite a friend, a client or a teammate. When they join with your link, a discount coupon lands in your account for your next plan or add-on."
      items={referralItems}
    >
      <div className="mt-10 flex justify-center px-4 sm:mt-14">
        <Button href={`${site.app}/app/billing?tab=referrals`} track="cta_referral_link" trackProps={{ location: "referrals" }}>
          Get your invite link
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </TileSection>
  );
}
