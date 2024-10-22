import { CalendarDate } from "@/models/CalendarDate";
import { EitherResponseType } from "@/models/monads";

export interface GetBifrostCheckoutUrlHotelRoomInstantBookOffer {
  countRequested: number;
  offerPriceInCents: number;

  hotelRoomId: string;
}

export interface GetBifrostCheckoutUrlRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;

  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  hotelRoomOffers: GetBifrostCheckoutUrlHotelRoomInstantBookOffer[];
  userSessionId: string;
}

export interface GetBifrostCheckoutUrlSuccessResponseDataDto {
  checkoutUrl: string;
}

export interface GetBifrostCheckoutUrlSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetBifrostCheckoutUrlSuccessResponseDataDto;
}
