import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2DateFlexibilityScreenConfiguration } from "./knollcroftV2DateFlexibilityScreenConfiguration";
import { BifrostKeyPathConditionType } from "@/models/configuration/bifrostKeyPathCondition";

export const knollcroftV2TripDetailsScreenConfigurations: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          templateText:
            "Hi {{first_name}}, can you share more about your plans?",
          backupText: "Get in touch with our team",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_AREA_INPUT,
          label: "Details",
          keyName: "trip_details",
          placeholder: "",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TOGGLE_GROUP,
          label: "Booking Category",
          keyName: "booking_category",
          options: [
            { label: "Business", keyValue: "business" },
            { label: "Social", keyValue: "social" },
            { label: "Other", keyValue: "other" },
          ],
        },
        {
          blockType: BlockType.CONDITION_BLOCK,
          paths: [
            {
              condition: {
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["booking_category"],
                conditionKeyValue: "business",
              },
              layout: {
                blockType: BlockType.LAYOUT_BLOCK,
                layoutBlockType: LayoutBlockType.ROWS,
                rows: [
                  {
                    blockType: BlockType.UI_BLOCK,
                    uiBlockType: UIBlockType.TEXT_INPUT,
                    label: "Company",
                    keyName: "Company Name",
                    inputType: "text",
                  },
                  {
                    blockType: BlockType.UI_BLOCK,
                    uiBlockType: UIBlockType.TEXT_INPUT,
                    label: "Website",
                    keyName: "Company Website",
                    inputType: "text",
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
              screenConfiguration:
                knollcroftV2DateFlexibilityScreenConfiguration,
            },
          },
          paths: [
            {
              forwardPathLabel: "Next",
              condition: {
                type: BifrostKeyPathConditionType.OR,
                OR: [
                  {
                    type: BifrostKeyPathConditionType.NOT,
                    conditionKeyPath: ["booking_category"],
                    notConditionKeyValue: "business",
                  },
                  {
                    type: BifrostKeyPathConditionType.AND,
                    AND: [
                      {
                        type: BifrostKeyPathConditionType.MATCH,
                        conditionKeyPath: ["booking_category"],
                        conditionKeyValue: "business",
                      },
                      {
                        type: BifrostKeyPathConditionType.MATCH,
                        conditionKeyPath: ["Company Name"],
                      },
                      {
                        type: BifrostKeyPathConditionType.MATCH,
                        conditionKeyPath: ["Company Website"],
                      },
                    ],
                  },
                ],
              },
              screenPointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftV2DateFlexibilityScreenConfiguration,
              },
            },
          ],
        },
      ],
    },
  };
