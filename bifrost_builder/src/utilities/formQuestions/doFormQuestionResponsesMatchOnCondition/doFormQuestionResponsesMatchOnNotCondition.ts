import { FormQuestionResponseNotCondition } from "@/models/formQuestions/formQuestionResponseCondition";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnCondition } from ".";

interface DoesFormDataMatchOnKeyPathNotConditionProps {
  condition: FormQuestionResponseNotCondition;
  formQuestionsWithResponses: FormQuestionWithResponse[];
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
