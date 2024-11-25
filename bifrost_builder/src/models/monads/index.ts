export enum EitherResponseType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface ErrorResponseDataDto {
  reason: string;
  errorMessage?: string;
  additionalErrorInformation?: string;
}
export interface ErrorResponseDto {
  type: EitherResponseType.ERROR;
  error: ErrorResponseDataDto;

  statusCode?: number;
}
