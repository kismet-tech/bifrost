import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";

export const knollcroftRootScreenConfiguration: ScreenConfiguration = {
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    childConfigurations: [],
  },
};
