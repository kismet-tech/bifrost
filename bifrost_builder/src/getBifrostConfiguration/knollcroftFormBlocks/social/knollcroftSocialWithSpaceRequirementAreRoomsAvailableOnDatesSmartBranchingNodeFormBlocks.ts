import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialWithSpaceRequirementSplitCheckFormBlocks } from "./knollcroftSocialWithSpaceRequirementSplitCheckFormBlocks";
import { knollcroftSocialAlternateRoomAvailabilityFormBlocks } from "./knollcroftSocialAlternateRoomAvailabilityFormBlocks";

export const knollcroftSocialWithSpaceRequirementAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType:
        FormBlockType.ARE_ROOMS_AVAILABLE_ON_DATES_SMART_BRANCHING_NODE,
      rommsAreAvailableBranchFormBlocks:
        knollcroftSocialWithSpaceRequirementSplitCheckFormBlocks,
      roomsAreNotAvailableBranchButAlternativesAreAvailableFormBlocks:
        knollcroftSocialAlternateRoomAvailabilityFormBlocks,
      roomsAreNotAvailableBranchAndNoAlternativesAreAvailableFormBlocks: [],
      startCalendarDateKeyName: "start_date",
      endCalendarDateKeyName: "end_date",
      alternativeStartCalendarDateKeyName: "alternate_start_date",
      alternativeEndCalendarDateKeyName: "alternate_end_date",
    },
  ];
