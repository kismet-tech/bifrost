import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { BifrostKeyPathConditionType } from "@/models/configuration/bifrostKeyPathCondition";
import { knollcroftV2DateFlexibilityScreenFirmDatesPath } from "./knollcroftV2DateFlexibilityScreenFirmDatesPath";
import { knollcroftV2DateFlexibilityScreenFlexibleDatesPath } from "./knollcroftV2DateFlexibilityScreenFlexibleDatesPath";
import { knollcroftV2StillDecidingDatesPath } from "../knollcroftV2StillDecidingDatesPath";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2CompletedScreenConfiguration } from "../knollcroftV2CompletedScreenConfiguration";
import { knollcroftV2GuestCountAndPayerScreenConfiguration } from "../knollcroftV2GuestCountAndPayerScreenConfiguration";

export const knollcroftV2DateFlexibilityScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText:
            "Can we ask for a few more details to get started planning?",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText: "Dates",
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "my dates are firm",
              keyName: "date_flexibility",
              keyValue: "dates_are_firm",
              submitsForm: false,
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "flexible",
              keyName: "date_flexibility",
              keyValue: "dates_are_flexible",
              submitsForm: false,
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "still deciding",
              keyName: "date_flexibility",
              keyValue: "still_deciding",
              submitsForm: false,
            },
          ],
        },
        {
          blockType: BlockType.CONDITION_BLOCK,
          paths: [
            {
              condition: {
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["date_flexibility"],
                conditionKeyValue: "dates_are_firm",
              },
              layout: knollcroftV2DateFlexibilityScreenFirmDatesPath,
            },
            {
              condition: {
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["date_flexibility"],
                conditionKeyValue: "dates_are_flexible",
              },
              layout: knollcroftV2DateFlexibilityScreenFlexibleDatesPath,
            },
            {
              condition: {
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["date_flexibility"],
                conditionKeyValue: "still_deciding",
              },
              layout: knollcroftV2StillDecidingDatesPath,
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
              forwardPathLabel: "Submit",
              condition: {
                type: BifrostKeyPathConditionType.AND,
                AND: [
                  {
                    type: BifrostKeyPathConditionType.MATCH,
                    conditionKeyPath: ["date_flexibility"],
                    conditionKeyValue: "dates_are_firm",
                  },
                  {
                    type: BifrostKeyPathConditionType.MATCH,
                    conditionKeyPath: ["split_payment"],
                  },
                ],
              },
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration: knollcroftV2CompletedScreenConfiguration,
              },
              submitsForm: true,
            },
            {
              forwardPathLabel: "Next",
              condition: {
                type: BifrostKeyPathConditionType.AND,
                AND: [
                  {
                    type: BifrostKeyPathConditionType.MATCH,
                    conditionKeyPath: ["date_flexibility"],
                    conditionKeyValue: "dates_are_flexible",
                  },
                  {
                    type: BifrostKeyPathConditionType.MATCH,
                    conditionKeyPath: ["potential_dates"],
                  },
                ],
              },
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftV2GuestCountAndPayerScreenConfiguration,
              },
            },
            {
              forwardPathLabel: "Next",
              condition: {
                type: BifrostKeyPathConditionType.AND,
                AND: [
                  {
                    type: BifrostKeyPathConditionType.MATCH,
                    conditionKeyPath: ["date_flexibility"],
                    conditionKeyValue: "still_deciding",
                  },
                  {
                    type: BifrostKeyPathConditionType.MATCH,
                    conditionKeyPath: ["additional_details"],
                  },
                ],
              },
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftV2GuestCountAndPayerScreenConfiguration,
              },
            },
          ],
        },
      ],
    },
  };
