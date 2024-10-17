import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";
import { BifrostKeyPathConditionType } from "@/models/configuration/bifrostKeyPathCondition";

export const knollcroftV2DateFlexibilityScreenFirmDatesPath: LayoutBlockConfiguration =
  {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.DATE_RANGE_PICKER,
        label: "Dates",
        startCalendarDateKeyName: "start_calendar_date",
        endCalendarDateKeyName: "end_calendar_date",
      },
      {
        blockType: BlockType.CONDITION_BLOCK,
        paths: [
          {
            condition: {
              type: BifrostKeyPathConditionType.AND,
              AND: [
                {
                  type: BifrostKeyPathConditionType.MATCH,
                  conditionKeyPath: ["start_calendar_date"],
                },
                {
                  type: BifrostKeyPathConditionType.MATCH,
                  conditionKeyPath: ["end_calendar_date"],
                },
              ],
            },

            layout: {
              blockType: BlockType.LAYOUT_BLOCK,
              layoutBlockType: LayoutBlockType.ROWS,
              rows: [
                {
                  blockType: BlockType.LAYOUT_BLOCK,
                  layoutBlockType: LayoutBlockType.COLUMNS,
                  columns: [
                    {
                      blockType: BlockType.UI_BLOCK,
                      uiBlockType: UIBlockType.TEXT_INPUT,
                      label: "Guests",
                      keyName: "guest_count",
                      inputType: "number",
                    },
                    {
                      blockType: BlockType.UI_BLOCK,
                      uiBlockType: UIBlockType.TEXT_INPUT,
                      label: "Rooms",
                      keyName: "count_of_rooms_needed",
                      inputType: "number",
                    },
                  ],
                },
                {
                  blockType: BlockType.CONDITION_BLOCK,
                  paths: [
                    {
                      condition: {
                        type: BifrostKeyPathConditionType.OR,
                        OR: [
                          {
                            type: BifrostKeyPathConditionType.MATCH,
                            conditionKeyPath: ["guest_count"],
                          },
                          {
                            type: BifrostKeyPathConditionType.MATCH,
                            conditionKeyPath: ["count_of_rooms_needed"],
                          },
                        ],
                      },
                      layout: {
                        blockType: BlockType.LAYOUT_BLOCK,
                        layoutBlockType: LayoutBlockType.ROWS,
                        rows: [
                          {
                            blockType: BlockType.UI_BLOCK,
                            uiBlockType: UIBlockType.TOGGLE_GROUP,
                            label: "Split payment?",
                            keyName: "split_payment",
                            options: [
                              {
                                label: "Guests pay individually",
                                keyValue: "guests_pay_individually",
                              },
                              {
                                label: "Host will pay for rooms",
                                keyValue: "host_pays_for_rooms",
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    ],
  };
