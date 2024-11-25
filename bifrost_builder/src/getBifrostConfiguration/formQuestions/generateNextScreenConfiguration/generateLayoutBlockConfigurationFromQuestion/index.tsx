import { UIBlockConfiguration } from "@/models/configuration";
import {
  FormQuestion,
  FormQuestionType,
} from "../../../../models/formQuestions/formQuestion";
import { generateLayoutBlockConfigurationFromTextInputQuestion } from "./generateLayoutBlockConfigurationFromTextInputQuestion";
import { generateLayoutBlockConfigurationFromTextAreaQuestion } from "./generateLayoutBlockConfigurationFromTextAreaQuestion";
import { generateLayoutBlockConfigurationFromDateRangePickerQuestion } from "./generateLayoutBlockConfigurationFromDateRangePickerQuestion";
import { generateLayoutBlockConfigurationFromMultiDateRangePickerQuestion } from "./generateLayoutBlockConfigurationFromMultiDateRangePickerQuestion";
import { generateLayoutBlockConfigurationFromSelectAmongstButtonsQuestion } from "./generateLayoutBlockConfigurationFromSelectAmongstButtonsQuestion";

interface GenerateLayoutBlockConfigurationFromQuestionProps {
  formQuestion: FormQuestion;
}

export const generateLayoutBlockConfigurationFromQuestion = ({
  formQuestion,
}: GenerateLayoutBlockConfigurationFromQuestionProps): UIBlockConfiguration => {
  if (formQuestion.type === FormQuestionType.TEXT_INPUT) {
    return generateLayoutBlockConfigurationFromTextInputQuestion({
      formQuestion,
    });
  } else if (formQuestion.type === FormQuestionType.TEXT_AREA) {
    return generateLayoutBlockConfigurationFromTextAreaQuestion({
      formQuestion,
    });
  } else if (formQuestion.type === FormQuestionType.DATE_RANGE_PICKER) {
    return generateLayoutBlockConfigurationFromDateRangePickerQuestion({
      formQuestion,
    });
  } else if (formQuestion.type === FormQuestionType.MULTI_DATE_RANGE_PICKER) {
    return generateLayoutBlockConfigurationFromMultiDateRangePickerQuestion({
      formQuestion,
    });
  } else if (formQuestion.type === FormQuestionType.SELECT_AMONGST_BUTTONS) {
    return generateLayoutBlockConfigurationFromSelectAmongstButtonsQuestion({
      formQuestion,
    });
  } else {
    throw new Error("Unsupported form question type");
  }
};
