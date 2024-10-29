import { getDiscountPercent } from "@/utilities/formatting/getDiscountPercent";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";

interface RenderedInstantOfferHeaderProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
  instantOfferIndex: number;
  handleVisitCheckoutPage: () => Promise<void>;
}

export function RenderedInstantOfferHeader({
  renderableInstantOffer,
  instantOfferIndex,
  handleVisitCheckoutPage,
}: RenderedInstantOfferHeaderProps) {
  const numberOfRooms = renderableInstantOffer.hotelRoomOffers.reduce(
    (accum: number, hotelRoomOffer) => {
      return accum + hotelRoomOffer.countOffered;
    },
    0
  );

  return (
    <div className="flex items-center bg-white p-2 pl-0 rounded-md shadow-md">
      <div className="w-20 h-20 mr-2 flex-shrink-0">
        <img
          src={renderableInstantOffer.packageImageUrl}
          alt="Hotel Room Image"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-grow mr-2 min-w-0">
        <div className="text-base sm:text-xl font-semibold truncate">
          #{instantOfferIndex + 1} {renderableInstantOffer.instantBookOfferName}
        </div>
        <div className="mt-1 text-sm sm:text-base">
          {renderableInstantOffer.startCalendarDate.month}/
          {renderableInstantOffer.startCalendarDate.day}/
          {renderableInstantOffer.startCalendarDate.year.toString().slice(-2)} -{" "}
          {renderableInstantOffer.endCalendarDate.month}/
          {renderableInstantOffer.endCalendarDate.day}/
          {renderableInstantOffer.endCalendarDate.year.toString().slice(-2)}
        </div>
        <div className="mt-1 text-sm sm:text-base whitespace-nowrap">
          $
          {Math.round(
            renderableInstantOffer.offerPriceInCents / numberOfRooms / 100
          )}
          /room (
          {getDiscountPercent({
            listPrice: renderableInstantOffer.listPriceInCents,
            offerPrice: renderableInstantOffer.offerPriceInCents,
            decimalPlaces: 0,
          })}
          % off)
        </div>
      </div>

      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault();

          handleVisitCheckoutPage();
        }}
        className="flex-shrink-0 flex items-center bg-transparent hover:bg-transparent border border-black text-black rounded-full w-auto px-2 py-1 text-sm sm:text-lg lowercase"
      >
        Place Hold <ArrowRight className="ml-1 sm:ml-2" />
      </Button>
    </div>
  );
}
