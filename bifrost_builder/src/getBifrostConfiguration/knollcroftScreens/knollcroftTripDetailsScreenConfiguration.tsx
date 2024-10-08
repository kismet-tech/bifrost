import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";
import { knollcroftBusinessScreenConfiguration } from "./business/knollcroftBusinessScreenConfiguration";

export const knollcroftTripDetailsScreenConfiguration: ScreenConfiguration = {
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.HEADER,
        backupText: "",
        templateText: "Hi {{firstName}}, can you tell us more about your trip?",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_AREA_INPUT,
        label: "Details",
        keyName: "additionalDetails",
        placeholder: "Tell us about your plans...",
      },
      {
        blockType: BlockType.LAYOUT_BLOCK,
        layoutBlockType: LayoutBlockType.COLUMNS,
        columns: [
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.BUTTON,
            label: "Business",
            keyName: "booking_category",
            keyValue: "business",
            submitsForm: false,
            pointer: {
              type: ScreenPointerType.DIRECT,
              screenConfiguration: knollcroftBusinessScreenConfiguration,
            },
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.BUTTON,
            label: "Social",
            keyName: "booking_category",
            keyValue: "social",
            submitsForm: false,
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.BUTTON,
            label: "Other",
            keyName: "booking_category",
            keyValue: "other",
            submitsForm: false,
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
    ],
  },
};
