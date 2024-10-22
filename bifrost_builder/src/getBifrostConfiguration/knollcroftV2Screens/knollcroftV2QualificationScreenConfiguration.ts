import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2CompletedScreenConfiguration } from "./knollcroftV2CompletedScreenConfiguration";

export const knollcroftV2QualificationScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText:
            "Thanks for your inquiry. Someone will be in touch soon. We have a few last questions to help us get planning. And let us know if you have any special requests.",
          templateText:
            "Thanks for your inquiry. Someone will be in touch soon. We have a few last questions to help us get planning. And let us know if you have any special requests.",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_AREA_INPUT,
          label: "Special Requests",
          keyName: "Special Requests",
          placeholder: "",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_INPUT,
          label: "Estimated group size",
          keyName: "Estimated Group Size",
          placeholder: "",
          inputType: "text",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_INPUT,
          label: "Budget range (estimate is fine)",
          keyName: "Estimated Budge Range",
          placeholder: "",
          inputType: "text",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          updatesUserSession: true,
          updatesUserSessionKeyPaths: [
            ["Special Requests"],
            ["Estimated Group Size"],
            ["Estimated Budge Range"],
          ],
          label: "Submit",
          submitsForm: false,
          screenPointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration: knollcroftV2CompletedScreenConfiguration,
          },
        },
      ],
    },
  };
