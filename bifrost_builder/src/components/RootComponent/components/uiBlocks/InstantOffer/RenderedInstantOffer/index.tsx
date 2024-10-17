import { RenderableInstantOffer } from "../models/RenderableInstantOffer";
import { RenderedInstantOfferFooter } from "./RenderedInstantOfferFooter";
import { RenderedInstantOfferHeader } from "./RenderedInstantOfferHeader";
import { RenderedInstantOfferPackageDescription } from "./RenderedInstantOfferPackageDescription";
import { RenderedInstantOfferRoomCarousel } from "./RenderedInstantOfferRoomCarousel";

export interface RenderedInstantOfferProps {
  renderableInstantOffer: RenderableInstantOffer;
  handleCloseInstantOfferModal: () => void;
}

export function RenderedInstantOffer({
  renderableInstantOffer,
  handleCloseInstantOfferModal,
}: RenderedInstantOfferProps) {
  return (
    <div className="w-full overflow-hidden">
      <RenderedInstantOfferHeader
        renderableInstantOffer={renderableInstantOffer}
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
      />
    </div>
  );
}
