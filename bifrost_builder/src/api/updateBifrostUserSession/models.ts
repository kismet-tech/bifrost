import { EitherResponseType } from "@/models/monads";

export interface UpdateBifrostUserSessionRequestDto {
  hotelId: string;
  bifrostTravelerId?: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  updatedFormData: { [key: string]: unknown };
  userSessionId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateBifrostUserSessionSuccessResponseDataDto {}

export interface UpdateBifrostUserSessionSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: UpdateBifrostUserSessionSuccessResponseDataDto;
}
