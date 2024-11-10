import {
  BlockType,
  ToggleGroupUIBlockConfigurationOption,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { SelectAmongstButtonsFormQuestion } from "../../../../models/formQuestions/formQuestion";

interface GenerateLayoutBlockConfigurationFromSelectAmongstButtonsQuestionProps {
  formQuestion: SelectAmongstButtonsFormQuestion;
}

export const generateLayoutBlockConfigurationFromSelectAmongstButtonsQuestion =
  ({
    formQuestion,
  }: GenerateLayoutBlockConfigurationFromSelectAmongstButtonsQuestionProps): UIBlockConfiguration => {
    const toggleGroupOptions: ToggleGroupUIBlockConfigurationOption[] =
      formQuestion.options.map(
        (option): ToggleGroupUIBlockConfigurationOption => {
          return {
            label: option.label,
            keyValue: option.label,
          };
        }
      );

    return {
      blockType: BlockType.UI_BLOCK,
      formQuestionId: formQuestion.formQuestionId,
      uiBlockType: UIBlockType.TOGGLE_GROUP,
      label: formQuestion.label,
      options: toggleGroupOptions,
    };
  };
