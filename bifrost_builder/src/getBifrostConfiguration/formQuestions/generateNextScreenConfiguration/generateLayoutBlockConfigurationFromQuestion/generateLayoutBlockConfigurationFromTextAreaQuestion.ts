import {
  BlockType,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { TextAreaFormQuestion } from "../../../../models/formQuestions/formQuestion";

interface GenerateLayoutBlockConfigurationFromTextAreaQuestionProps {
  formQuestion: TextAreaFormQuestion;
}

export const generateLayoutBlockConfigurationFromTextAreaQuestion = ({
  formQuestion,
}: GenerateLayoutBlockConfigurationFromTextAreaQuestionProps): UIBlockConfiguration => {
  return {
    blockType: BlockType.UI_BLOCK,
    uiBlockType: UIBlockType.TEXT_AREA_INPUT,
    formQuestionId: formQuestion.formQuestionId,
    placeholder: "",
  };
};
