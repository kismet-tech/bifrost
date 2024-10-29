import { CalendarDate } from "@/models/CalendarDate";
import { getDaysBetweenCalendarDates } from "@/utilities/dates/getDaysBetweenCalendarDates";
import { getTodayCalendarDate } from "@/utilities/dates/getTodayCalendarDate";
import { InstantBookingOfferRuleTime } from "./models";

interface GetSplitPaymentInstantBookOfferHoldRuleProps {
  arrivalCalendarDate: CalendarDate;
}

export const getSplitPaymentInstantBookOfferHoldRule = ({
  arrivalCalendarDate,
}: GetSplitPaymentInstantBookOfferHoldRuleProps): InstantBookingOfferRuleTime => {
  const todayCalendarDate: CalendarDate = getTodayCalendarDate({});

  const { days: daysUntilArrival } = getDaysBetweenCalendarDates({
    startCalendarDate: todayCalendarDate,
    endCalendarDate: arrivalCalendarDate,
  });

  if (daysUntilArrival >= 62) {
    return { days: daysUntilArrival - 30 };
  } else if (daysUntilArrival >= 31) {
    return { days: 7 };
  } else if (daysUntilArrival >= 14) {
    return { hours: 48 };
  } else if (daysUntilArrival >= 7) {
    return { hours: 24 };
  } else {
    return {};
  }
};
