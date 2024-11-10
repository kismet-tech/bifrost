import { FormQuestionGroup } from "../../../models/formQuestions/formQuestion";
import { dateQuestionGroupKnollcroftV3 } from "./dateQuestionGroupKnollcroftV3";
import { guestAndPaymentQuestionGroupKnollcroftV3 } from "./guestAndPaymentQuestionGroupKnollcroftV3";
import { guestIdentiyQuestionGroupKnollcroftV3 } from "./guestIdentiyQuestionGroup";
import { inquiryDetailsQuestionGroupKnollcroftV3 } from "./inquiryDetailsQuestionGroupKnollcroftV3";

export const knollcroftV3BagOfQuestions: FormQuestionGroup[] = [
  guestIdentiyQuestionGroupKnollcroftV3,
  inquiryDetailsQuestionGroupKnollcroftV3,
  dateQuestionGroupKnollcroftV3,
  guestAndPaymentQuestionGroupKnollcroftV3,
];
