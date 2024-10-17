// RenderedInstantOfferFooter.tsx

import { ArrowLeft, ArrowRight } from "lucide-react";

interface RenderedInstantOfferFooterProps {
  handleCloseInstantOfferModal?: () => void;
}

export function RenderedInstantOfferFooter({
  handleCloseInstantOfferModal,
}: RenderedInstantOfferFooterProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      {/* Back Button */}
      <button
        onClick={handleCloseInstantOfferModal}
        className="flex items-center text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back</span>
      </button>

      {/* Place Hold Button */}
      <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
        <span>Place hold</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
