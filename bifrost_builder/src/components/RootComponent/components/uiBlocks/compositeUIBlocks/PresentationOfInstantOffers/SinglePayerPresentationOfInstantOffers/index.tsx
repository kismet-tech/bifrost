import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { SinglePayerRenderedInstantOfferSummary } from "./SinglePayerRenderedInstantOfferSummary";

interface SinglePayerPresentationOfInstantOffersProps {
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;
}

export function SinglePayerPresentationOfInstantOffers({
  renderableInstantOffers,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  userSessionId,
}: SinglePayerPresentationOfInstantOffersProps) {
  return (
    <div>
      <div>Instant Book</div>
      <div className="space-y-4">
        {renderableInstantOffers.map((renderableInstantOffer, index) => {
          return (
            <SinglePayerRenderedInstantOfferSummary
              key={index}
              instantOfferIndex={index}
              renderableInstantOffer={renderableInstantOffer}
              hotelId={hotelId}
              bifrostTravelerId={bifrostTravelerId}
              bifrostFormId={bifrostFormId}
              localFormUserSessionId={localFormUserSessionId}
              userSessionId={userSessionId}
            />
          );
        })}
      </div>
    </div>
  );
}
