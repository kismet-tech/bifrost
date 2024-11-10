import { FormQuestionResponseNotNullCondition } from "@/models/formQuestions/formQuestionResponseCondition";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

interface DoFormQuestionResponsesMatchOnNotNullConditionProps {
  condition: FormQuestionResponseNotNullCondition;
  formQuestionsWithResponses: QuestionWithResponse[];
}

export const doFormQuestionResponsesMatchOnNotNullCondition = ({
  condition: { formQuestionId },
  formQuestionsWithResponses,
}: DoFormQuestionResponsesMatchOnNotNullConditionProps): boolean => {
  const maybeAnsweredQuestionWithResponse: QuestionWithResponse | undefined =
    formQuestionsWithResponses.find(
      (answeredQuestionWithResponse) =>
        answeredQuestionWithResponse.formQuestionId === formQuestionId
    );

  return !!maybeAnsweredQuestionWithResponse;
};
