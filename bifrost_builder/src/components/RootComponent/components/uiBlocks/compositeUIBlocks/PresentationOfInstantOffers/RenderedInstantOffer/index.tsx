import { getBifrostCheckoutUrl } from "@/api/getBifrostCheckoutUrl";
import { RenderedInstantOfferFooter } from "./RenderedInstantOfferFooter";
import { RenderedInstantOfferHeader } from "./RenderedInstantOfferHeader";
import { RenderedInstantOfferPackageDescription } from "./RenderedInstantOfferPackageDescription";
import { RenderedInstantOfferRoomCarousel } from "./RenderedInstantOfferRoomCarousel";
import { GetBifrostCheckoutUrlHotelRoomInstantBookOffer } from "@/api/getBifrostCheckoutUrl/models";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";

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

export function RenderedInstantOffer({
  renderableInstantOffer,
  instantOfferIndex,
  handleCloseInstantOfferModal,

  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  userSessionId,
}: RenderedInstantOfferProps) {
  const handleVisitCheckoutPage: () => Promise<void> = async () => {
    const hotelRoomOffers: GetBifrostCheckoutUrlHotelRoomInstantBookOffer[] =
      renderableInstantOffer.hotelRoomOffers.map(
        (hotelRoomOffer): GetBifrostCheckoutUrlHotelRoomInstantBookOffer => {
          return {
            countRequested: hotelRoomOffer.countOffered,
            offerPriceInCents: hotelRoomOffer.offerPriceInCents,
            hotelRoomId: hotelRoomOffer.hotelRoomId,
          };
        }
      );

    const { checkoutUrl } = await getBifrostCheckoutUrl({
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,

      startCalendarDate: renderableInstantOffer.startCalendarDate,
      endCalendarDate: renderableInstantOffer.endCalendarDate,

      hotelRoomOffers,
      userSessionId,
    });

    window.location.href = checkoutUrl;
  };

  return (
    <div className="w-full overflow-hidden">
      <RenderedInstantOfferHeader
        renderableInstantOffer={renderableInstantOffer}
        handleVisitCheckoutPage={handleVisitCheckoutPage}
        instantOfferIndex={instantOfferIndex}
      />

      <div className="mt-4">
        <RenderedInstantOfferPackageDescription
          renderableInstantOffer={renderableInstantOffer}
        />
      </div>

      <RenderedInstantOfferRoomCarousel
        renderableInstantOffer={renderableInstantOffer}
      />

      <RenderedInstantOfferFooter
        handleCloseInstantOfferModal={handleCloseInstantOfferModal}
        handleVisitCheckoutPage={handleVisitCheckoutPage}
      />
    </div>
  );
}
