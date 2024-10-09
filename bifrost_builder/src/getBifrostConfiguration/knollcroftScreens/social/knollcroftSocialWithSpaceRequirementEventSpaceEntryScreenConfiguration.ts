import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";
import { knollcroftCompletedScreenConfiguration } from "../knollcroftCompletedScreenConfiguration";

export const knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText: "What are we gathering for?",
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.INPUT_TABLE,
          keyName: "event_space",
          columns: [
            {
              columnHeader: {
                columnHeaderText: "Event",
              },
              inputCell: {
                blockType: BlockType.UI_BLOCK,
                uiBlockType: UIBlockType.TEXT_INPUT,
                keyName: "event_name",
                inputType: "text",
              },
            },
            {
              columnHeader: {
                columnHeaderText: "People",
              },
              inputCell: {
                blockType: BlockType.UI_BLOCK,
                uiBlockType: UIBlockType.TEXT_INPUT,
                keyName: "count_of_attendees",
                inputType: "text",
              },
            },
            {
              columnHeader: {
                columnHeaderText: "Date",
              },
              inputCell: {
                blockType: BlockType.UI_BLOCK,
                uiBlockType: UIBlockType.DATE_RANGE_PICKER,
                startCalendarDateKeyName: "start_date",
                endCalendarDateKeyName: "end_date",
              },
            },
            {
              columnHeader: {
                columnHeaderText: "Time (optional)",
              },
              inputCell: {
                blockType: BlockType.UI_BLOCK,
                uiBlockType: UIBlockType.TEXT_INPUT,
                keyName: "time",
                inputType: "time",
              },
            },
          ],
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Next",
          submitsForm: true,
          pointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration: knollcroftCompletedScreenConfiguration,
          },
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.ROWS,
          rows: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Back",
              submitsForm: true,
              pointer: {
                type: ScreenPointerType.BACK,
              },
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Skip",
              submitsForm: true,
              pointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: knollcroftCompletedScreenConfiguration,
              },
            },
          ],
        },
      ],
    },
  };
