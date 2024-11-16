import {
  FormQuestion,
  FormQuestionGroup,
} from "@/models/formQuestions/formQuestion";
import {
  BagOfQuestions,
  FormQuestionId,
  FormQuestionWithResponse,
} from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnCondition } from "@/utilities/formQuestions/doFormQuestionResponsesMatchOnCondition";

interface findQuestionsWithResponsesThatFailConditionsProps {
  formQuestionsWithResponses: FormQuestionWithResponse[];
  bagOfQuestions: BagOfQuestions;
}

export const findQuestionsWithResponsesThatFailConditions = ({
  formQuestionsWithResponses,
  bagOfQuestions,
}: findQuestionsWithResponsesThatFailConditionsProps): {
  formQuestionIdsThatFailConditions: FormQuestionId[];
} => {
  const formQuestions: FormQuestion[] = bagOfQuestions.flatMap(
    (formQuestionGroup: FormQuestionGroup) => formQuestionGroup.formQuestions
  );

  const formQuestionIdsThatFailConditions: FormQuestionId[] =
    formQuestionsWithResponses
      .filter((formQuestionWithResponse: FormQuestionWithResponse) => {
        const maybeFormQuestion: FormQuestion | undefined = formQuestions.find(
          (formQuestion: FormQuestion) =>
            formQuestion.formQuestionId ===
            formQuestionWithResponse.formQuestionId
        );

        if (!maybeFormQuestion || !maybeFormQuestion.conditionalUpon) {
          return false;
        }

        const conditionIsTrue: boolean =
          doFormQuestionResponsesMatchOnCondition({
            condition: maybeFormQuestion.conditionalUpon,
            formQuestionsWithResponses,
          });

        return !conditionIsTrue;
      })
      .map((questionWithResponse) => questionWithResponse.formQuestionId);

  return { formQuestionIdsThatFailConditions };
};
