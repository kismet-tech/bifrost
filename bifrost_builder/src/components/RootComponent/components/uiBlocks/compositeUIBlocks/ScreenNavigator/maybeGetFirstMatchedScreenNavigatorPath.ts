import { ScreenNavigatorUIBlockConditionPath } from "@/models/configuration";
import { QuestionWithResponse } from "@/models/formQuestions/questionWithResponse";
import { doFormQuestionResponsesMatchOnCondition } from "@/utilities/formQuestions/doFormQuestionResponsesMatchOnCondition";

interface MaybeGetFirstMatchedScreenNavigatorPathProps {
  paths: ScreenNavigatorUIBlockConditionPath[];
  formQuestionsWithResponses: QuestionWithResponse[];
}

export const maybeGetFirstMatchedScreenNavigatorPath = ({
  paths,
  formQuestionsWithResponses,
}: MaybeGetFirstMatchedScreenNavigatorPathProps):
  | ScreenNavigatorUIBlockConditionPath
  | undefined => {
  let matchedPath: ScreenNavigatorUIBlockConditionPath | undefined;

  console.log(`paths: ${JSON.stringify(paths, null, 4)}`);

  paths.forEach((path: ScreenNavigatorUIBlockConditionPath) => {
    const doesMatch: boolean = doFormQuestionResponsesMatchOnCondition({
      condition: path.condition,
      formQuestionsWithResponses,
    });

    if (!matchedPath && doesMatch) {
      matchedPath = path;
    }
  });

  return matchedPath;
};
