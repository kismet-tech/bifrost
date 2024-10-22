import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { knollcroftV2TripDetailsScreenConfigurations } from "./knollcroftV2TripDetailsScreenConfiguration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { BifrostKeyPathConditionType } from "@/models/configuration/bifrostKeyPathCondition";
import { KnollcroftConfigurationV2ScreenKeys } from "./keys";

export const knollcroftV2RootScreenConfiguration: ScreenConfiguration = {
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SUBHEADER,
        backupText: "Get in touch with our team",
      },
      {
        blockType: BlockType.LAYOUT_BLOCK,
        layoutBlockType: LayoutBlockType.COLUMNS,
        columns: [
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.TEXT_INPUT,
            label: "First",
            keyName: "first_name",
            autocomplete: "given-name",
            inputType: "text",
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.TEXT_INPUT,
            label: "Last",
            keyName: "last_name",
            autocomplete: "family-name",
            inputType: "text",
          },
        ],
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        label: "Email",
        keyName: "email",
        autocomplete: "email",
        inputType: "email",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        label: "Phone Number",
        keyName: KnollcroftConfigurationV2ScreenKeys.PHONE_NUMBER,
        autocomplete: "tel",
        inputType: "tel",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SCREEN_NAVIGATOR,
        skipPath: {
          pointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration: knollcroftV2TripDetailsScreenConfigurations,
          },
        },
        paths: [
          {
            forwardPathLabel: "Start Planning",
            condition: {
              type: BifrostKeyPathConditionType.AND,
              AND: [
                {
                  type: BifrostKeyPathConditionType.MATCH,
                  conditionKeyPath: ["first_name"],
                },
                {
                  type: BifrostKeyPathConditionType.MATCH,
                  conditionKeyPath: ["last_name"],
                },
                {
                  type: BifrostKeyPathConditionType.MATCH,
                  conditionKeyPath: ["email"],
                },
                {
                  type: BifrostKeyPathConditionType.MATCH,
                  conditionKeyPath: ["phone_number"],
                },
              ],
            },
            screenPointer: {
              type: ScreenPointerType.DIRECT,
              screenConfiguration: knollcroftV2TripDetailsScreenConfigurations,
            },
          },
        ],
      },
    ],
  },
};
