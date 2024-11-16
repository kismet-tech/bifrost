import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnCondition } from ".";
import { FormQuestionResponseAndCondition } from "@/models/formQuestions/formQuestionResponseCondition";

interface DoFormQuestionResponsesMatchOnAndConditionProps {
  condition: FormQuestionResponseAndCondition;
  formQuestionsWithResponses: FormQuestionWithResponse[];
}

export const doFormQuestionResponsesMatchOnAndCondition = ({
  condition: { AND },
  formQuestionsWithResponses,
}: DoFormQuestionResponsesMatchOnAndConditionProps): boolean => {
  return AND.every((condition) =>
    doFormQuestionResponsesMatchOnCondition({
      condition,
      formQuestionsWithResponses,
    })
  );
};
