import {
  RenderableBifrostInstantBookOffer,
  RenderableBifrostInstantBookOfferCriterion,
} from "@/api/maybeGetInstantBookOffers/models";

interface RenderedInstantOfferPackageDescriptionProps {
  renderableInstantOffer: RenderableBifrostInstantBookOffer;
}

export function RenderedInstantOfferPackageDescription({
  renderableInstantOffer,
}: RenderedInstantOfferPackageDescriptionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">
        {renderableInstantOffer.instantBookOfferName}
      </h2>

      <div className="mt-2">
        {renderableInstantOffer.instantBookOfferDescription}
      </div>

      <ul className="list-disc pl-5 mt-4">
        {renderableInstantOffer.instantBookOfferCriteria.map(
          (
            {
              criterionName,
              doesMatchCriterion,
            }: RenderableBifrostInstantBookOfferCriterion,
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
