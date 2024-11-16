import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { Api } from ".";
import { rewriteQuestionsWithResponsesToFormData } from "./utilities/rewriteQuestionsWithResponsesToFormData";

interface RegisterBifrostFormInputProps {
  hotelId: string;
  bifrostTravelerId: string;
  bifrostFormId: string;
  localFormUserSessionId: string;
  questionsWithResponses: FormQuestionWithResponse[];
}

export const registerBifrostFormInput = async ({
  hotelId,
  bifrostTravelerId,
  bifrostFormId,
  localFormUserSessionId,
  questionsWithResponses,
}: RegisterBifrostFormInputProps) => {
  const formData = rewriteQuestionsWithResponsesToFormData({
    questionsWithResponses,
  });

  await Api.post(
    `/Bifrost/RegisterBifrostFormInput`,
    {
      hotelId,
      bifrostTravelerId,
      bifrostFormId,
      localFormUserSessionId,
      formData,
    },
    {}
  );
};
