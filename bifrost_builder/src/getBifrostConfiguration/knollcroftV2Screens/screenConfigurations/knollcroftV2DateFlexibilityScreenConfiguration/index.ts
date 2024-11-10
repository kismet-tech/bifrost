import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { knollcroftV2DateFlexibilityScreenFirmDatesPath } from "./knollcroftV2DateFlexibilityScreenFirmDatesPath";
import { knollcroftV2DateFlexibilityScreenFlexibleDatesPath } from "./knollcroftV2DateFlexibilityScreenFlexibleDatesPath";
import { knollcroftV2StillDecidingDatesPath } from "../knollcroftV2StillDecidingDatesPath";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2QualificationScreenConfiguration } from "../knollcroftV2QualificationScreenConfiguration";
import { knollcroftV2InstantOfferScreenConfiguration } from "../knollcroftV2InstantOfferScreenConfiguration";
import { knollcroftV2SummaryHeader } from "../../components/knollcroftV2SummaryHeader";
import { knollcroftV2GuestCountAndPayerScreenConfiguration } from "../knollcroftV2GuestCountAndPayerScreenConfiguration";
import {
  dateFlexibilityQuestionKnollcroftV3,
  dateFlexibilityQuestionKnollcroftV3FirmDatesOption,
  dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption,
  dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption,
  potentialDatesQuestionKnollcroftV3,
  undecidedDateDetailsQuestionKnollcroftV3,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/dateQuestionGroupKnollcroftV3";
import { splitPaymentQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

export const knollcroftV2DateFlexibilityScreenConfiguration: ScreenConfiguration =
  {
    formQuestionIds: [
      dateFlexibilityQuestionKnollcroftV3.formQuestionId,
      potentialDatesQuestionKnollcroftV3.formQuestionId,
      undecidedDateDetailsQuestionKnollcroftV3.formQuestionId,
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
          backupText:
            "Can we ask for a few more details to get started planning?",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TOGGLE_GROUP,
          formQuestionId: dateFlexibilityQuestionKnollcroftV3.formQuestionId,
          label: "Date Flexibility",
          options: [
            {
              label: "My Dates Are Firm",
              keyValue:
                dateFlexibilityQuestionKnollcroftV3FirmDatesOption.label,
            },
            {
              label: "I'm Flexible",
              keyValue:
                dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption.label,
            },
            {
              label: "Still Deciding",
              keyValue:
                dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption.label,
            },
          ],
        },
        {
          blockType: BlockType.CONDITION_BLOCK,
          paths: [
            {
              condition: {
                type: FormQuestionResponseConditionType.MATCH,
                questionWithResponse: {
                  responseType: QuestionResponseType.STRING,
                  formQuestionId:
                    dateFlexibilityQuestionKnollcroftV3.formQuestionId,
                  response:
                    dateFlexibilityQuestionKnollcroftV3FirmDatesOption.label,
                },
              },
              layout: knollcroftV2DateFlexibilityScreenFirmDatesPath,
            },
            {
              condition: {
                type: FormQuestionResponseConditionType.MATCH,
                questionWithResponse: {
                  responseType: QuestionResponseType.STRING,
                  formQuestionId:
                    dateFlexibilityQuestionKnollcroftV3.formQuestionId,
                  response:
                    dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption.label,
                },
              },
              layout: knollcroftV2DateFlexibilityScreenFlexibleDatesPath,
            },
            {
              condition: {
                type: FormQuestionResponseConditionType.MATCH,
                questionWithResponse: {
                  responseType: QuestionResponseType.STRING,
                  formQuestionId:
                    dateFlexibilityQuestionKnollcroftV3.formQuestionId,
                  response:
                    dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption.label,
                },
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
              screenConfiguration:
                knollcroftV2GuestCountAndPayerScreenConfiguration,
            },
            submitsForm: false,
          },
          paths: [
            {
              forwardPathLabel: "Submit",
              condition: {
                type: FormQuestionResponseConditionType.AND,
                AND: [
                  {
                    type: FormQuestionResponseConditionType.MATCH,
                    questionWithResponse: {
                      responseType: QuestionResponseType.STRING,
                      formQuestionId:
                        dateFlexibilityQuestionKnollcroftV3.formQuestionId,
                      response:
                        dateFlexibilityQuestionKnollcroftV3FirmDatesOption.label,
                    },
                  },
                  {
                    type: FormQuestionResponseConditionType.NOT_NULL,
                    formQuestionId:
                      splitPaymentQuestionKnollcroftV3.formQuestionId,
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
                type: FormQuestionResponseConditionType.AND,
                AND: [
                  {
                    type: FormQuestionResponseConditionType.MATCH,
                    questionWithResponse: {
                      responseType: QuestionResponseType.STRING,
                      formQuestionId:
                        dateFlexibilityQuestionKnollcroftV3.formQuestionId,
                      response:
                        dateFlexibilityQuestionKnollcroftV3FlexibleDatesOption.label,
                    },
                  },
                  {
                    type: FormQuestionResponseConditionType.NOT_NULL,
                    formQuestionId:
                      potentialDatesQuestionKnollcroftV3.formQuestionId,
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
                type: FormQuestionResponseConditionType.AND,
                AND: [
                  {
                    type: FormQuestionResponseConditionType.MATCH,
                    questionWithResponse: {
                      responseType: QuestionResponseType.STRING,
                      formQuestionId:
                        dateFlexibilityQuestionKnollcroftV3.formQuestionId,
                      response:
                        dateFlexibilityQuestionKnollcroftV3StillDecidingDatesOption.label,
                    },
                  },
                  {
                    type: FormQuestionResponseConditionType.NOT_NULL,
                    formQuestionId:
                      undecidedDateDetailsQuestionKnollcroftV3.formQuestionId,
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
