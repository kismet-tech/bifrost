import { doFormQuestionResponsesMatchOnMatchCondition } from "./doFormQuestionResponsesMatchOnMatchCondition";
import {
  FormQuestionResponseCondition,
  FormQuestionResponseConditionType,
} from "@/models/formQuestions/formQuestionResponseCondition";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnOrCondition } from "./doFormQuestionResponsesMatchOnOrCondition";
import { doFormQuestionResponsesMatchOnAndCondition } from "./doFormQuestionResponsesMatchOnAndCondition";
import { doesFormDataMatchOnKeyPathNotCondition } from "./doFormQuestionResponsesMatchOnNotCondition";
import { doFormQuestionResponsesMatchOnNotNullCondition } from "./doFormQuestionResponsesMatchOnNotNullCondition";

interface doFormQuestionResponsesMatchOnConditionProps {
  condition: FormQuestionResponseCondition;
  formQuestionsWithResponses: FormQuestionWithResponse[];
}

export const doFormQuestionResponsesMatchOnCondition = ({
  condition,
  formQuestionsWithResponses,
}: doFormQuestionResponsesMatchOnConditionProps): boolean => {
  if (condition.type === FormQuestionResponseConditionType.MATCH) {
    return doFormQuestionResponsesMatchOnMatchCondition({
      condition,
      formQuestionsWithResponses,
    });
  } else if (condition.type === FormQuestionResponseConditionType.NOT_NULL) {
    return doFormQuestionResponsesMatchOnNotNullCondition({
      condition,
      formQuestionsWithResponses,
    });
  } else if (condition.type === FormQuestionResponseConditionType.NOT) {
    return doesFormDataMatchOnKeyPathNotCondition({
      condition,
      formQuestionsWithResponses,
    });
  } else if (condition.type === FormQuestionResponseConditionType.OR) {
    return doFormQuestionResponsesMatchOnOrCondition({
      condition,
      formQuestionsWithResponses,
    });
  } else if (condition.type === FormQuestionResponseConditionType.AND) {
    return doFormQuestionResponsesMatchOnAndCondition({
      condition,
      formQuestionsWithResponses,
    });
  } else {
    throw new Error("Invalid condition type");
  }
};
