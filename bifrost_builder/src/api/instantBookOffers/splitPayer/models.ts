import { CalendarDateRange } from "@/models/CalendarDateRange";
import { EitherResponseType } from "@/models/monads";
import {
  FormQuestionIdAndResponsePair,
  InstantBookOfferBookingCategory,
  RenderableBifrostInstantBookOffer,
} from "../models";

//////////////////////////////////////////////////
// REQUEST ///////////////////////////////////////
//////////////////////////////////////////////////

export interface GetSplitPayerInstantBookOffersRequestDto {
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

export interface GetSplitPayerInstantBookOffersSuccessResponseDataDto {
  userSessionId: string;
  instantBookOffers: RenderableBifrostInstantBookOffer[];
}

export interface GetSplitPayerInstantBookOffersSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: GetSplitPayerInstantBookOffersSuccessResponseDataDto;
}
