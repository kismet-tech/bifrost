import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftV2CompletedScreenConfiguration: ScreenConfiguration = {
  formQuestionIds: [],
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SMART_FAREWELL_SUBHEADER,
      },
    ],
  },
};
