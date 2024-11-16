import { getBifrostSinglePayerCheckoutUrl } from "@/api/getBifrostSinglePayerCheckoutUrl";
import { RenderedInstantOfferFooter } from "./RenderedInstantOfferFooter";
import { RenderedInstantOfferHeader } from "./RenderedInstantOfferHeader";
import { RenderedInstantOfferPackageDescription } from "./RenderedInstantOfferPackageDescription";
import { RenderedInstantOfferRoomCarousel } from "./RenderedInstantOfferRoomCarousel";
import { RenderableBifrostInstantBookOffer } from "@/api/instantBookOffers/models";

export interface RenderedInstantOfferProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
  instantOfferIndex: number;
  handleCloseInstantOfferModal: () => void;

  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;
}

export function RenderedSinglePayerInstantOffer({
  renderableInstantOffer,
  instantOfferIndex,
  handleCloseInstantOfferModal,

  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  userSessionId,
}: RenderedInstantOfferProps) {
  const handleVisitCheckoutPage = async () => {
    const { checkoutUrl } = await getBifrostSinglePayerCheckoutUrl({
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,

      startCalendarDate: renderableInstantOffer.startCalendarDate,
      endCalendarDate: renderableInstantOffer.endCalendarDate,

      itineraryOfferId: renderableInstantOffer.itineraryOfferId,
      userSessionId,
    });

    window.location.href = checkoutUrl;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <RenderedInstantOfferHeader
        renderableInstantOffer={renderableInstantOffer}
        handleVisitCheckoutPage={handleVisitCheckoutPage}
        instantOfferIndex={instantOfferIndex}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="mt-4">
          <RenderedInstantOfferPackageDescription
            renderableInstantOffer={renderableInstantOffer}
          />
        </div>

        <RenderedInstantOfferRoomCarousel
          renderableInstantOffer={renderableInstantOffer}
        />
      </div>

      {/* Footer (always visible) */}
      <RenderedInstantOfferFooter
        handleCloseInstantOfferModal={handleCloseInstantOfferModal}
        handleVisitCheckoutPage={handleVisitCheckoutPage}
      />
    </div>
  );
}
