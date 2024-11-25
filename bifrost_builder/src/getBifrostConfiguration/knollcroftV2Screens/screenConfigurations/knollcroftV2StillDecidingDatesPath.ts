import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";
import { undecidedDateDetailsQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";

export const knollcroftV2StillDecidingDatesPath: LayoutBlockConfiguration = {
  blockType: BlockType.LAYOUT_BLOCK,
  layoutBlockType: LayoutBlockType.ROWS,
  rows: [
    {
      blockType: BlockType.UI_BLOCK,
      uiBlockType: UIBlockType.TEXT_AREA_INPUT,
      formQuestionId: undecidedDateDetailsQuestionKnollcroftV3.formQuestionId,
      label: "Details",
      placeholder:
        "Potential length of stay, weeks, months, time of year, etc...",
      smartFill: false,
    },
  ],
};
