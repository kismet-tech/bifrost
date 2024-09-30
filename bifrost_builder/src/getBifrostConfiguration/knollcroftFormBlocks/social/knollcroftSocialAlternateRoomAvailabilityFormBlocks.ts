import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftSocialRoomsOnlySplitCheckFormBlocks } from "./knollcroftSocialRoomsOnlySplitCheckFormBlocks";

export const knollcroftSocialAlternateRoomAvailabilityFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.ALTERNATIVE_DATE_SUGGESTION_FORM_BLOCK,
      alternativeStartCalendarDateKeyName: "alternate_start_date",
      alternativeEndCalendarDateKeyName: "alternate_end_date",
      startCalendarDateKeyName: "start_date",
      endCalendarDateKeyName: "end_date",
      acceptAlternativeDatesLabel: "That works!",
      rejectAlternativeDatesLabel: "Let me know if something opens up",
      acceptedAlternativeDatesFormBlocks:
        knollcroftSocialRoomsOnlySplitCheckFormBlocks,
      rejectedAlternativeDatesFormBlocks: [],
    },
  ];
