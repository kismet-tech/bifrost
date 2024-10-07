import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";
import { knollcroftBusinessHotelRoomRequirementFormBlocks } from "./knollcroftBusinessHotelRoomRequirementFormBlocks";
import { knollcroftBusinessEventSpaceFormBlocks } from "./knollcroftBusinessEventSpaceFormBlocks";

export const knollcroftBusinessIsEventSpaceRequiredSmartBranchingNodeFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE,
      eventSpaceIsRequiredBranchFormBlocks:
        knollcroftBusinessEventSpaceFormBlocks,
      eventSpaceIsNotRequiredBranchFormBlocks:
        knollcroftBusinessHotelRoomRequirementFormBlocks,
    },
  ];
