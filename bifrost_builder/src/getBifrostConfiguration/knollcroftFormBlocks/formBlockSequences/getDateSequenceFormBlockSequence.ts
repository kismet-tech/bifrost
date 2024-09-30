import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";

interface GetDateSequenceFormBlockSequenceProps {
  fixedDatesPathFormBlocks: FormBlockConfiguration[];
  flexibleDatesPathFormBlocks: FormBlockConfiguration[];
}

export const getDateSequenceFormBlockSequence = ({
  fixedDatesPathFormBlocks,
  flexibleDatesPathFormBlocks,
}: GetDateSequenceFormBlockSequenceProps): FormBlockConfiguration[] => {
  const dateSequenceHotelRoomDatePickerFormBlocks: FormBlockConfiguration[] = [
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
          branchFormBlocks: fixedDatesPathFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];

  const dateSequenceFlexibleDateClarificationFormBlocks: FormBlockConfiguration[] =
    [
      {
        formBlockType: FormBlockType.TEXT_AREA_INPUT,
        label:
          "Can you share your thoughts on potential dates and length of stay?",
        keyName: "flexible_date_details",
        placeholder: "",
      },
      {
        formBlockType: FormBlockType.BRANCHING_NODE,
        buttons: [
          {
            label: "Next",
            submitsForm: false,
            branchFormBlocks: flexibleDatesPathFormBlocks,
          },
        ],
      },
      {
        formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
        label: "Back",
      },
    ];

  const dateSequenceRootFormBlocks: FormBlockConfiguration[] = [
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      keyName: "are_hotel_room_dates_flexible",
      buttons: [
        {
          label: "I know dates",
          keyValue: "false",
          submitsForm: false,
          branchFormBlocks: dateSequenceHotelRoomDatePickerFormBlocks,
        },
        {
          label: "I’m flexible or still planning",
          keyValue: "true",
          submitsForm: false,
          branchFormBlocks: dateSequenceFlexibleDateClarificationFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];

  return dateSequenceRootFormBlocks;
};
