import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftBusinessBudgetRangeFormBlocks } from "./knollcroftBusinessBudgetRangeFormBlocks";

export const knollcroftBusinessFormBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.SMART_GREETING_SUBHEADER,
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Company",
    keyName: "company",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.SELECT_INPUT,
    label: "Contact me by",
    keyName: "preferred_contact_method",
    options: [
      { label: "Email", keyValue: "email" },
      { label: "Phone", keyValue: "phone" },
      { label: "Text", keyValue: "text" },
    ],
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Number of People",
    keyName: "number_of_people_total",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    buttons: [
      {
        label: "Next",
        submitsForm: false,
        branchFormBlocks: knollcroftBusinessBudgetRangeFormBlocks,
      },
    ],
  },
  {
    formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
    label: "Back",
  },
];
