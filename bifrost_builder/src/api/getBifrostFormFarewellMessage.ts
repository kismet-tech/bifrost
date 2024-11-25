import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { Api } from ".";
import { rewriteQuestionsWithResponsesToFormData } from "./utilities/rewriteQuestionsWithResponsesToFormData";

interface GetBifrostFormFarewellMessageProps {
  hotelId: string;
  bifrostTravelerId: string;
  questionsWithResponses: FormQuestionWithResponse[];
}

export const getBifrostFormFarewellMessage = async ({
  hotelId,
  bifrostTravelerId,
  questionsWithResponses,
}: GetBifrostFormFarewellMessageProps): Promise<{ farewellText: string }> => {
  console.log("CALLING getBifrostFormFarewellMessage");

  const formData = rewriteQuestionsWithResponsesToFormData({
    questionsWithResponses,
  });

  const response = await Api.post(
    `/Bifrost/GetBifrostFormFarewellMessage`,
    {
      hotelId,
      bifrostTravelerId,
      formData,
    },
    {}
  );

  if ("error" in response.data) {
    console.error(response.data.error.reason);
  }

  const farewellText = response.data.success.farewellText;

  console.log(`farewellText: ${farewellText}`);
  return { farewellText };
};
