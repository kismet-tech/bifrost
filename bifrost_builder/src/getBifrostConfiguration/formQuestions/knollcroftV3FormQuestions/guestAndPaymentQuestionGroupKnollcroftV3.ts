import {
  FormQuestion,
  FormQuestionGroup,
  FormQuestionType,
} from "../../../models/formQuestions/formQuestion";

export const guestCountQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Guest Count",
  type: FormQuestionType.TEXT_INPUT,
  priority: 4,
  label: "Guests",
  dependentUpon: [],
};

export const roomCountQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "Room Count",
  type: FormQuestionType.TEXT_INPUT,
  priority: 4,
  label: "Rooms",
  dependentUpon: [],
};

export const splitPaymentQuestionKnollcroftV3SplitPaymentOption = {
  label: "Guests pay individually",
};

export const splitPaymentQuestionKnollcroftV3SinglePayerOption = {
  label: "Host will pay for rooms",
};

export const splitPaymentQuestionKnollcroftV3: FormQuestion = {
  formQuestionId: "How will payment be split amongst guests?",
  label: "Split payment?",
  type: FormQuestionType.SELECT_AMONGST_BUTTONS,
  priority: 4,
  options: [
    splitPaymentQuestionKnollcroftV3SplitPaymentOption,
    splitPaymentQuestionKnollcroftV3SinglePayerOption,
  ],
};

export const guestAndPaymentQuestionGroupKnollcroftV3: FormQuestionGroup = {
  formQuestions: [
    guestCountQuestionKnollcroftV3,
    roomCountQuestionKnollcroftV3,
    splitPaymentQuestionKnollcroftV3,
  ],
};
