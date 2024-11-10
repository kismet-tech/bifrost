import { selectedDatesQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import { roomCountQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import {
  BlockType,
  ItinerarySummaryHeaderUIBlockConfiguration,
  ItinerarySummaryHeaderUIBlockFieldIcon,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftV2SummaryHeader: ItinerarySummaryHeaderUIBlockConfiguration =
  {
    blockType: BlockType.UI_BLOCK,
    uiBlockType: UIBlockType.ITINERARY_SUMMARY_HEADER,
    fields: [
      {
        icon: ItinerarySummaryHeaderUIBlockFieldIcon.BUILDING,
        template: `{{${roomCountQuestionKnollcroftV3.formQuestionId}}} rooms`,
        updateDataLabel: "choose",
        formQuestionId: roomCountQuestionKnollcroftV3.formQuestionId,
      },
      {
        icon: ItinerarySummaryHeaderUIBlockFieldIcon.CALENDAR,
        template: `{{${selectedDatesQuestionKnollcroftV3.formQuestionId}}}`,
        updateDataLabel: "select dates",
        formQuestionId: selectedDatesQuestionKnollcroftV3.formQuestionId,
      },
      {
        icon: ItinerarySummaryHeaderUIBlockFieldIcon.BELL,
        template: ``,
        updateDataLabel: "details",
      },
    ],
  };
