import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialRoomsOnlyAreHotelRoomDatesFlexibleFormBlocks } from "./knollcroftSocialRoomsOnlyAreHotelRoomDatesFlexibleFormBlocks";
import { knollcroftSocialHotelRoomRequirementFormBlocks } from "./knollcroftSocialHotelRoomRequirementFormBlocks";

export const knollcroftSocialIsEventSpaceRequiredSmartBranchingNodeFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE,
      eventSpaceIsRequiredBranchFormBlocks:
        knollcroftSocialHotelRoomRequirementFormBlocks,
      eventSpaceIsNotRequiredBranchFormBlocks:
        knollcroftSocialRoomsOnlyAreHotelRoomDatesFlexibleFormBlocks,
    },
  ];
