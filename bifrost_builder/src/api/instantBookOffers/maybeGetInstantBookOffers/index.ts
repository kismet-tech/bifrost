import { AxiosResponse } from "axios";
import {
  MaybeGetInstantBookOffersRequestDto,
  MaybeGetInstantBookOffersSuccessResponseDto,
  RenderableBifrostInstantBookOffer,
} from "./models";
import { ErrorResponseDto } from "@/models/monads";
import { Api } from "@/api";

export const maybeGetInstantBookOffers = async (
  request: MaybeGetInstantBookOffersRequestDto
): Promise<{
  instantBookOffers: RenderableBifrostInstantBookOffer[];
  userSessionId: string;
}> => {
  const response: AxiosResponse<
    MaybeGetInstantBookOffersSuccessResponseDto | ErrorResponseDto
  > = await Api.post(`/Bifrost/MaybeGetInstantBookOffers`, request, {});

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const instantBookOffers: RenderableBifrostInstantBookOffer[] = (
    response.data as MaybeGetInstantBookOffersSuccessResponseDto
  ).success.instantBookOffers;

  const userSessionId = (
    response.data as MaybeGetInstantBookOffersSuccessResponseDto
  ).success.userSessionId;

  return { instantBookOffers, userSessionId };
};
