import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2DateFlexibilityScreenConfiguration } from "./knollcroftV2DateFlexibilityScreenConfiguration";
import { knollcroftV2SummaryHeader } from "../components/knollcroftV2SummaryHeader";
import {
  companyNameQuestionKnollcroftV3,
  companyWebsiteQuestionKnollcroftV3,
  inquiryDetailsQuestionKnollcroftV3,
  reasonForTravelQuestionKnollcroftV3,
  reasonForTravelQuestionKnollcroftV3BusinessOption,
  reasonForTravelQuestionKnollcroftV3OtherOption,
  reasonForTravelQuestionKnollcroftV3SocialOption,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/inquiryDetailsQuestionGroupKnollcroftV3";
import { firstNameQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestIdentiyQuestionGroup";
import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";
import { QuestionResponseType } from "@/models/formQuestions/questionWithResponse";

export const knollcroftV2TripDetailsScreenConfigurations: ScreenConfiguration =
  {
    formQuestionIds: [
      inquiryDetailsQuestionKnollcroftV3.formQuestionId,
      reasonForTravelQuestionKnollcroftV3.formQuestionId,
      companyNameQuestionKnollcroftV3.formQuestionId,
      companyWebsiteQuestionKnollcroftV3.formQuestionId,
    ],
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        knollcroftV2SummaryHeader,
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          templateText: `Hi {{${firstNameQuestionKnollcroftV3.formQuestionId}}}, can you share more about your plans?`,
          backupText: "Get in touch with our team",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_AREA_INPUT,
          label: "Details",
          formQuestionId: inquiryDetailsQuestionKnollcroftV3.formQuestionId,
          placeholder: "",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TOGGLE_GROUP,
          formQuestionId: reasonForTravelQuestionKnollcroftV3.formQuestionId,
          label: "Booking Category",
          options: [
            {
              label: reasonForTravelQuestionKnollcroftV3BusinessOption.label,
              keyValue: reasonForTravelQuestionKnollcroftV3BusinessOption.label,
            },
            {
              label: reasonForTravelQuestionKnollcroftV3SocialOption.label,
              keyValue: reasonForTravelQuestionKnollcroftV3SocialOption.label,
            },
            {
              label: reasonForTravelQuestionKnollcroftV3OtherOption.label,
              keyValue: reasonForTravelQuestionKnollcroftV3OtherOption.label,
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
                    reasonForTravelQuestionKnollcroftV3.formQuestionId,
                  response:
                    reasonForTravelQuestionKnollcroftV3BusinessOption.label,
                },
              },
              layout: {
                blockType: BlockType.LAYOUT_BLOCK,
                layoutBlockType: LayoutBlockType.ROWS,
                rows: [
                  {
                    blockType: BlockType.UI_BLOCK,
                    uiBlockType: UIBlockType.TEXT_INPUT,
                    formQuestionId:
                      companyNameQuestionKnollcroftV3.formQuestionId,
                    label: companyNameQuestionKnollcroftV3.label,
                    inputType: "text",
                  },
                  {
                    blockType: BlockType.UI_BLOCK,
                    uiBlockType: UIBlockType.TEXT_INPUT,
                    formQuestionId:
                      companyWebsiteQuestionKnollcroftV3.formQuestionId,
                    label: companyWebsiteQuestionKnollcroftV3.label,
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
                type: FormQuestionResponseConditionType.OR,
                OR: [
                  {
                    type: FormQuestionResponseConditionType.NOT,
                    NOT: {
                      type: FormQuestionResponseConditionType.MATCH,
                      questionWithResponse: {
                        formQuestionId:
                          companyNameQuestionKnollcroftV3.formQuestionId,
                        responseType: QuestionResponseType.STRING,
                        response:
                          reasonForTravelQuestionKnollcroftV3BusinessOption.label,
                      },
                    },
                  },
                  {
                    type: FormQuestionResponseConditionType.AND,
                    AND: [
                      {
                        type: FormQuestionResponseConditionType.MATCH,
                        questionWithResponse: {
                          responseType: QuestionResponseType.STRING,
                          formQuestionId:
                            reasonForTravelQuestionKnollcroftV3.formQuestionId,
                          response:
                            reasonForTravelQuestionKnollcroftV3BusinessOption.label,
                        },
                      },
                      {
                        type: FormQuestionResponseConditionType.NOT_NULL,
                        formQuestionId:
                          companyNameQuestionKnollcroftV3.formQuestionId,
                      },
                      {
                        type: FormQuestionResponseConditionType.NOT_NULL,
                        formQuestionId:
                          companyWebsiteQuestionKnollcroftV3.formQuestionId,
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
