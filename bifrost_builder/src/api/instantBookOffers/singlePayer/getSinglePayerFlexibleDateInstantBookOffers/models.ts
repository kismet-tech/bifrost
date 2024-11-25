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

export interface GetSinglePayerFlexibleDateInstantBookOffersRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  userSessionId: string;

  formQuestionIdAndResponsePairs: FormQuestionIdAndResponsePair[];

  bookingCategory: InstantBookOfferBookingCategory;

  calendarDateRanges?: CalendarDateRange[];
  flexibleDateDescription?: string;
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDataDto {
  userSessionId: string;
  instantBookOffers: RenderableBifrostInstantBookOffer[];
}

export interface GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDataDto;
}
