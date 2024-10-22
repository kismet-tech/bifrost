import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { BifrostKeyPathConditionType } from "@/models/configuration/bifrostKeyPathCondition";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2QualificationScreenConfiguration } from "./knollcroftV2QualificationScreenConfiguration";
import { knollcroftV2InstantOfferScreenConfiguration } from "./knollcroftV2InstantOfferScreenConfiguration";

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
              condition: {
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["split_payment"],
              },
              screenPointer: {
                type: ScreenPointerType.SUBMIT_FORM_AND_BRANCH_BY_INSTANT_OFFER_AVAILABILITY,
                instantOfferIsNotAvailableScreenConfiguration:
                  knollcroftV2QualificationScreenConfiguration,
                instantOfferIsAvailableScreenConfiguration:
                  knollcroftV2InstantOfferScreenConfiguration,
              },
              submitsForm: false,
              forwardPathLabel: "Submit",
            },
          ],
        },
      ],
    },
  };
