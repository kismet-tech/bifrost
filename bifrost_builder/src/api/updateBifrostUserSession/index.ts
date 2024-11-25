import { Api } from "..";
import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  UpdateBifrostUserSessionRequestDto,
  UpdateBifrostUserSessionSuccessResponseDto,
} from "./models";

export const updateBifrostUserSession = async (
  requestBody: UpdateBifrostUserSessionRequestDto
): Promise<void> => {
  const response: AxiosResponse<
    UpdateBifrostUserSessionSuccessResponseDto | ErrorResponseDto
  > = await Api.post(`/Bifrost/UpdateBifrostUserSession`, requestBody, {});

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  return;
};
