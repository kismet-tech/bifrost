import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { Api } from ".";
import { rewriteQuestionsWithResponsesToFormData } from "./utilities/rewriteQuestionsWithResponsesToFormData";

interface DetermineIfBifrostTravelerRequiresAnEventSpaceProps {
  hotelId: string;
  questionsWithResponses: QuestionWithResponse[];
}

export const determineIfBifrostTravelerRequiresAnEventSpace = async ({
  hotelId,
  questionsWithResponses,
}: DetermineIfBifrostTravelerRequiresAnEventSpaceProps): Promise<{
  isEventSpaceRequired: boolean;
}> => {
  const formData = rewriteQuestionsWithResponsesToFormData({
    questionsWithResponses,
  });

  const response = await Api.post(
    `/Bifrost/DetermineIfBifrostTravelerRequiresAnEventSpace`,
    {
      hotelId,
      formData,
    },
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error?.reason ?? "Unknown error");
    return { isEventSpaceRequired: false };
  }
  const isEventSpaceRequired = response.data.success.isEventSpaceRequired;

  return { isEventSpaceRequired };
};
