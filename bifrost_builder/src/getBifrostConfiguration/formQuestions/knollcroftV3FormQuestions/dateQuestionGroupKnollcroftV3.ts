import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";
import {
  FormQuestion,
  FormQuestionGroup,
  FormQuestionType,
} from "../../../models/formQuestions/formQuestion";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

export const dateFlexibilityQuestionKnollcroftV3FirmDatesOption = {
  label: "My dates are firm",
};

export const dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption = {
  label: "flexible",
};

export const dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption = {
  label: "still deciding",
};

export const dateFlexibilityQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Are your dates flexible?",
  type: FormQuestionType.SELECT_AMONGST_BUTTONS,
  priority: 3,
  options: [
    dateFlexibilityQuestionKnollcroftV3FirmDatesOption,
    dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption,
    dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption,
  ],
};

export const selectedDatesQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Selected Dates",
  type: FormQuestionType.DATE_RANGE_PICKER,
  priority: 3,
  label: "Pick dates",
  conditionalUpon: [
    {
      type: FormQuestionResponseConditionType.MATCH,
      questionWithResponse: {
        responseType: QuestionResponseType.STRING,
        formQuestionId: dateFlexibilityQuestionKnollcroftV3.formQuestionId,
        response: dateFlexibilityQuestionKnollcroftV3FirmDatesOption.label,
      },
    },
  ],
};

export const potentialDatesQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Potential Dates",
  type: FormQuestionType.MULTI_DATE_RANGE_PICKER,
  priority: 3,
  label: "Pick dates",
  conditionalUpon: [
    {
      type: FormQuestionResponseConditionType.MATCH,
      questionWithResponse: {
        responseType: QuestionResponseType.STRING,
        formQuestionId: dateFlexibilityQuestionKnollcroftV3.formQuestionId,
        response: dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption.label,
      },
    },
  ],
};

export const undecidedDateDetailsQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Explanation of Undecided Dates",
  type: FormQuestionType.TEXT_AREA,
  priority: 3,
  label: "Details",
  conditionalUpon: [
    {
      type: FormQuestionResponseConditionType.MATCH,
      questionWithResponse: {
        responseType: QuestionResponseType.STRING,
        formQuestionId: dateFlexibilityQuestionKnollcroftV3.formQuestionId,
        response:
          dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption.label,
      },
    },
  ],
};

export const dateQuestionGroupKnollcroftV3: FormQuestionGroup = {
  formQuestions: [
    dateFlexibilityQuestionKnollcroftV3,
    selectedDatesQuestionKnollcroftV3,
    potentialDatesQuestionKnollcroftV3,
    undecidedDateDetailsQuestionKnollcroftV3,
  ],
};
