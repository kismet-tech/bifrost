import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  GetSinglePayerFlexibleDateInstantBookOffersRequestDto,
  GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDto,
} from "./models";
import { Api } from "@/api";
import { RenderableBifrostInstantBookOffer } from "../../models";

export const getSinglePayerFlexibleDateInstantBookOffers = async (
  request: GetSinglePayerFlexibleDateInstantBookOffersRequestDto
): Promise<{
  instantBookOffers: RenderableBifrostInstantBookOffer[];
  userSessionId: string;
}> => {
  const response: AxiosResponse<
    | GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDto
    | ErrorResponseDto
  > = await Api.post(
    `/Bifrost/GetSinglePayerFlexibleDateInstantBookOffers`,
    request,
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const instantBookOffers: RenderableBifrostInstantBookOffer[] = (
    response.data as GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDto
  ).success.instantBookOffers;

  const userSessionId = (
    response.data as GetSinglePayerFlexibleDateInstantBookOffersSuccessResponseDto
  ).success.userSessionId;

  return { instantBookOffers, userSessionId };
};
