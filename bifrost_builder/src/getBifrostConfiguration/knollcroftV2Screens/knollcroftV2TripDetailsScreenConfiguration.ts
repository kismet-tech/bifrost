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
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Business",
              keyName: "booking_category",
              keyValue: "business",
              submitsForm: false,
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Social",
              keyName: "booking_category",
              keyValue: "social",
              submitsForm: false,
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Other",
              keyName: "booking_category",
              keyValue: "other",
              submitsForm: false,
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
                type: BifrostKeyPathConditionType.MATCH,
                conditionKeyPath: ["booking_category"],
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
