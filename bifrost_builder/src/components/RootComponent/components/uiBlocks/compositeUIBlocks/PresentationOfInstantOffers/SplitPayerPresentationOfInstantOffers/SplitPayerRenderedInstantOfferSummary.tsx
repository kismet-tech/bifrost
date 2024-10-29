import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { Button } from "@/components/ui/button";
import { getDiscountPercent } from "@/utilities/formatting/getDiscountPercent";
import { ArrowRight } from "lucide-react";

interface SplitPayerRenderedInstantOfferSummaryProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
  instantOfferIndex: number;
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;
  handleClickSelectInstantOffer: () => void;
  selectedBifrostInstantBookOfferId?: string;
}

export function SplitPayerRenderedInstantOfferSummary({
  renderableInstantOffer,
  instantOfferIndex,
  handleClickSelectInstantOffer,
  selectedBifrostInstantBookOfferId,
}: SplitPayerRenderedInstantOfferSummaryProps) {
  const numberOfRooms: number = renderableInstantOffer.hotelRoomOffers.reduce(
    (accum: number, hotelRoomOffer) => {
      return accum + hotelRoomOffer.countOffered;
    },
    0
  );

  const isSelected =
    selectedBifrostInstantBookOfferId ===
    renderableInstantOffer.bifrostInstantBookOfferId;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
      <img
        src={renderableInstantOffer.packageImageUrl}
        alt="Hotel Room Image"
        className="w-24 h-24 object-cover rounded-md mr-4"
      />

      <div className="flex-grow">
        <div className="text-xl font-semibold">
          #{instantOfferIndex + 1} {renderableInstantOffer.instantBookOfferName}
        </div>
        <div className="text mt-1">
          {renderableInstantOffer.startCalendarDate.month}/
          {renderableInstantOffer.startCalendarDate.day}/
          {renderableInstantOffer.startCalendarDate.year.toString().slice(-2)} -{" "}
          {renderableInstantOffer.endCalendarDate.month}/
          {renderableInstantOffer.endCalendarDate.day}/
          {renderableInstantOffer.endCalendarDate.year.toString().slice(-2)}
        </div>
        <div className="text mt-1">
          Starting at $
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
          handleClickSelectInstantOffer();
        }}
        className={`flex items-center ${
          isSelected
            ? "bg-black text-white"
            : "bg-transparent text-black border-black"
        } hover:bg-black border rounded-full w-auto px-4 py-2 text-lg lowercase`}
      >
        {isSelected ? "selected" : "select"}
        {!isSelected && <ArrowRight className="ml-2" />}
      </Button>
    </div>
  );
}
