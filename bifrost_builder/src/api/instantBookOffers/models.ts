import { CalendarDate } from "@/models/CalendarDate";

export interface FormQuestionIdAndResponsePair {
  formQuestionId: string;
  response: string;
}

export enum InstantBookOfferBookingCategory {
  BUSINESS = "BUSINESS",
  SOCIAL = "SOCIAL",
  EXTENDED_STAY = "EXTENDED_STAY",
}

export interface RenderableBifrostHotelRoomInstantBookOffer {
  hotelRoomId: string;

  countOffered: number;
  countAvailable: number;

  offerPriceInCents: number;
  listPriceInCents: number;

  hotelRoomName: string;
  hotelRoomDescription: string;

  hotelRoomImageUrls: string[];
}

export interface RenderableBifrostInstantBookOfferCriterionWithValidationCheck {
  criterionName: string;
  doesMatchCriterion: boolean;
}

export interface RenderableBifrostInstantBookOfferRules {
  holdDurationInDays: number;

  discountExpiresAtTimestamp: number;

  depositPercentage: number;
  depositCollectionTimestamp: number;
  paymentCollectionTimestamp: number;
}

export interface RenderableBifrostInstantBookOffer {
  itineraryOfferId: string;

  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  instantBookOfferName: string;
  instantBookOfferDescription: string;

  offerPriceInCents: number;
  listPriceInCents: number;

  packageImageUrl?: string;

  hotelRoomOffers: RenderableBifrostHotelRoomInstantBookOffer[];

  instantBookOfferCriteria: RenderableBifrostInstantBookOfferCriterionWithValidationCheck[];

  offerRules: RenderableBifrostInstantBookOfferRules;
}
