import { Api } from "..";
import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  GetBifrostCheckoutUrlRequestDto,
  GetBifrostCheckoutUrlSuccessResponseDto,
} from "./models";

export const getBifrostCheckoutUrl = async (
  requestBody: GetBifrostCheckoutUrlRequestDto
): Promise<{ checkoutUrl: string }> => {
  console.log("getBifrostCheckoutUrl requestBody");
  console.log(requestBody);

  const response: AxiosResponse<
    GetBifrostCheckoutUrlSuccessResponseDto | ErrorResponseDto
  > = await Api.post(`/Bifrost/GetBifrostCheckoutUrl`, requestBody, {});

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const checkoutUrl: string = (
    response.data as GetBifrostCheckoutUrlSuccessResponseDto
  ).success.checkoutUrl;

  return { checkoutUrl };
};
