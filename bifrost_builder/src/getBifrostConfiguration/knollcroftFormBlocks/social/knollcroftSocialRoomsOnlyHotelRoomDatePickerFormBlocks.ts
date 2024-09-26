import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks } from "./knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks";

export const knollcroftSocialRoomsOnlyHotelRoomDatePickerFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.DATE_RANGE_PICKER,
      label: "Dates",
      startCalendarDateKeyName: "start_date",
      endCalendarDateKeyName: "end_date",
    },
    {
      formBlockType: FormBlockType.TEXT_INPUT,
      label: "Number of people",
      keyName: "count_of_hotel_room_guests",
      placeholder: "",
      inputType: "text",
    },
    {
      formBlockType: FormBlockType.TEXT_INPUT,
      label: "Number of rooms",
      keyName: "number_of_rooms_needed",
      placeholder: "",
      inputType: "text",
    },
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      buttons: [
        {
          label: "Next",
          submitsForm: false,
          branchFormBlocks:
            knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
