import { CalendarDate } from "@/models/CalendarDate";
import { InstantOfferSummary } from "./InstantOfferSummary";

export interface RenderableInstantOfferCriterion {
  criterionName: string;
  doesMatchCriterion: boolean;
}

export interface RenderableHotelRoomInstantOffer {
  countOffered: number;
  countAvailable: number;

  hotelRoomName: string;
  hotelRoomDescription: string;

  hotelRoomImageUrl: string;
}

export interface RenderableInstantOffer {
  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  offerPriceInCents: number;
  listPriceInCents: number;

  packageImageUrl: string;

  offerDescription: string;

  offerCriteria: RenderableInstantOfferCriterion[];

  hotelRoomOffers: RenderableHotelRoomInstantOffer[];

  summary: InstantOfferSummary;
}
