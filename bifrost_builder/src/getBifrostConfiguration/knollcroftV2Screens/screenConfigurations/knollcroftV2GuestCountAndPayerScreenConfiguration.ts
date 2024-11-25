import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2QualificationScreenConfiguration } from "./knollcroftV2QualificationScreenConfiguration";
import { knollcroftV2InstantOfferScreenConfiguration } from "./knollcroftV2InstantOfferScreenConfiguration";
import { knollcroftV2SummaryHeader } from "../components/knollcroftV2SummaryHeader";
import {
  guestCountQuestionKnollcroftV3,
  roomCountQuestionKnollcroftV3,
  splitPaymentQuestionKnollcroftV3,
  splitPaymentQuestionKnollcroftV3SinglePayerOption,
  splitPaymentQuestionKnollcroftV3SplitPaymentOption,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";

export const knollcroftV2GuestCountAndPayerScreenConfiguration: ScreenConfiguration =
  {
    formQuestionIds: [
      guestCountQuestionKnollcroftV3.formQuestionId,
      roomCountQuestionKnollcroftV3.formQuestionId,
      splitPaymentQuestionKnollcroftV3.formQuestionId,
    ],
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        knollcroftV2SummaryHeader,
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
              formQuestionId: guestCountQuestionKnollcroftV3.formQuestionId,
              label: "Guests",
              inputType: "number",
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.TEXT_INPUT,
              formQuestionId: roomCountQuestionKnollcroftV3.formQuestionId,
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
                    label: "Split payment?",
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
                type: FormQuestionResponseConditionType.NOT_NULL,
                formQuestionId: splitPaymentQuestionKnollcroftV3.formQuestionId,
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
