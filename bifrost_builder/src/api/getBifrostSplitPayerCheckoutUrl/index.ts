import { Api } from "..";
import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  GetBifrostSplitPayerCheckoutUrlRequestDto,
  GetBifrostSplitPayerCheckoutUrlSuccessResponseDto,
} from "./models";

export const getBifrostSplitPayerCheckoutUrl = async (
  requestBody: GetBifrostSplitPayerCheckoutUrlRequestDto
): Promise<{ checkoutUrl: string }> => {
  const response: AxiosResponse<
    GetBifrostSplitPayerCheckoutUrlSuccessResponseDto | ErrorResponseDto
  > = await Api.post(
    `/Bifrost/GetBifrostSplitPayerCheckoutUrl`,
    requestBody,
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const checkoutUrl: string = (
    response.data as GetBifrostSplitPayerCheckoutUrlSuccessResponseDto
  ).success.checkoutUrl;

  return { checkoutUrl };
};
