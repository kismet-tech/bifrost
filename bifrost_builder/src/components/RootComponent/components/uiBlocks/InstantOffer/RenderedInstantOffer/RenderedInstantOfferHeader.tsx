import { getDiscountPercent } from "@/utilities/formatting/getDiscountPercent";
import { RenderableInstantOffer } from "../models/RenderableInstantOffer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RenderedInstantOfferHeaderProps {
  renderableInstantOffer: RenderableInstantOffer;
}

export function RenderedInstantOfferHeader({
  renderableInstantOffer,
}: RenderedInstantOfferHeaderProps) {
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
          {renderableInstantOffer.summary.instantOfferName}
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
          ${renderableInstantOffer.offerPriceInCents / 100}/pp (
          {getDiscountPercent({
            listPrice: renderableInstantOffer.listPriceInCents,
            offerPrice: renderableInstantOffer.offerPriceInCents,
            decimalPlaces: 0,
          })}
          % off)
        </div>
      </div>

      <Button className="flex-shrink-0 flex items-center bg-transparent hover:bg-transparent border border-black text-black rounded-full w-auto px-2 py-1 text-sm sm:text-lg lowercase">
        Place Hold <ArrowRight className="ml-1 sm:ml-2" />
      </Button>
    </div>
  );
}
