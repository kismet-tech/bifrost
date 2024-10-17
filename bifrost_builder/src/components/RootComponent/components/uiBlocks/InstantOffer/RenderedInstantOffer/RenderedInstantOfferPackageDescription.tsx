import {
  RenderableInstantOffer,
  RenderableInstantOfferCriterion,
} from "../models/RenderableInstantOffer";

interface RenderedInstantOfferPackageDescriptionProps {
  renderableInstantOffer: RenderableInstantOffer;
}

export function RenderedInstantOfferPackageDescription({
  renderableInstantOffer,
}: RenderedInstantOfferPackageDescriptionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">
        {renderableInstantOffer.summary.instantOfferName}
      </h2>

      <div className="mt-2">{renderableInstantOffer.offerDescription}</div>

      <ul className="list-disc pl-5 mt-4">
        {renderableInstantOffer.offerCriteria.map(
          (
            {
              criterionName,
              doesMatchCriterion,
            }: RenderableInstantOfferCriterion,
            index: number
          ) => (
            <li key={index}>
              {criterionName} | {doesMatchCriterion ? "Yes" : "No"}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
