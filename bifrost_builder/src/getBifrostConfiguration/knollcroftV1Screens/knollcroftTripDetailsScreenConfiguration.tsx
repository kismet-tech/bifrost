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
import { knollcroftBusinessScreenConfiguration } from "./business/knollcroftBusinessScreenConfiguration";
import { knollcroftSocialHotelRoomRequirementScreenConfiguration } from "./social/knollcroftSocialHotelRoomRequirementScreenConfiguration";
import { generateHotelRoomDateScreenSequence } from "./screenSequences/hotelRoomDateScreenSequence/generateHotelRoomDateScreenSequence";
import { knollcroftSocialRoomsOnlySplitCheckScreenConfiguration } from "./social/knollcroftSocialRoomsOnlySplitCheckScreenConfiguration";
import { knollcroftSocialAlternateRoomAvailabilityWithoutEventSpaceScreenConfiguration } from "./social/knollcroftSocialAlternateRoomAvailabilityWithoutEventSpaceScreenConfiguration";
import { knollcroftCompletedScreenConfiguration } from "./knollcroftCompletedScreenConfiguration";

const knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesPointer: ScreenPointer =
  {
    type: ScreenPointerType.BRANCH_BY_ROOM_AVAILABILITY_ON_DATES,
    startCalendarDateKeyPath: ["start_date"],
    endCalendarDateKeyPath: ["end_date"],
    alternativeStartCalendarDateKeyPath: ["alternative_start_date"],
    alternativeEndCalendarDateKeyPath: ["alternative_end_date"],
    roomsAreAvailableScreenConfiguration:
      knollcroftSocialRoomsOnlySplitCheckScreenConfiguration,
    roomsAreNotAvailableButAlternativesAreAvailableScreenConfiguration:
      knollcroftSocialAlternateRoomAvailabilityWithoutEventSpaceScreenConfiguration,
    roomsAreNotAvailableAndAlternativesAreNotAvailableScreenConfiguration:
      knollcroftCompletedScreenConfiguration,
  };

const knollcroftSocialIsEventSpaceRequiredPointer: ScreenPointer = {
  type: ScreenPointerType.BRANCH_BY_EVENT_SPACE_REQUIREMENT,
  eventSpaceIsRequiredScreenConfiguration:
    knollcroftSocialHotelRoomRequirementScreenConfiguration,
  eventSpaceIsNotRequiredScreenConfiguration:
    generateHotelRoomDateScreenSequence({
      startCalendarDateKeyName: "start_date",
      endCalendarDateKeyName: "end_date",
      countOfHotelRoomGuestsKeyName: "count_of_hotel_room_guests",
      countOfRoomsNeededKeyName: "number_of_rooms_needed",
      rigidDatesPath: {
        screenPointer: knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesPointer,
        submitsForm: false,
      },
      flexibleDatesPath: {
        screenPointer: knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesPointer,
        submitsForm: false,
      },
    }),
};

export const knollcroftTripDetailsScreenConfiguration: ScreenConfiguration = {
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.HEADER,
        backupText: "",
        templateText: "Hi {{firstName}}, can you tell us more about your trip?",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_AREA_INPUT,
        label: "Details",
        keyName: "additionalDetails",
        placeholder: "Tell us about your plans...",
      },
      {
        blockType: BlockType.LAYOUT_BLOCK,
        layoutBlockType: LayoutBlockType.COLUMNS,
        columns: [
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.BUTTON,
            label: "Business",
            keyName: "booking_category",
            keyValue: "business",
            submitsForm: false,
            screenPointer: {
              type: ScreenPointerType.DIRECT,
              screenConfiguration: knollcroftBusinessScreenConfiguration,
            },
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.BUTTON,
            label: "Social",
            keyName: "booking_category",
            keyValue: "social",
            submitsForm: false,
            screenPointer: knollcroftSocialIsEventSpaceRequiredPointer,
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.BUTTON,
            label: "Other",
            keyName: "booking_category",
            keyValue: "other",
            submitsForm: false,
            screenPointer: knollcroftSocialIsEventSpaceRequiredPointer,
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
        ],
      },
    ],
  },
};
