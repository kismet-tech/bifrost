import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks } from "./knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks";
import { getDateSequenceFormBlockSequence } from "../formBlockSequences/getDateSequenceFormBlockSequence";
import { knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks } from "./knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks";

export const knollcroftSocialHotelRoomRequirementFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.SUBHEADER,
      backupText: "Will you need hotel rooms?",
    },
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      keyName: "are_hotel_rooms_needed",
      buttons: [
        {
          label: "Yes",
          keyValue: "true",
          submitsForm: false,
          branchFormBlocks: getDateSequenceFormBlockSequence({
            fixedDatesPath: {
              formBlocks:
                knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks,
              submitsForm: false,
            },
            flexibleDatesPath: {
              formBlocks:
                knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks,
              submitsForm: false,
            },
          }),
        },
        {
          label: "No",
          keyValue: "false",
          submitsForm: false,
          branchFormBlocks:
            knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
