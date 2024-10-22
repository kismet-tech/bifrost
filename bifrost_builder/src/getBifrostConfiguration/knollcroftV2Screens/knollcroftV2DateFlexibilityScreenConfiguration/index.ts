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
import { knollcroftV2GuestCountAndPayerScreenConfiguration } from "../knollcroftV2GuestCountAndPayerScreenConfiguration";
import { knollcroftV2QualificationScreenConfiguration } from "../knollcroftV2QualificationScreenConfiguration";
import { knollcroftV2InstantOfferScreenConfiguration } from "../knollcroftV2InstantOfferScreenConfiguration";

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
          uiBlockType: UIBlockType.TOGGLE_GROUP,
          label: "Date Flexibility",
          keyName: "date_flexibility",
          options: [
            { label: "My Dates Are Firm", keyValue: "dates_are_firm" },
            { label: "I'm Flexible", keyValue: "dates_are_flexible" },
            { label: "Still Deciding", keyValue: "still_deciding" },
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
              type: ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY,
              instantOfferIsNotAvailableScreenConfiguration:
                knollcroftV2QualificationScreenConfiguration,
              instantOfferIsAvailableScreenConfiguration:
                knollcroftV2InstantOfferScreenConfiguration,
            },
            submitsForm: false,
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
                type: ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY,
                instantOfferIsNotAvailableScreenConfiguration:
                  knollcroftV2QualificationScreenConfiguration,
                instantOfferIsAvailableScreenConfiguration:
                  knollcroftV2InstantOfferScreenConfiguration,
              },
              submitsForm: false,
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
