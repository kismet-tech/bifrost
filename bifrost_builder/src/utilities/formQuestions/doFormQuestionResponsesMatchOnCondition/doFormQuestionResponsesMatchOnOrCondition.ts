import { FormQuestionResponseOrCondition } from "@/models/formQuestions/formQuestionResponseCondition";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnCondition } from ".";

interface DoFormQuestionResponsesMatchOnOrConditionProps {
  condition: FormQuestionResponseOrCondition;
  formQuestionsWithResponses: QuestionWithResponse[];
}

export const doFormQuestionResponsesMatchOnOrCondition = ({
  condition: { OR },
  formQuestionsWithResponses,
}: DoFormQuestionResponsesMatchOnOrConditionProps): boolean => {
  return OR.some((condition) => {
    const formDataMatchesOnKeyPathCondition =
      doFormQuestionResponsesMatchOnCondition({
        condition,
        formQuestionsWithResponses,
      });

    return formDataMatchesOnKeyPathCondition;
  });
};
