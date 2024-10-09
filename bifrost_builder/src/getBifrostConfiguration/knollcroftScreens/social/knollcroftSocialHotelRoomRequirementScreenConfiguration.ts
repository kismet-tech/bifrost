import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/ScreenPointer";
import { generateHotelRoomDateScreenSequence } from "../screenSequences/hotelRoomDateScreenSequence/generateHotelRoomDateScreenSequence";
import { knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration } from "./knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration";
import { knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration } from "./knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration";
import { knollcroftCompletedScreenConfiguration } from "../knollcroftCompletedScreenConfiguration";
import { knollcroftSocialAlternateRoomAvailabilityWithEventSpaceScreenConfiguration } from "./knollcroftSocialAlternateRoomAvailabilityWithEventSpaceScreenConfiguration";

const knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesScreenPointer: ScreenPointer =
  {
    type: ScreenPointerType.BRANCH_BY_ROOM_AVAILABILITY_ON_DATES,
    startCalendarDateKeyPath: ["start_date"],
    endCalendarDateKeyPath: ["end_date"],
    alternativeStartCalendarDateKeyPath: ["alternative_start_date"],
    alternativeEndCalendarDateKeyPath: ["alternative_end_date"],
    roomsAreAvailableScreenConfiguration:
      knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration,
    roomsAreNotAvailableButAlternativesAreAvailableScreenConfiguration:
      knollcroftSocialAlternateRoomAvailabilityWithEventSpaceScreenConfiguration,
    roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration:
      knollcroftCompletedScreenConfiguration,
  };

export const knollcroftSocialHotelRoomRequirementScreenConfiguration: ScreenConfiguration =
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
              pointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: generateHotelRoomDateScreenSequence({
                  startCalendarDateKeyName: "start_date",
                  endCalendarDateKeyName: "end_date",
                  countOfHotelRoomGuestsKeyName: "count_of_hotel_room_guests",
                  countOfRoomsNeededKeyName: "number_of_rooms_needed",
                  rigidDatesPath: {
                    screenPointer:
                      knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesScreenPointer,
                    submitsForm: true,
                  },
                  flexibleDatesPath: {
                    screenPointer:
                      knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesScreenPointer,
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
              pointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration,
              },
            },
          ],
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Back",
          submitsForm: false,
          pointer: {
            type: ScreenPointerType.BACK,
          },
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Skip",
          submitsForm: false,
          pointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration:
              knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration,
          },
        },
      ],
    },
  };
