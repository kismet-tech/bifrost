import { CalendarDate } from "@/models/CalendarDate";
import { EitherResponseType } from "@/models/monads";

export interface MaybeGetInstantBookOffersRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  formData: { [key: string]: unknown };
  userSessionId: string;
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

export interface RenderableBifrostInstantBookOfferCriterion {
  criterionName: string;
  doesMatchCriterion: boolean;
}

export interface RenderableBifrostInstantBookOffer {
  bifrostInstantBookOfferId: string;

  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  instantBookOfferName: string;
  instantBookOfferDescription: string;

  offerPriceInCents: number;
  listPriceInCents: number;

  packageImageUrl?: string;

  hotelRoomOffers: RenderableBifrostHotelRoomInstantBookOffer[];

  instantBookOfferCriteria: RenderableBifrostInstantBookOfferCriterion[];
}

export interface MaybeGetInstantBookOffersSuccessResponseDataDto {
  userSessionId: string;
  instantBookOffers: RenderableBifrostInstantBookOffer[];
}

export interface MaybeGetInstantBookOffersSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: MaybeGetInstantBookOffersSuccessResponseDataDto;
}
