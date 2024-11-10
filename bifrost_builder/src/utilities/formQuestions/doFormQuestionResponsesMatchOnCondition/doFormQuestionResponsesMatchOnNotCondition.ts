import { FormQuestionResponseNotCondition } from "@/models/formQuestions/formQuestionResponseCondition";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnCondition } from ".";

interface DoesFormDataMatchOnKeyPathNotConditionProps {
  condition: FormQuestionResponseNotCondition;
  formQuestionsWithResponses: QuestionWithResponse[];
}

export const doesFormDataMatchOnKeyPathNotCondition = ({
  condition: { NOT },
  formQuestionsWithResponses,
}: DoesFormDataMatchOnKeyPathNotConditionProps): boolean => {
  return !doFormQuestionResponsesMatchOnCondition({
    condition: NOT,
    formQuestionsWithResponses,
  });
};
