import { CalendarDate } from "@/models/CalendarDate";
import { EitherResponseType } from "@/models/monads";

export interface GetBifrostSplitPayerCheckoutUrlHotelRoomInstantBookOffer {
  countRequested: number;
  offerPriceInCents: number;

  hotelRoomId: string;
}

export interface GetBifrostSplitPayerCheckoutUrlRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;

  startCalendarDate: CalendarDate;
  endCalendarDate: CalendarDate;

  hotelRoomOffers: GetBifrostSplitPayerCheckoutUrlHotelRoomInstantBookOffer[];
  userSessionId: string;
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface GetBifrostSplitPayerCheckoutUrlSuccessResponseDataDto {
  checkoutUrl: string;
}

export interface GetBifrostSplitPayerCheckoutUrlSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetBifrostSplitPayerCheckoutUrlSuccessResponseDataDto;
}
