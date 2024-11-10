import { knollcroftV3BagOfQuestions } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions";
import { BagOfQuestions } from "@/models/formQuestions/questionWithResponse";

export const getBagOfQuestions = (): BagOfQuestions => {
  return knollcroftV3BagOfQuestions;
};
