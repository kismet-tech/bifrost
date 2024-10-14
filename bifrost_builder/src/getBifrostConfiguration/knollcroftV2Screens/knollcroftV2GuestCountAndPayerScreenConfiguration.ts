import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { BifrostKeyPathConditionType } from "@/models/configuration/bifrostKeyPathCondition";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2CompletedScreenConfiguration } from "./knollcroftV2CompletedScreenConfiguration";

export const knollcroftV2GuestCountAndPayerScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText: "We’ve noted your date options.",
        },
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
              keyName: "room_count",
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
                    conditionKeyPath: ["room_count"],
                  },
                ],
              },
              layout: {
                blockType: BlockType.LAYOUT_BLOCK,
                layoutBlockType: LayoutBlockType.ROWS,
                rows: [
                  {
                    blockType: BlockType.UI_BLOCK,
                    uiBlockType: UIBlockType.SUBHEADER,
                    backupText: "Split payment?",
                  },
                  {
                    blockType: BlockType.LAYOUT_BLOCK,
                    layoutBlockType: LayoutBlockType.COLUMNS,
                    columns: [
                      {
                        blockType: BlockType.UI_BLOCK,
                        uiBlockType: UIBlockType.BUTTON,
                        label: "guests pay individually",
                        keyName: "split_payment",
                        keyValue: "guests_pay_individually",
                        hasToggle: true,
                        submitsForm: false,
                      },
                      {
                        blockType: BlockType.UI_BLOCK,
                        uiBlockType: UIBlockType.BUTTON,
                        label: "host will pay for rooms",
                        keyName: "split_payment",
                        keyValue: "host_pays_for_rooms",
                        hasToggle: true,
                        submitsForm: false,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SCREEN_NAVIGATOR,
          skipPath: {
            pointer: {
              type: ScreenPointerType.DIRECT,
              screenConfiguration: knollcroftV2CompletedScreenConfiguration,
            },
            submitsForm: true,
          },
          paths: [
            {
              condition: {
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["split_payment"],
              },
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: knollcroftV2CompletedScreenConfiguration,
              },
              submitsForm: true,
              forwardPathLabel: "Submit",
            },
          ],
        },
      ],
    },
  };
