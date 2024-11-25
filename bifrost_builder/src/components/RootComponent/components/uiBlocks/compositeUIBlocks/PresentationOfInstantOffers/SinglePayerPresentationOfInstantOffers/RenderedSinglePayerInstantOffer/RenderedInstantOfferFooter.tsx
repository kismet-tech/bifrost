// RenderedInstantOfferFooter.tsx

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RenderedInstantOfferFooterProps {
  handleCloseInstantOfferModal?: () => void;
  handleVisitCheckoutPage: () => Promise<void>;
}

export function RenderedInstantOfferFooter({
  handleCloseInstantOfferModal,
  handleVisitCheckoutPage,
}: RenderedInstantOfferFooterProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={handleCloseInstantOfferModal}
        className="flex items-center text-black hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back</span>
      </button>

      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault();

          handleVisitCheckoutPage();
        }}
        className="flex items-center bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 ml-auto w-1/6 max-w-[100px]"
      >
        <span>Place hold</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
