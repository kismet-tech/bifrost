import { FormQuestionResponseNotNullCondition } from "@/models/formQuestions/formQuestionResponseCondition";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface DoFormQuestionResponsesMatchOnNotNullConditionProps {
  condition: FormQuestionResponseNotNullCondition;
  formQuestionsWithResponses: FormQuestionWithResponse[];
}

export const doFormQuestionResponsesMatchOnNotNullCondition = ({
  condition: { formQuestionId },
  formQuestionsWithResponses,
}: DoFormQuestionResponsesMatchOnNotNullConditionProps): boolean => {
  const maybeAnsweredQuestionWithResponse:
    | FormQuestionWithResponse
    | undefined = formQuestionsWithResponses.find(
    (answeredQuestionWithResponse) =>
      answeredQuestionWithResponse.formQuestionId === formQuestionId
  );

  return !!maybeAnsweredQuestionWithResponse;
};
