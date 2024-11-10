import {
  FormQuestion,
  FormQuestionGroup,
  FormQuestionType,
} from "../../../models/formQuestions/formQuestion";

export const firstNameQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "First Name",
  type: FormQuestionType.TEXT_INPUT,
  priority: 1,
  label: "First Name",
  dependentUpon: [],
};

export const lastNameQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Last Name",
  type: FormQuestionType.TEXT_INPUT,
  priority: 1,
  label: "Last Name",
  dependentUpon: [],
};

export const guestEmailQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Email",
  type: FormQuestionType.TEXT_INPUT,
  priority: 1,
  label: "Email",
  dependentUpon: [],
};

export const guestPhoneNumberQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Phone Number",
  type: FormQuestionType.TEXT_INPUT,
  priority: 1,
  label: "Phone Number",
  dependentUpon: [],
};

export const guestIdentiyQuestionGroupKnollcroftV3: FormQuestionGroup = {
  formQuestions: [
    firstNameQuestionKnollcroftV3,
    lastNameQuestionKnollcroftV3,
    guestEmailQuestionKnollcroftV3,
    guestPhoneNumberQuestionKnollcroftV3,
  ],
};
