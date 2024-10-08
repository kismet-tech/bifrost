import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";
import { knollcroftBusinessBudgetRangeScreenConfiguration } from "./knollcroftBusinessBudgetRangeScreenConfiguration";

export const knollcroftBusinessScreenConfiguration: ScreenConfiguration = {
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SMART_GREETING_SUBHEADER,
        formGreetingDataKeyPath: "additionalDetails",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        label: "Company",
        keyName: "company",
        placeholder: "",
        inputType: "text",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SELECT_INPUT,
        label: "Contact me by",
        keyName: "preferred_contact_method",
        options: [
          { label: "Email", keyValue: "email" },
          { label: "Phone", keyValue: "phone" },
          { label: "Text", keyValue: "text" },
        ],
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        label: "Number of People",
        keyName: "number_of_attendees",
        inputType: "number",
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
        label: "Next",
        submitsForm: false,
        pointer: {
          type: ScreenPointerType.DIRECT,
          screenConfiguration: knollcroftBusinessBudgetRangeScreenConfiguration,
        },
      },
    ],
  },
};
