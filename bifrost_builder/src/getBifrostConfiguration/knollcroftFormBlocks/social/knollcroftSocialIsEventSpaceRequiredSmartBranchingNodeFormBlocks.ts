import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialHotelRoomRequirementFormBlocks } from "./knollcroftSocialHotelRoomRequirementFormBlocks";
import { getDateSequenceFormBlockSequence } from "../formBlockSequences/getDateSequenceFormBlockSequence";
import { knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks } from "./knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks";

export const knollcroftSocialIsEventSpaceRequiredSmartBranchingNodeFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.IS_EVENT_SPACE_REQUIRED_SMART_BRANCHING_NODE,
      eventSpaceIsRequiredBranchFormBlocks:
        knollcroftSocialHotelRoomRequirementFormBlocks,

      eventSpaceIsNotRequiredBranchFormBlocks: getDateSequenceFormBlockSequence(
        {
          fixedDatesPath: {
            formBlocks:
              knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks,
            submitsForm: false,
          },
          flexibleDatesPath: {
            formBlocks:
              knollcroftSocialRoomsOnlyAreRoomsAvailableOnDatesSmartBranchingNodeFormBlocks,
            submitsForm: false,
          },
        }
      ),
    },
  ];
