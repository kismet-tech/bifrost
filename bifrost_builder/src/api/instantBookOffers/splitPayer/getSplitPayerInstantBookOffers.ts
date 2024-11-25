import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import { Api } from "@/api";
import { RenderableBifrostInstantBookOffer } from "../models";
import {
  GetSplitPayerInstantBookOffersRequestDto,
  GetSplitPayerInstantBookOffersSuccessResponseDto,
} from "./models";

export const getSplitPayerInstantBookOffers = async (
  request: GetSplitPayerInstantBookOffersRequestDto
): Promise<{
  instantBookOffers: RenderableBifrostInstantBookOffer[];
  userSessionId: string;
}> => {
  const response: AxiosResponse<
    GetSplitPayerInstantBookOffersSuccessResponseDto | ErrorResponseDto
  > = await Api.post(`/Bifrost/GetSplitPayerInstantBookOffers`, request, {});

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const instantBookOffers: RenderableBifrostInstantBookOffer[] = (
    response.data as GetSplitPayerInstantBookOffersSuccessResponseDto
  ).success.instantBookOffers;

  const userSessionId = (
    response.data as GetSplitPayerInstantBookOffersSuccessResponseDto
  ).success.userSessionId;

  return { instantBookOffers, userSessionId };
};
