import {
  BlockType,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { DateRangePickerFormQuestion } from "../../../../models/formQuestions/formQuestion";

interface GenerateLayoutBlockConfigurationFromDateRangePickerQuestionProps {
  formQuestion: DateRangePickerFormQuestion;
}

export const generateLayoutBlockConfigurationFromDateRangePickerQuestion = ({
  formQuestion,
}: GenerateLayoutBlockConfigurationFromDateRangePickerQuestionProps): UIBlockConfiguration => {
  const uiBlockConfiguration: UIBlockConfiguration = {
    blockType: BlockType.UI_BLOCK,
    uiBlockType: UIBlockType.DATE_RANGE_PICKER,
    formQuestionId: formQuestion.formQuestionId,
    label: formQuestion.label,
  };

  return uiBlockConfiguration;
};
