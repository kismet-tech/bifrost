import {
  BlockType,
  UIBlockConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { TextInputFormQuestion } from "../../../../models/formQuestions/formQuestion";

interface GenerateLayoutBlockConfigurationFromTextInputQuestionProps {
  formQuestion: TextInputFormQuestion;
}

export const generateLayoutBlockConfigurationFromTextInputQuestion = ({
  formQuestion,
}: GenerateLayoutBlockConfigurationFromTextInputQuestionProps): UIBlockConfiguration => {
  return {
    blockType: BlockType.UI_BLOCK,
    formQuestionId: formQuestion.formQuestionId,
    uiBlockType: UIBlockType.TEXT_INPUT,
    label: formQuestion.label,
    inputType: "text",
  };
};
