import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftBusinessHotelRoomDatePickerFormBlocks } from "./knollcroftBusinessHotelRoomDatePickerFormBlocks";

export const knollcroftBusinessAreHotelRoomDatesFlexibleFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      keyName: "are_hotel_room_dates_flexible",
      buttons: [
        {
          label: "I know dates",
          keyValue: "false",
          submitsForm: false,
          branchFormBlocks: knollcroftBusinessHotelRoomDatePickerFormBlocks,
        },
        {
          label: "I’m flexible or still planning",
          keyValue: "true",
          submitsForm: false,
          branchFormBlocks: knollcroftBusinessHotelRoomDatePickerFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
