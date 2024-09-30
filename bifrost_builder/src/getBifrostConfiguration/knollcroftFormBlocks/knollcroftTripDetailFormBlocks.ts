import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftBusinessFormBlocks } from "./business/knollcroftBusinessFormBlocks";
import { knollcroftSocialIsEventSpaceRequiredSmartBranchingNodeFormBlocks } from "./social/knollcroftSocialIsEventSpaceRequiredSmartBranchingNodeFormBlocks";

export const knollcroftTripDetailFormBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.HEADER,
    backupText: "",
    templateText: "Hi {{firstName}}, can you tell us more about your trip?",
  },
  {
    formBlockType: FormBlockType.TEXT_AREA_INPUT,
    label: "Details",
    keyName: "additionalDetails",
    placeholder: "Tell us about your plans...",
  },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    keyName: "booking_category",
    buttons: [
      {
        label: "Business",
        keyValue: "business",
        submitsForm: false,
        branchFormBlocks: knollcroftBusinessFormBlocks,
      },
      {
        label: "Social",
        keyValue: "social",
        submitsForm: false,
        branchFormBlocks:
          knollcroftSocialIsEventSpaceRequiredSmartBranchingNodeFormBlocks,
      },
      {
        label: "Other",
        keyValue: "other",
        submitsForm: false,
        branchFormBlocks:
          knollcroftSocialIsEventSpaceRequiredSmartBranchingNodeFormBlocks,
      },
    ],
  },
  {
    formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
    label: "Back",
  },
];
