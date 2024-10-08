import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";

export const knollcroftBusinessHotelRoomRequirementScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.HEADER,
          backupText: "Will you need hotel rooms?",
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Yes",
              submitsForm: false,
              //   pointer: {
              //     type: ScreenPointerType.BACK,
              //   },
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "No",
              submitsForm: false,
              //   pointer: {
              //     type: ScreenPointerType.BACK,
              //   },
            },
          ],
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
          label: "Skip",
          submitsForm: false,
          // pointer: {
          //   type: ScreenPointerType.BACK,
          // },
        },
      ],
    },
  };
