import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { SplitPayerRenderedInstantOfferSummary } from "./SplitPayerRenderedInstantOfferSummary";
import { useState } from "react";

interface SplitPayerPresentationOfInstantOffersProps {
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;
}

export function SplitPayerPresentationOfInstantOffers({
  renderableInstantOffers,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  userSessionId,
}: SplitPayerPresentationOfInstantOffersProps) {
  const [
    selectedBifrostInstantBookOfferId,
    setSelectedBifrostInstantBookOfferId,
  ] = useState<string | undefined>(undefined);

  const selectInstantOffer = (instantOfferId: string) => {
    setSelectedBifrostInstantBookOfferId(instantOfferId);
  };

  const countOfRoomsOffered = renderableInstantOffers.reduce(
    (accum: number, renderableInstantOffer) => {
      return (
        accum +
        renderableInstantOffer.hotelRoomOffers.reduce(
          (accum: number, hotelRoomOffer) => {
            return accum + hotelRoomOffer.countOffered;
          },
          0
        )
      );
    },
    0
  );

  return (
    <div>
      <div>
        <div>
          Thanks for your interest in Knollcroft. Someone will be in touch soon.
          We’re able to offer a group discount to your party on the following
          terms:
        </div>
        <div>
          <ul>
            <li>{countOfRoomsOffered} rooms will be held for 48 hours</li>
            <li>Discount for at least 5 rooms booked</li>
            <li>Rooms booked within 7 days will be discounted</li>
          </ul>
        </div>
      </div>

      <div>Instant Book</div>
      <div className="space-y-4">
        {renderableInstantOffers.map((renderableInstantOffer, index) => {
          return (
            <SplitPayerRenderedInstantOfferSummary
              key={index}
              instantOfferIndex={index}
              renderableInstantOffer={renderableInstantOffer}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              bifrostFormId={bifrostFormId}
              localFormUserSessionId={localFormUserSessionId}
              userSessionId={userSessionId}
              selectInstantOffer={() =>
                selectInstantOffer(
                  renderableInstantOffer.bifrostInstantBookOfferId
                )
              }
              selectedBifrostInstantBookOfferId={
                selectedBifrostInstantBookOfferId
              }
            />
          );
        })}
      </div>
    </div>
  );
}
