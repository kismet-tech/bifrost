import { selectedDatesQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import {
  guestCountQuestionKnollcroftV3,
  roomCountQuestionKnollcroftV3,
  splitPaymentQuestionKnollcroftV3,
  splitPaymentQuestionKnollcroftV3SinglePayerOption,
  splitPaymentQuestionKnollcroftV3SplitPaymentOption,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import {
  BlockType,
  LayoutBlockConfiguration,
  LayoutBlockType,
  UIBlockType,
} from "@/models/configuration";
import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";

export const knollcroftV2DateFlexibilityScreenFirmDatesPath: LayoutBlockConfiguration =
  {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.DATE_RANGE_PICKER,
        formQuestionId: selectedDatesQuestionKnollcroftV3.formQuestionId,
        label: "Dates",
      },
      {
        blockType: BlockType.CONDITION_BLOCK,
        paths: [
          {
            condition: {
              type: FormQuestionResponseConditionType.NOT_NULL,
              formQuestionId: selectedDatesQuestionKnollcroftV3.formQuestionId,
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
                      formQuestionId:
                        guestCountQuestionKnollcroftV3.formQuestionId,
                      label: "Guests",
                      inputType: "number",
                    },
                    {
                      blockType: BlockType.UI_BLOCK,
                      uiBlockType: UIBlockType.TEXT_INPUT,
                      formQuestionId:
                        roomCountQuestionKnollcroftV3.formQuestionId,
                      label: "Rooms",
                      inputType: "number",
                    },
                  ],
                },
                {
                  blockType: BlockType.CONDITION_BLOCK,
                  paths: [
                    {
                      condition: {
                        type: FormQuestionResponseConditionType.OR,
                        OR: [
                          {
                            type: FormQuestionResponseConditionType.NOT_NULL,
                            formQuestionId:
                              guestCountQuestionKnollcroftV3.formQuestionId,
                          },
                          {
                            type: FormQuestionResponseConditionType.NOT_NULL,
                            formQuestionId:
                              roomCountQuestionKnollcroftV3.formQuestionId,
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
                            formQuestionId:
                              splitPaymentQuestionKnollcroftV3.formQuestionId,
                            label: splitPaymentQuestionKnollcroftV3.label,
                            options: [
                              {
                                label:
                                  splitPaymentQuestionKnollcroftV3SplitPaymentOption.label,
                                keyValue:
                                  splitPaymentQuestionKnollcroftV3SplitPaymentOption.label,
                              },
                              {
                                label:
                                  splitPaymentQuestionKnollcroftV3SinglePayerOption.label,
                                keyValue:
                                  splitPaymentQuestionKnollcroftV3SinglePayerOption.label,
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
