import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftCompletedFormBlocks } from "../knollcroftCompletedFormBlocks";

export const knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.TEXT_INPUT,
      label: "Event",
      keyName: "event_name",
      placeholder: "",
      inputType: "text",
    },
    {
      formBlockType: FormBlockType.TEXT_INPUT,
      label: "Estimated Count of Attendees",
      keyName: "estimated_count_of_attendees",
      placeholder: "",
      inputType: "text",
    },
    {
      formBlockType: FormBlockType.DATE_RANGE_PICKER,
      label: "Dates",
      startCalendarDateKeyName: "start_date",
      endCalendarDateKeyName: "end_date",
    },
    {
      formBlockType: FormBlockType.TEXT_INPUT,
      label: "Time",
      keyName: "event_time",
      placeholder: "",
      inputType: "time",
    },

    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      buttons: [
        {
          label: "Next",
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
