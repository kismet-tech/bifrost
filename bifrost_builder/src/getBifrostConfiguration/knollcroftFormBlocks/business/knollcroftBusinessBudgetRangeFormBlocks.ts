import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";
import { knollcroftBusinessIsEventSpaceRequiredSmartBranchingNodeFormBlocks } from "./knollcroftBusinessIsEventSpaceRequiredSmartBranchingNodeFormBlocks";

export const knollcroftBusinessBudgetRangeFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.TEXT_INPUT,
      label: "Budget",
      keyName: "budget",
      placeholder: "",
      inputType: "text",
    },
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      buttons: [
        {
          label: "Still figuring it out",
          submitsForm: false,
          branchFormBlocks:
            knollcroftBusinessIsEventSpaceRequiredSmartBranchingNodeFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      buttons: [
        {
          label: "Next",
          submitsForm: false,
          branchFormBlocks:
            knollcroftBusinessIsEventSpaceRequiredSmartBranchingNodeFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
