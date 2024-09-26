import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialWithSpaceRequirementAreHotelRoomDatesFlexibleFormBlocks } from "./knollcroftSocialWithSpaceRequirementAreHotelRoomDatesFlexibleFormBlocks";
import { knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks } from "./knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks";

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
          branchFormBlocks:
            knollcroftSocialWithSpaceRequirementAreHotelRoomDatesFlexibleFormBlocks,
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
