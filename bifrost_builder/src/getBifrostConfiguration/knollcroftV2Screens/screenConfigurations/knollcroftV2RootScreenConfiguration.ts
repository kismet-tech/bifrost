import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { knollcroftV2TripDetailsScreenConfigurations } from "./knollcroftV2TripDetailsScreenConfiguration";
import { ScreenPointerType } from "@/models/configuration/pointers/ScreenPointer";
import {
  firstNameQuestionKnollcroftV3,
  guestEmailQuestionKnollcroftV3,
  guestPhoneNumberQuestionKnollcroftV3,
  lastNameQuestionKnollcroftV3,
} from "@/getBifrostConfiguration/formQuestions/knollcroftV3FormQuestions/guestIdentiyQuestionGroup";
import { FormQuestionResponseConditionType } from "@/models/formQuestions/formQuestionResponseCondition";

export const knollcroftV2RootScreenConfiguration: ScreenConfiguration = {
  formQuestionIds: [
    firstNameQuestionKnollcroftV3.formQuestionId,
    lastNameQuestionKnollcroftV3.formQuestionId,
    guestEmailQuestionKnollcroftV3.formQuestionId,
    guestPhoneNumberQuestionKnollcroftV3.formQuestionId,
  ],
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
            formQuestionId: firstNameQuestionKnollcroftV3.formQuestionId,
            label: "First",
            autocomplete: "given-name",
            inputType: "text",
          },
          {
            blockType: BlockType.UI_BLOCK,
            uiBlockType: UIBlockType.TEXT_INPUT,
            formQuestionId: lastNameQuestionKnollcroftV3.formQuestionId,
            label: "Last",
            autocomplete: "family-name",
            inputType: "text",
          },
        ],
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        formQuestionId: guestEmailQuestionKnollcroftV3.formQuestionId,
        label: "Email",
        autocomplete: "email",
        inputType: "email",
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.TEXT_INPUT,
        formQuestionId: guestPhoneNumberQuestionKnollcroftV3.formQuestionId,
        label: "Phone Number",
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
              type: FormQuestionResponseConditionType.AND,
              AND: [
                {
                  type: FormQuestionResponseConditionType.NOT_NULL,
                  formQuestionId: firstNameQuestionKnollcroftV3.formQuestionId,
                },
                {
                  type: FormQuestionResponseConditionType.NOT_NULL,
                  formQuestionId: lastNameQuestionKnollcroftV3.formQuestionId,
                },
                {
                  type: FormQuestionResponseConditionType.NOT_NULL,
                  formQuestionId: guestEmailQuestionKnollcroftV3.formQuestionId,
                },
                {
                  type: FormQuestionResponseConditionType.NOT_NULL,
                  formQuestionId:
                    guestPhoneNumberQuestionKnollcroftV3.formQuestionId,
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
