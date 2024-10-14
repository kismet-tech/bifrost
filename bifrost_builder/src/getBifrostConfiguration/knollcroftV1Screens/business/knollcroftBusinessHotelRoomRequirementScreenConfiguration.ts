import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { generateHotelRoomDateScreenSequence } from "../screenSequences/hotelRoomDateScreenSequence/generateHotelRoomDateScreenSequence";
import { knollcroftCompletedScreenConfiguration } from "../knollcroftCompletedScreenConfiguration";

export const knollcroftBusinessHotelRoomRequirementScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.HEADER,
          backupText: "Will you need hotel rooms?",
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Yes",
              keyName: "are_hotel_rooms_needed",
              keyValue: "true",
              submitsForm: false,
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: generateHotelRoomDateScreenSequence({
                  startCalendarDateKeyName: "start_date",
                  endCalendarDateKeyName: "end_date",
                  countOfHotelRoomGuestsKeyName: "count_of_hotel_room_guests",
                  countOfRoomsNeededKeyName: "number_of_rooms_needed",
                  rigidDatesPath: {
                    screenPointer: {
                      type: ScreenPointerType.DIRECT,
                      screenConfiguration:
                        knollcroftCompletedScreenConfiguration,
                    },
                    submitsForm: true,
                  },
                  flexibleDatesPath: {
                    screenPointer: {
                      type: ScreenPointerType.DIRECT,
                      screenConfiguration:
                        knollcroftCompletedScreenConfiguration,
                    },
                    submitsForm: true,
                  },
                }),
              },
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "No",
              keyName: "are_hotel_rooms_needed",
              keyValue: "false",
              submitsForm: false,
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: knollcroftCompletedScreenConfiguration,
              },
            },
          ],
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Back",
          submitsForm: false,
          screenPointer: {
            type: ScreenPointerType.BACK,
          },
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Skip",
          submitsForm: false,
          screenPointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration: knollcroftCompletedScreenConfiguration,
          },
        },
      ],
    },
  };
