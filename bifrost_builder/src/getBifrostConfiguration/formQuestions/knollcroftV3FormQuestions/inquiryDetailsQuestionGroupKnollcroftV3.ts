import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";
import {
  FormQuestion,
  FormQuestionGroup,
  FormQuestionType,
} from "../../../models/formQuestions/formQuestion";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

export const inquiryDetailsQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Inquiry Details",
  type: FormQuestionType.TEXT_AREA,
  priority: 2,
  label: "Inquiry Details",
};

export const reasonForTravelQuestionKnollcroftV3BusinessOption = {
  label: "Business",
};

export const reasonForTravelQuestionKnollcroftV3SocialOption = {
  label: "Social",
};

export const reasonForTravelQuestionKnollcroftV3OtherOption = {
  label: "Other",
};

export const reasonForTravelQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Reason for Travel",
  type: FormQuestionType.SELECT_AMONGST_BUTTONS,
  priority: 2,
  options: [
    reasonForTravelQuestionKnollcroftV3BusinessOption,
    reasonForTravelQuestionKnollcroftV3SocialOption,
    reasonForTravelQuestionKnollcroftV3OtherOption,
  ],
};

export const companyNameQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Company Name",
  type: FormQuestionType.TEXT_AREA,
  priority: 2,
  label: "Company",
  conditionalUpon: [
    {
      type: FormQuestionResponseConditionType.MATCH,
      questionWithResponse: {
        responseType: QuestionResponseType.STRING,
        formQuestionId: reasonForTravelQuestionKnollcroftV3.formQuestionId,
        response: reasonForTravelQuestionKnollcroftV3BusinessOption.label,
      },
    },
  ],
};

export const companyWebsiteQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Company Website",
  type: FormQuestionType.TEXT_AREA,
  priority: 2,
  label: "Website",
  conditionalUpon: [
    {
      type: FormQuestionResponseConditionType.MATCH,
      questionWithResponse: {
        responseType: QuestionResponseType.STRING,
        formQuestionId: reasonForTravelQuestionKnollcroftV3.formQuestionId,
        response: reasonForTravelQuestionKnollcroftV3BusinessOption.label,
      },
    },
  ],
};

export const inquiryDetailsQuestionGroupKnollcroftV3: FormQuestionGroup = {
  formQuestions: [
    inquiryDetailsQuestionKnollcroftV3,
    reasonForTravelQuestionKnollcroftV3,
    companyNameQuestionKnollcroftV3,
    companyWebsiteQuestionKnollcroftV3,
  ],
};
