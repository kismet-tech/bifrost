import { CalendarDate } from "@/models/CalendarDate";
import { EitherResponseType } from "@/models/monads";

export interface GetBifrostSinglePayerCheckoutUrlHotelRoomInstantBookOffer {
  countRequested: number;
  offerPriceInCents: number;

  hotelRoomId: string;
}

export interface GetBifrostSinglePayerCheckoutUrlRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;

  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  itineraryOfferId: string;
  userSessionId: string;
}

export interface GetBifrostSinglePayerCheckoutUrlSuccessResponseDataDto {
  checkoutUrl: string;
}

export interface GetBifrostSinglePayerCheckoutUrlSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetBifrostSinglePayerCheckoutUrlSuccessResponseDataDto;
}
