import { Api } from "..";
import { AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/models/monads";
import {
  SubmitBifrostFormRequestDto,
  SubmitBifrostFormSuccessResponseDto,
} from "./models";
import { sentryScope } from "@/instrument";
import { rewriteQuestionsWithResponsesToFormData } from "../utilities/rewriteQuestionsWithResponsesToFormData";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { guestEmailQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestIdentiyQuestionGroup";

interface SubmitBifrostFormProps {
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  questionsWithResponses: FormQuestionWithResponse[];
}

export const submitBifrostForm = async ({
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  questionsWithResponses,
}: SubmitBifrostFormProps): Promise<{ userSessionId: string }> => {
  const emailAddressQuestion: FormQuestionWithResponse | undefined =
    questionsWithResponses.find(
      (q) => q.formQuestionId === guestEmailQuestionKnollcroftV3.formQuestionId
    );

  const emailAddress: string = emailAddressQuestion!.response as string;

  const formData = rewriteQuestionsWithResponsesToFormData({
    questionsWithResponses,
  });

  try {
    const requestBody: SubmitBifrostFormRequestDto = {
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
      emailAddress,
    };

    const response: AxiosResponse<
      SubmitBifrostFormSuccessResponseDto | ErrorResponseDto
    > = await Api.post(`/Bifrost/SubmitBifrostForm`, requestBody, {});

    if ("error" in response.data) {
      const serverError = new Error(
        `BIFROST_SERVER_ERROR: ${response.data.error}`
      );
      serverError.name = "BIFROST_SERVER_ERROR";
      sentryScope.setExtra("hotelId", hotelId);
      sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
      sentryScope.setExtra("bifrostFormId", bifrostFormId);
      sentryScope.setExtra("formData", formData);
      sentryScope.setExtra("version", __APP_VERSION__);
      sentryScope.setExtra("serverResponse", response.data);
      sentryScope.captureException(serverError);
      console.error("Error submitting form:", serverError);
    }

    const userSessionId: string = (
      response.data as SubmitBifrostFormSuccessResponseDto
    ).success.userSessionId;

    return { userSessionId };
  } catch (error) {
    const updatedError = new Error(
      `BIFROST_FORM_SUBMISSION_ERROR: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    updatedError.name = "BIFROST_FORM_SUBMISSION_ERROR";
    sentryScope.setExtra("hotelId", hotelId);
    sentryScope.setExtra("bifrostTravelerId", bifrostTravelerId);
    sentryScope.setExtra("bifrostFormId", bifrostFormId);
    sentryScope.setExtra("formData", formData);
    sentryScope.setExtra("version", __APP_VERSION__);
    sentryScope.captureException(updatedError);
    console.error("Error submitting form:", error);
    throw error;
  }
};
