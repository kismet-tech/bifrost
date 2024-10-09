import {
  ScreenConfiguration,
  BlockType,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";
import { knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration } from "./knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration";

export const knollcroftSocialAlternateRoomAvailabilityWithEventSpaceScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.ALTERNATIVE_DATE_SUGGESTION,
          startCalendarDateKeyPath: ["start_date"],
          endCalendarDateKeyPath: ["end_date"],
          alternativeStartCalendarDateKeyPath: ["alternative_start_date"],
          alternativeEndCalendarDateKeyPath: ["alternative_end_date"],
          acceptAlternativeDatesLabel: "That works!",
          rejectAlternativeDatesLabel: "Let me know if something opens up",
          acceptedAlternativeDatesScreenPointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration:
              knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration,
          },
          rejectedAlternativeDatesScreenPointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration:
              knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration,
          },
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Back",
          submitsForm: false,
          pointer: {
            type: ScreenPointerType.BACK,
          },
        },
      ],
    },
  };
