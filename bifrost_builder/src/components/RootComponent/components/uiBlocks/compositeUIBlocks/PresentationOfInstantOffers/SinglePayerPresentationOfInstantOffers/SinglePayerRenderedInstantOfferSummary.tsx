import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust the path as necessary
import { getDiscountPercent } from "@/utilities/formatting/getDiscountPercent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RenderedSinglePayerInstantOffer } from "./RenderedSinglePayerInstantOffer";
import { RenderableBifrostInstantBookOffer } from "@/api/instantBookOffers/models";

interface SinglePayerRenderedInstantOfferSummaryProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
  instantOfferIndex: number;
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;
}

export function SinglePayerRenderedInstantOfferSummary({
  renderableInstantOffer,
  instantOfferIndex,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  userSessionId,
}: SinglePayerRenderedInstantOfferSummaryProps) {
  const [instantOfferModalIsOpen, setInstantOfferModalIsOpen] = useState(false);

  const handleCloseInstantOfferModal = () => {
    setInstantOfferModalIsOpen(false);
  };

  const numberOfRooms: number = renderableInstantOffer.hotelRoomOffers.reduce(
    (accum: number, hotelRoomOffer) => {
      return accum + hotelRoomOffer.countOffered;
    },
    0
  );

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
      <img
        src={renderableInstantOffer.packageImageUrl}
        alt="Hotel Room Image"
        className="w-24 h-24 object-cover rounded-md mr-4"
      />

      <div className="flex-grow">
        <div
          className="text-xl font-semibold cursor-pointer"
          onClick={() => setInstantOfferModalIsOpen(true)}
        >
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

      <Dialog
        open={instantOfferModalIsOpen}
        onOpenChange={setInstantOfferModalIsOpen}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => setInstantOfferModalIsOpen(true)}
            className="flex items-center bg-transparent hover:bg-transparent border border-black text-black rounded-full w-auto px-4 py-2 text-lg lowercase"
          >
            info <ArrowRight className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen-md w-full p-4 box-border h-[calc(100vh-32px)] flex flex-col">
          <RenderedSinglePayerInstantOffer
            instantOfferIndex={instantOfferIndex}
            renderableInstantOffer={renderableInstantOffer}
            handleCloseInstantOfferModal={handleCloseInstantOfferModal}
            hotelId={hotelId}
            bifrostTravelerId={bifrostTravelerId}
            bifrostFormId={bifrostFormId}
            localFormUserSessionId={localFormUserSessionId}
            userSessionId={userSessionId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
