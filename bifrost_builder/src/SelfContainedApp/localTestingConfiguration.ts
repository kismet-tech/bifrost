import {
  BifrostConfiguration,
  BlockType,
  LayoutBlockType,
} from "@/models/configuration";

export const localTestingConfiguration: BifrostConfiguration = {
  hotelId: "testing",
  bifrostFormId: "testing-1",
  rootScreenConfiguration: {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      childConfigurations: [],
    },
  },
};
