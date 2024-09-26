import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialWithSpaceRequirementDatePickerFormBlocks } from "./knollcroftSocialWithSpaceRequirementDatePickerFormBlocks";

export const knollcroftSocialWithSpaceRequirementAreHotelRoomDatesFlexibleFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      keyName: "are_hotel_room_dates_flexible",
      buttons: [
        {
          label: "I know dates",
          keyValue: "false",
          submitsForm: false,
          branchFormBlocks:
            knollcroftSocialWithSpaceRequirementDatePickerFormBlocks,
        },
        {
          label: "I’m flexible or still planning",
          keyValue: "true",
          submitsForm: false,
          branchFormBlocks:
            knollcroftSocialWithSpaceRequirementDatePickerFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
