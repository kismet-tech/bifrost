import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";
import { KnollcroftConfigurationV2ScreenKeys } from "./knollcroftV2Keys";

export const knollcroftV2StillDecidingDatesPath: LayoutBlockConfiguration = {
  blockType: BlockType.LAYOUT_BLOCK,
  layoutBlockType: LayoutBlockType.ROWS,
  rows: [
    {
      blockType: BlockType.UI_BLOCK,
      uiBlockType: UIBlockType.TEXT_AREA_INPUT,
      keyName: KnollcroftConfigurationV2ScreenKeys.ADDITIONAL_DETAILS,
      label: "Details",
      placeholder:
        "Potential length of stay, weeks, months, time of year, etc...",
      smartFill: false,
    },
  ],
};
