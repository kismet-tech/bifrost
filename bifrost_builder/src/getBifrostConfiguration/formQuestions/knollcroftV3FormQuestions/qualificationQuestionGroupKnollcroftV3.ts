import {
  FormQuestion,
  FormQuestionGroup,
  FormQuestionType,
} from "../../../models/formQuestions/formQuestion";

export const estimatedBudgetQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Estimate Budget Range",
  type: FormQuestionType.TEXT_INPUT,
  priority: 10,
  label: "Budget range (estimate is fine)",
  dependentUpon: [],
};

export const specialRequestsQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Special Requests",
  type: FormQuestionType.TEXT_AREA,
  priority: 10,
  label: "Special Requests",
  dependentUpon: [],
};

export const qualificationQuestionGroupKnollcroftV3: FormQuestionGroup = {
  formQuestions: [estimatedBudgetQuestionKnollcroftV3],
};
