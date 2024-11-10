import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { SinglePayerRenderedInstantOfferSummary } from "./SinglePayerRenderedInstantOfferSummary";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";

interface SinglePayerPresentationOfInstantOffersProps {
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
}

export function SinglePayerPresentationOfInstantOffers({
  renderableInstantOffers,
}: SinglePayerPresentationOfInstantOffersProps) {
  const {
    getHotelId,
    maybeGetBifrostTravelerId,
    maybeGetBifrostFormId,
    maybeGetLocalFormUserSessionId,
    getUserSessionId,
  } = useBifrostFormState();

  const hotelId: string = getHotelId();
  const bifrostTravelerId: string = maybeGetBifrostTravelerId() as string;
  const bifrostFormId: string = maybeGetBifrostFormId() as string;
  const localFormUserSessionId: string =
    maybeGetLocalFormUserSessionId() as string;
  const userSessionId: string = getUserSessionId() as string;

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
