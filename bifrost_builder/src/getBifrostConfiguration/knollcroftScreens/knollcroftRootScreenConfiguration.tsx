import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftTripDetailsScreenConfiguration } from "./knollcroftTripDetailsScreenConfiguration";

export const knollcroftRootScreenConfiguration: ScreenConfiguration = {
  metadata: {
    inquiryCategory: "Group Booking",
  },
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.HEADER,
        backupText: "Group stays",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SUBHEADER,
        backupText:
          "If it’s a group trip (whether large or small) we've got you covered",
      },
      {
        blockType: BlockType.LAYOUT_BLOCK,
        layoutBlockType: LayoutBlockType.COLUMNS,
        columns: [
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.TEXT_INPUT,
            label: "First name",
            keyName: "firstName",
            placeholder: "",
            autocomplete: "given-name",
            inputType: "text",
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.TEXT_INPUT,
            label: "Last name",
            keyName: "lastName",
            placeholder: "",
            autocomplete: "family-name",
            inputType: "text",
          },
        ],
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        label: "Email",
        keyName: "email",
        placeholder: "",
        autocomplete: "email",
        inputType: "email",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        label: "Phone",
        keyName: "phoneNumber",
        placeholder: "",
        autocomplete: "tel",
        inputType: "tel",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.BUTTON,
        label: "Next",
        submitsForm: false,
        screenPointer: {
          type: ScreenPointerType.DIRECT,
          screenConfiguration: knollcroftTripDetailsScreenConfiguration,
        },
      },
    ],
  },
};
