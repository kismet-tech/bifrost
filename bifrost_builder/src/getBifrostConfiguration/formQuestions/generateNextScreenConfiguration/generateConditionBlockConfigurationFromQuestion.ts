import {
  BlockType,
  ConditonBlockConfiguration,
  LayoutBlockType,
  UIBlockConfiguration,
} from "@/models/configuration";
import { FormQuestionResponseCondition } from "@/models/formQuestions/formQuestionResponseCondition";

interface GenerateConditionBlockConfigurationFromQuestionProps {
  formQuestionResponseCondition: FormQuestionResponseCondition;
  uiBlockConfiguration: UIBlockConfiguration;
}

export const generateConditionBlockConfigurationFromQuestion = ({
  formQuestionResponseCondition,
  uiBlockConfiguration,
}: GenerateConditionBlockConfigurationFromQuestionProps): ConditonBlockConfiguration => {
  const conditonBlockConfiguration: ConditonBlockConfiguration = {
    blockType: BlockType.CONDITION_BLOCK,
    paths: [
      {
        condition: formQuestionResponseCondition,
        layout: {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.ROWS,
          rows: [uiBlockConfiguration],
        },
      },
    ],
  };

  return conditonBlockConfiguration;
};
