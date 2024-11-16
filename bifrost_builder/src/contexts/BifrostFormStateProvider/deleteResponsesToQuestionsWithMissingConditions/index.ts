import {
  BagOfQuestions,
  FormQuestionId,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";
import { deepClone } from "@/utilities/core/deepClone";
import { findQuestionsWithResponsesThatFailConditions } from "./findQuestionsWithResponsesThatFailConditions";

interface DeleteResponsesToQuestionsWithMissingConditionsProps {
  formQuestionsWithResponses: FormQuestionWithResponse[];
  bagOfQuestions: BagOfQuestions;
}

export const deleteResponsesToQuestionsWithMissingConditions = ({
  formQuestionsWithResponses,
  bagOfQuestions,
}: DeleteResponsesToQuestionsWithMissingConditionsProps): FormQuestionWithResponse[] => {
  let updatedQuestionsWithResponses = deepClone(formQuestionsWithResponses);

  let formQuestionIdsThatFailConditions: FormQuestionId[];

  ({ formQuestionIdsThatFailConditions } =
    findQuestionsWithResponsesThatFailConditions({
      formQuestionsWithResponses: updatedQuestionsWithResponses,
      bagOfQuestions,
    }));

  while (formQuestionIdsThatFailConditions.length > 0) {
    formQuestionIdsThatFailConditions.forEach(
      (formQuestionId: FormQuestionId) => {
        updatedQuestionsWithResponses = updatedQuestionsWithResponses.filter(
          (questionWithResponse: FormQuestionWithResponse) =>
            questionWithResponse.formQuestionId !== formQuestionId
        );
      }
    );

    ({ formQuestionIdsThatFailConditions } =
      findQuestionsWithResponsesThatFailConditions({
        formQuestionsWithResponses: updatedQuestionsWithResponses,
        bagOfQuestions,
      }));
  }

  return updatedQuestionsWithResponses;
};
