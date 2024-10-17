import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming the path to the Button component from ShadCN
import { getDiscountPercent } from "@/utilities/formatting/getDiscountPercent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RenderedInstantOffer } from "./RenderedInstantOffer";
import { RenderableInstantOffer } from "./models/RenderableInstantOffer";

interface RenderedInstantOfferSummaryProps {
  renderableInstantOffer: RenderableInstantOffer;
}

export function RenderedInstantOfferSummary({
  renderableInstantOffer,
}: RenderedInstantOfferSummaryProps) {
  const {
    summary: {
      instantOfferName,
      listPriceInCents,
      offerPriceInCents,
      startCalendarDate,
      endCalendarDate,
      packageImageUrl,
    },
  } = renderableInstantOffer;

  // Manage Dialog open state
  const [instantOfferModalIsOpen, setInstantOfferModalIsOpen] = useState(false);

  // Function to close the Dialog
  const handleCloseInstantOfferModal = () => {
    setInstantOfferModalIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
      <img
        src={packageImageUrl}
        alt="Hotel Room Image"
        className="w-24 h-24 object-cover rounded-md mr-4"
      />

      <div className="flex-grow">
        <div className="text-xl font-semibold">{instantOfferName}</div>{" "}
        <div className="text mt-1">
          {startCalendarDate.month}/{startCalendarDate.day}/
          {startCalendarDate.year.toString().slice(-2)} -{" "}
          {endCalendarDate.month}/{endCalendarDate.day}/
          {endCalendarDate.year.toString().slice(-2)}
        </div>{" "}
        <div className="text mt-1">
          ${offerPriceInCents / 100}/pp (
          {getDiscountPercent({
            listPrice: listPriceInCents,
            offerPrice: offerPriceInCents,
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
            renderableInstantOffer={renderableInstantOffer}
            handleCloseInstantOfferModal={handleCloseInstantOfferModal} // Pass the close function down
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
