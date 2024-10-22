import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming the path to the Button component from ShadCN
import { getDiscountPercent } from "@/utilities/formatting/getDiscountPercent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RenderedInstantOffer } from "./RenderedInstantOffer";
import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";

interface RenderedInstantOfferSummaryProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
  instantOfferIndex: number;
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;
}

export function RenderedInstantOfferSummary({
  renderableInstantOffer,
  instantOfferIndex,
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  userSessionId,
}: RenderedInstantOfferSummaryProps) {
  console.log(`userSessionId in RenderedInstantOfferSummary: ${userSessionId}`);

  // Manage Dialog open state
  const [instantOfferModalIsOpen, setInstantOfferModalIsOpen] = useState(false);

  // Function to close the Dialog
  const handleCloseInstantOfferModal = () => {
    setInstantOfferModalIsOpen(false);
  };

  const numberOfRooms = renderableInstantOffer.hotelRoomOffers.reduce(
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
        <div className="text-xl font-semibold">
          #{instantOfferIndex + 1} {renderableInstantOffer.instantBookOfferName}
        </div>{" "}
        <div className="text mt-1">
          {renderableInstantOffer.startCalendarDate.month}/
          {renderableInstantOffer.startCalendarDate.day}/
          {renderableInstantOffer.startCalendarDate.year.toString().slice(-2)} -{" "}
          {renderableInstantOffer.endCalendarDate.month}/
          {renderableInstantOffer.endCalendarDate.day}/
          {renderableInstantOffer.endCalendarDate.year.toString().slice(-2)}
        </div>{" "}
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
        </div>{" "}
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
        <DialogContent className="max-w-screen-md w-full overflow-hidden">
          <RenderedInstantOffer
            instantOfferIndex={instantOfferIndex}
            renderableInstantOffer={renderableInstantOffer}
            handleCloseInstantOfferModal={handleCloseInstantOfferModal} // Pass the close function down
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
