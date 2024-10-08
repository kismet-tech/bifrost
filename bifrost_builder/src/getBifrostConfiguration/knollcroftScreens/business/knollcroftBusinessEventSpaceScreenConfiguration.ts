import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftBusinessEventSpaceScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
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
      ],
    },
  };
