import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialRoomsOnlySplitCheckFormBlocks } from "./knollcroftSocialRoomsOnlySplitCheckFormBlocks";
import { knollcroftSocialAlternateRoomAvailabilityFormBlocks } from "./knollcroftSocialAlternateRoomAvailabilityFormBlocks";

export const knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType:
        FormBlockType.ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE,
      rommsAreAvailableBranchFormBlocks:
        knollcroftSocialRoomsOnlySplitCheckFormBlocks,
      roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks:
        knollcroftSocialAlternateRoomAvailabilityFormBlocks,
      roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks: [],

      alternativeStartCalendarDateKeyName: "alternate_start_date",
      alternativeEndCalendarDateKeyName: "alternate_end_date",
    },
  ];
