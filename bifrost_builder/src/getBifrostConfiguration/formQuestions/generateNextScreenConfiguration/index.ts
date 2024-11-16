import {
  BlockType,
  ConditonBlockConfiguration,
  LayoutBlockType,
  ScreenConfiguration,
  ScreenNavigatorUIBlockConfiguration,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { generateLayoutBlockConfigurationFromQuestion } from "./generateLayoutBlockConfigurationFromQuestion";
import {
  FormQuestion,
  FormQuestionGroup,
} from "../../../models/formQuestions/formQuestion";
import { knollcroftV2SummaryHeader } from "@/getBifrostConfiguration/knollcroftV2Screens/components/knollcroftV2SummaryHeader";
import {
  BagOfQuestions,
  FormQuestionId,
} from "@/models/formQuestions/questionWithResponse";
import { generateConditionBlockConfigurationFromQuestion } from "./generateConditionBlockConfigurationFromQuestion";

interface GenerateScreenConfigurationProps {
  bagOfQuestions: BagOfQuestions;
  targetFormQuestionId?: FormQuestionId;
}

export const generateNextScreenConfiguration = ({
  bagOfQuestions,
  targetFormQuestionId,
}: GenerateScreenConfigurationProps): ScreenConfiguration => {
  let questionsGroupOnScreen: FormQuestionGroup;

  if (targetFormQuestionId) {
    questionsGroupOnScreen =
      bagOfQuestions.find((formQuestionGroup: FormQuestionGroup): boolean => {
        return formQuestionGroup.formQuestions.some(
          (formQuestion: FormQuestion) =>
            formQuestion.formQuestionId === targetFormQuestionId
        );
      }) || bagOfQuestions[0];
  } else {
    questionsGroupOnScreen = bagOfQuestions[0];
  }

  const questionBlockConfigurations: (
    | UIBlockConfiguration
    | ConditonBlockConfiguration
  )[] = questionsGroupOnScreen.formQuestions.map(
    (formQuestion: FormQuestion) => {
      const uiBlockConfiguration: UIBlockConfiguration =
        generateLayoutBlockConfigurationFromQuestion({ formQuestion });

      if (!formQuestion.conditionalUpon) {
        return uiBlockConfiguration;
      } else {
        const conditonBlockConfiguration: ConditonBlockConfiguration =
          generateConditionBlockConfigurationFromQuestion({
            formQuestionResponseCondition: formQuestion.conditionalUpon,
            uiBlockConfiguration,
          });

        return conditonBlockConfiguration;
      }
    }
  );

  const screenNavigator: ScreenNavigatorUIBlockConfiguration = {
    blockType: BlockType.UI_BLOCK,
    uiBlockType: UIBlockType.SCREEN_NAVIGATOR,
    paths: [],
  };

  return {
    formQuestionIds: questionsGroupOnScreen.formQuestions.map(
      (formQuestion: FormQuestion) => formQuestion.formQuestionId
    ),
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        knollcroftV2SummaryHeader,
        ...questionBlockConfigurations,
        screenNavigator,
      ],
    },
  };
};
