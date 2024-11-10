import {
  BlockType,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { MultiDateRangePickerFormQuestion } from "../../../../models/formQuestions/formQuestion";

interface GenerateLayoutBlockConfigurationFromMultiDateRangePickerQuestionProps {
  formQuestion: MultiDateRangePickerFormQuestion;
}

export const generateLayoutBlockConfigurationFromMultiDateRangePickerQuestion =
  ({
    formQuestion,
  }: GenerateLayoutBlockConfigurationFromMultiDateRangePickerQuestionProps): UIBlockConfiguration => {
    return {
      blockType: BlockType.UI_BLOCK,
      formQuestionId: formQuestion.formQuestionId,
      uiBlockType: UIBlockType.MULTI_DATE_RANGE_PICKER,
    };
  };
