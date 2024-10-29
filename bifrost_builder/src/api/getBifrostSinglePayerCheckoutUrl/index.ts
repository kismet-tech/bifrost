import { Api } from "..";
import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  GetBifrostSinglePayerCheckoutUrlRequestDto,
  GetBifrostSinglePayerCheckoutUrlSuccessResponseDto,
} from "./models";

export const getBifrostSinglePayerCheckoutUrl = async (
  requestBody: GetBifrostSinglePayerCheckoutUrlRequestDto
): Promise<{ checkoutUrl: string }> => {
  console.log("getBifrostCheckoutUrl requestBody");
  console.log(requestBody);

  const response: AxiosResponse<
    GetBifrostSinglePayerCheckoutUrlSuccessResponseDto | ErrorResponseDto
  > = await Api.post(
    `/Bifrost/GetBifrostSinglePayerCheckoutUrl`,
    requestBody,
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const checkoutUrl: string = (
    response.data as GetBifrostSinglePayerCheckoutUrlSuccessResponseDto
  ).success.checkoutUrl;

  return { checkoutUrl };
};
