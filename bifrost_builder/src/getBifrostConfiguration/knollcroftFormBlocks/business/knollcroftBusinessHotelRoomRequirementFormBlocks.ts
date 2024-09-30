import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftCompletedFormBlocks } from "../knollcroftCompletedFormBlocks";
import { getDateSequenceFormBlockSequence } from "../formBlockSequences/getDateSequenceFormBlockSequence";

export const knollcroftBusinessHotelRoomRequirementFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.SUBHEADER,
      backupText: "Will you need hotel rooms?",
    },
    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      keyName: "are_hotel_rooms_needed",
      buttons: [
        {
          label: "Yes",
          keyValue: "true",
          submitsForm: false,
          branchFormBlocks: getDateSequenceFormBlockSequence({
            fixedDatesPath: {
              formBlocks: knollcroftCompletedFormBlocks,
              submitsForm: true,
            },
            flexibleDatesPath: {
              formBlocks: knollcroftCompletedFormBlocks,
              submitsForm: true,
            },
          }),
        },
        {
          label: "No",
          keyValue: "false",
          submitsForm: true,
          branchFormBlocks: knollcroftCompletedFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
