import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftV2DateFlexibilityScreenFlexibleDatesPath: LayoutBlockConfiguration =
  {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.LAYOUT_BLOCK,
        layoutBlockType: LayoutBlockType.INPUT_TABLE,
        keyName: "potential_dates",
        columns: [
          {
            columnHeader: {
              columnHeaderText: "Potential dates",
            },
            inputCell: {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.DATE_RANGE_PICKER,
              startCalendarDateKeyName: "start_calendar_date",
              endCalendarDateKeyName: "end_calendar_date",
            },
          },
        ],
      },
    ],
  };
