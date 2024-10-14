import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/pointers/ScreenPointer";

interface GenerateHotelRoomDateScreenSequenceProps {
  startCalendarDateKeyName: string;
  endCalendarDateKeyName: string;
  // "count_of_hotel_room_guests"
  countOfHotelRoomGuestsKeyName: string;
  // 'number_of_rooms_needed'
  countOfRoomsNeededKeyName: string;
  rigidDatesPath: {
    screenPointer: ScreenPointer;
    submitsForm: boolean;
  };
  flexibleDatesPath: {
    screenPointer: ScreenPointer;
    submitsForm: boolean;
  };
}

export const generateHotelRoomDateScreenSequence = ({
  startCalendarDateKeyName,
  endCalendarDateKeyName,
  countOfHotelRoomGuestsKeyName,
  countOfRoomsNeededKeyName,
  rigidDatesPath: {
    screenPointer: rigidDatesPathScreenPointer,
    submitsForm: rigidDatesPathSubmitsForm,
  },
  flexibleDatesPath: {
    screenPointer: flexibleDatesPathScreenPointer,
    submitsForm: flexibleDatesPathSubmitsForm,
  },
}: GenerateHotelRoomDateScreenSequenceProps): ScreenConfiguration => {
  const hotelRoomRigidDateEntryScreenConfiguration: ScreenConfiguration = {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.DATE_RANGE_PICKER,
          label: "Dates",
          startCalendarDateKeyName: startCalendarDateKeyName,
          endCalendarDateKeyName: endCalendarDateKeyName,
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_INPUT,
          label: "Number of people",
          keyName: countOfHotelRoomGuestsKeyName,
          inputType: "text",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_INPUT,
          label: "Number of rooms",
          keyName: countOfRoomsNeededKeyName,
          inputType: "text",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          submitsForm: rigidDatesPathSubmitsForm,
          label: "Next",
          screenPointer: rigidDatesPathScreenPointer,
        },
      ],
    },
  };

  const hotelRoomFlexibleDateEntryScreenConfiguration: ScreenConfiguration = {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText:
            "Can you share your thoughts on potential dates and length of stay?",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_AREA_INPUT,
          keyName: "flexible_date_details",
          placeholder: "",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          submitsForm: flexibleDatesPathSubmitsForm,
          label: "Next",
          screenPointer: flexibleDatesPathScreenPointer,
        },
      ],
    },
  };

  const flexibleDateClarificationScreenConfiguration: ScreenConfiguration = {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "I know dates",
              submitsForm: false,
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: hotelRoomRigidDateEntryScreenConfiguration,
              },
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "I’m flexible or still planning",
              submitsForm: false,
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  hotelRoomFlexibleDateEntryScreenConfiguration,
              },
            },
          ],
        },
      ],
    },
  };

  return flexibleDateClarificationScreenConfiguration;
};
