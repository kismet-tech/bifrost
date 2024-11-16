import {
  RenderableBifrostInstantBookOffer,
  RenderableBifrostInstantBookOfferRules,
} from "@/api/instantBookOffers/models";

interface RenderedSplitPayerRenderedInstantOfferRulesProps {
  countOfRoomsOffered: number;
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
}

export function RenderedSplitPayerRenderedInstantOfferRules({
  countOfRoomsOffered,
  renderableInstantOffers,
}: RenderedSplitPayerRenderedInstantOfferRulesProps) {
  const getDayOrHourLabel = (count: number, unit: "day" | "hour") => {
    return count === 1 ? unit : `${unit}s`;
  };

  const offerRules: RenderableBifrostInstantBookOfferRules =
    renderableInstantOffers[0].offerRules;

  const discountExpiresAtTimestamp: number =
    offerRules.discountExpiresAtTimestamp;

  const now: number = Date.now();

  if (!discountExpiresAtTimestamp || discountExpiresAtTimestamp < now) {
    return <></>;
  }

  const timeUntilDiscountExpires: number = discountExpiresAtTimestamp - now;

  const discountDuration = {
    days: Math.floor(timeUntilDiscountExpires / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeUntilDiscountExpires / (1000 * 60 * 60)) % 24),
  };

  const discountDurationUnit: "day" | "hour" =
    discountDuration.hours > 48 ? "day" : "hour";
  const discountedDurationUnitCount: number =
    discountDuration.hours > 48
      ? discountDuration.days
      : discountDuration.hours;

  const renderedHoldRule: JSX.Element = (
    <li className="font-bold">
      {countOfRoomsOffered} rooms will be held for {discountedDurationUnitCount}{" "}
      {getDayOrHourLabel(discountedDurationUnitCount, discountDurationUnit)}
    </li>
  );

  const renderedDiscountMinimumRoomsBookingRule: JSX.Element = (
    <li className="font-bold">Discount for at least 3 rooms booked</li>
  );

  const renderedDiscountBookingTimeRule: JSX.Element =
    discountDuration.days || discountDuration.hours ? (
      <li className="font-bold">
        Rooms booked within{" "}
        {(discountDuration.days ?? 0) || (discountDuration.hours ?? 0)}{" "}
        {discountDuration.days
          ? getDayOrHourLabel(discountDuration.days, "day")
          : getDayOrHourLabel(discountDuration.hours ?? 0, "hour")}{" "}
        will be discounted
      </li>
    ) : (
      <></>
    );

  return (
    <div>
      <ul className="list-disc pl-5">
        {renderedHoldRule}
        {renderedDiscountMinimumRoomsBookingRule}
        {renderedDiscountBookingTimeRule}
      </ul>
    </div>
  );
}
