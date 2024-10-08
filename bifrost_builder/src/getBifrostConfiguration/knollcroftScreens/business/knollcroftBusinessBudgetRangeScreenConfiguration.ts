import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";

export const knollcroftBusinessBudgetRangeScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.HEADER,
          backupText: "Do you have a budget in mind? (A range is fine)",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.RANGE_SLIDER,
          label: "Budget",
          valueMinKeyName: "min_budget",
          valueMaxKeyName: "max_budget",
          rangeMin: 1,
          rangeMax: 50000,
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
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Still figuring it out",
          submitsForm: false,
          // pointer: {
          //   type: ScreenPointerType.DIRECT,
          //   screenConfiguration: knollcroftBusinessScreenConfiguration,
          // },
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Next",
          submitsForm: false,
          // pointer: {
          //   type: ScreenPointerType.DIRECT,
          //   screenConfiguration: knollcroftBusinessScreenConfiguration,
          // },
        },
      ],
    },
  };
