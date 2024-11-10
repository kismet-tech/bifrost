import { potentialDatesQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftV2DateFlexibilityScreenFlexibleDatesPath: LayoutBlockConfiguration =
  {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SUBHEADER,
        backupText: "Potential dates",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.MULTI_DATE_RANGE_PICKER,
        formQuestionId: potentialDatesQuestionKnollcroftV3.formQuestionId,
      },
    ],
  };
