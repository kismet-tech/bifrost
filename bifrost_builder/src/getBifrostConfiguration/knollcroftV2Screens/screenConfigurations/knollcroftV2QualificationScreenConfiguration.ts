import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftV2CompletedScreenConfiguration } from "./knollcroftV2CompletedScreenConfiguration";
import { guestCountQuestionKnollcroftV3 } from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestAndPaymentQuestionGroupKnollcroftV3";
import {
  estimatedBudgetQuestionKnollcroftV3,
  specialRequestsQuestionKnollcroftV3,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/qualificationQuestionGroupKnollcroftV3";

export const knollcroftV2QualificationScreenConfiguration: ScreenConfiguration =
  {
    formQuestionIds: [
      guestCountQuestionKnollcroftV3.formQuestionId,
      estimatedBudgetQuestionKnollcroftV3.formQuestionId,
      specialRequestsQuestionKnollcroftV3.formQuestionId,
    ],
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText:
            "Thanks for your inquiry. Someone will be in touch soon. We have a few last questions to help us get planning. And let us know if you have any special requests.",
          templateText:
            "Thanks for your inquiry. Someone will be in touch soon. We have a few last questions to help us get planning. And let us know if you have any special requests.",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_AREA_INPUT,
          label: "Special Requests",
          formQuestionId: specialRequestsQuestionKnollcroftV3.formQuestionId,
          placeholder: "",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_INPUT,
          formQuestionId: guestCountQuestionKnollcroftV3.formQuestionId,
          label: "Estimated group size",
          placeholder: "",
          inputType: "text",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.TEXT_INPUT,
          formQuestionId: estimatedBudgetQuestionKnollcroftV3.formQuestionId,
          label: "Budget range (estimate is fine)",
          placeholder: "",
          inputType: "text",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Submit",
          submitsForm: false,
          screenPointer: {
            type: ScreenPointerType.DIRECT,
            screenConfiguration: knollcroftV2CompletedScreenConfiguration,
          },
        },
      ],
    },
  };
