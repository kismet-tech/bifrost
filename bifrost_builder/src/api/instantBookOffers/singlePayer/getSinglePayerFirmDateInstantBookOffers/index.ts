import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  GetSinglePayerFirmDateInstantBookOffersRequestDto,
  GetSinglePayerFirmDateInstantBookOffersSuccessResponseDto,
} from "./models";
import { Api } from "@/api";
import { RenderableBifrostInstantBookOffer } from "../../models";

export const getSinglePayerFirmDateInstantBookOffers = async (
  request: GetSinglePayerFirmDateInstantBookOffersRequestDto
): Promise<{
  instantBookOffers: RenderableBifrostInstantBookOffer[];
  userSessionId: string;
}> => {
  const response: AxiosResponse<
    GetSinglePayerFirmDateInstantBookOffersSuccessResponseDto | ErrorResponseDto
  > = await Api.post(
    `/Bifrost/GetSinglePayerFirmDateInstantBookOffers`,
    request,
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const instantBookOffers: RenderableBifrostInstantBookOffer[] = (
    response.data as GetSinglePayerFirmDateInstantBookOffersSuccessResponseDto
  ).success.instantBookOffers;

  const userSessionId = (
    response.data as GetSinglePayerFirmDateInstantBookOffersSuccessResponseDto
  ).success.userSessionId;

  return { instantBookOffers, userSessionId };
};
