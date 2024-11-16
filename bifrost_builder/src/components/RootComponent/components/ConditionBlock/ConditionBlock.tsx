import {
  ConditonBlockConfiguration,
  ScreenConfiguration,
} from "@/models/configuration";
import { LayoutBlock } from "../layoutBlocks/LayoutBlock";
import { useBifrostFormState } from "@/contexts/useBifrostFormState";
import { doFormQuestionResponsesMatchOnCondition } from "@/utilities/formQuestions/doFormQuestionResponsesMatchOnCondition";
import { FormQuestionWithResponse } from "@/models/formQuestions/questionWithResponse";

export interface ConditionOutcome {
  renderedConditionPath: JSX.Element | null;
  conditionIsTrue: boolean;
}

interface ConditionBlockProps {
  configuration: ConditonBlockConfiguration;
  screenConfigurationStack: ScreenConfiguration[];
  pushScreenConfigurationStack: (
    screenConfiguration: ScreenConfiguration
  ) => void;
  popRightscreenConfigurationStack: () => void;
  registerBifrostFormInput: () => Promise<void>;
  handleSubmitFormData: () => Promise<void>;
}

export function ConditionBlock({
  configuration: { paths },
  screenConfigurationStack,
  pushScreenConfigurationStack,
  popRightscreenConfigurationStack,
  registerBifrostFormInput,
  handleSubmitFormData,
}: ConditionBlockProps) {
  const { getQuestionsWithResponses } = useBifrostFormState();

  const formQuestionsWithResponses: FormQuestionWithResponse[] =
    getQuestionsWithResponses();

  const conditionOutcomes: ConditionOutcome[] = paths.map(
    ({ condition, layout }, index) => {
      const conditionIsTrue: boolean = doFormQuestionResponsesMatchOnCondition({
        condition,
        formQuestionsWithResponses,
      });

      let renderedConditionPath: JSX.Element | null;
      if (conditionIsTrue) {
        renderedConditionPath = (
          <LayoutBlock
            key={index}
            configuration={layout}
            registerBifrostFormInput={registerBifrostFormInput}
            handleSubmitFormData={handleSubmitFormData}
            screenConfigurationStack={screenConfigurationStack}
            pushScreenConfigurationStack={pushScreenConfigurationStack}
            popRightscreenConfigurationStack={popRightscreenConfigurationStack}
          />
        );
      } else {
        renderedConditionPath = null;
      }

      return {
        renderedConditionPath,
        conditionIsTrue,
      };
    }
  );

  return conditionOutcomes.map((outcome) => outcome.renderedConditionPath);
}
