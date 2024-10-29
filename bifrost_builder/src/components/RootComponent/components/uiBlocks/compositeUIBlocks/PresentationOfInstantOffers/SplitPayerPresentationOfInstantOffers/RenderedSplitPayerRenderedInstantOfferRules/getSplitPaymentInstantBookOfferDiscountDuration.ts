import { CalendarDate } from "@/models/CalendarDate";
import { getDaysBetweenCalendarDates } from "@/utilities/dates/getDaysBetweenCalendarDates";
import { getTodayCalendarDate } from "@/utilities/dates/getTodayCalendarDate";
import { InstantBookingOfferRuleTime } from "./models";

interface GetSplitPaymentInstantBookOfferDiscountDurationProps {
  arrivalCalendarDate: CalendarDate;
}

export const getSplitPaymentInstantBookOfferDiscountDuration = ({
  arrivalCalendarDate,
}: GetSplitPaymentInstantBookOfferDiscountDurationProps): InstantBookingOfferRuleTime => {
  const todayCalendarDate: CalendarDate = getTodayCalendarDate({});

  const { days: daysUntilArrival } = getDaysBetweenCalendarDates({
    startCalendarDate: todayCalendarDate,
    endCalendarDate: arrivalCalendarDate,
  });

  if (daysUntilArrival >= 62) {
    return { days: daysUntilArrival - 30 };
  } else if (daysUntilArrival >= 31) {
    return { days: daysUntilArrival - 30 };
  } else if (daysUntilArrival >= 14) {
    return { days: 7 };
  } else if (daysUntilArrival >= 7) {
    return { days: 5 };
  } else {
    return { days: 24 };
  }
};
