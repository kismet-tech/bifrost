import { CalendarDate } from "@/models/CalendarDate";

export interface InstantOfferSummary {
  instantOfferName: string;

  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  offerPriceInCents: number;
  listPriceInCents: number;

  packageImageUrl: string;
}
