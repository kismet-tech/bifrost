import { RenderableBifrostInstantBookOffer } from "@/api/maybeGetInstantBookOffers/models";
import { getSplitPaymentInstantBookOfferHoldRule } from "./getSplitPaymentInstantBookOfferHoldRule";
import { CalendarDate } from "@/models/CalendarDate";
import {
  CalendarDateComarison,
  compareCalendarDates,
} from "@/utilities/dates/compareCalendarDates";
import { InstantBookingOfferRuleTime } from "./models";
import { getSplitPaymentInstantBookOfferDiscountDuration } from "./getSplitPaymentInstantBookOfferDiscountDuration";

interface RenderedSplitPayerRenderedInstantOfferRulesProps {
  countOfRoomsOffered: number;
  renderableInstantOffers: RenderableBifrostInstantBookOffer[];
}

export function RenderedSplitPayerRenderedInstantOfferRules({
  countOfRoomsOffered,
  renderableInstantOffers,
}: RenderedSplitPayerRenderedInstantOfferRulesProps) {
  const arrivalCalendarDate: CalendarDate = renderableInstantOffers.reduce(
    (
      accum: CalendarDate | undefined,
      renderableInstantOffer: RenderableBifrostInstantBookOffer
    ): CalendarDate => {
      if (!accum) {
        return renderableInstantOffer.startCalendarDate;
      }

      if (
        compareCalendarDates({
          firstCalendarDate: accum,
          secondCalendarDate: renderableInstantOffer.startCalendarDate,
        }) === CalendarDateComarison.FIRST_DATE_OCCURS_BEFORE_SECOND_DATE
      ) {
        return renderableInstantOffer.startCalendarDate;
      } else {
        return accum;
      }
    },
    undefined
  ) as CalendarDate;

  const holdRule: InstantBookingOfferRuleTime =
    getSplitPaymentInstantBookOfferHoldRule({
      arrivalCalendarDate,
    });

  const discountDuration: InstantBookingOfferRuleTime =
    getSplitPaymentInstantBookOfferDiscountDuration({
      arrivalCalendarDate,
    });

  const getDayOrHourLabel = (count: number, unit: "day" | "hour") => {
    return count === 1 ? unit : `${unit}s`;
  };

  const renderedHoldRule: JSX.Element =
    holdRule.days || holdRule.hours ? (
      <li className="font-bold">
        {countOfRoomsOffered} rooms will be held for{" "}
        {(holdRule.days ?? 0) || (holdRule.hours ?? 0)}{" "}
        {holdRule.days
          ? getDayOrHourLabel(holdRule.days, "day")
          : getDayOrHourLabel(holdRule.hours ?? 0, "hour")}
      </li>
    ) : (
      <></>
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
