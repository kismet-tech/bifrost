import { EitherResponseType } from "@/models/monads";

export interface SubmitBifrostFormRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;

  bifrostFormId: string;

  localFormUserSessionId: string;

  formData: { [key: string]: string };
}

export interface SubmitBifrostFormSuccessResponseDataDto {
  userSessionId: string;
}

export interface SubmitBifrostFormSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: SubmitBifrostFormSuccessResponseDataDto;
}
