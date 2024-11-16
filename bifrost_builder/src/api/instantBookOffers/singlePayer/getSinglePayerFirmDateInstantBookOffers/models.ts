import { EitherResponseType } from "@/models/monads";
import { CalendarDateRange } from "@/models/CalendarDateRange";
import {
  FormQuestionIdAndResponsePair,
  InstantBookOfferBookingCategory,
  RenderableBifrostInstantBookOffer,
} from "../../models";

//////////////////////////////////////////////////
// REQUEST ///////////////////////////////////////
//////////////////////////////////////////////////

export interface GetSinglePayerFirmDateInstantBookOffersRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;

  formQuestionIdAndResponsePairs: FormQuestionIdAndResponsePair[];

  calendarDateRange: CalendarDateRange;
  bookingCategory: InstantBookOfferBookingCategory;
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface GetSinglePayerFirmDateInstantBookOffersSuccessResponseDataDto {
  userSessionId: string;
  instantBookOffers: RenderableBifrostInstantBookOffer[];
}

export interface GetSinglePayerFirmDateInstantBookOffersSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetSinglePayerFirmDateInstantBookOffersSuccessResponseDataDto;
}
