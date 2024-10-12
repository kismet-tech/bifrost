import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import {
  ScreenPointer,
  ScreenPointerType,
} from "@/models/configuration/pointers/ScreenPointer";
import { knollcroftBusinessEventSpaceScreenConfiguration } from "./knollcroftBusinessEventSpaceScreenConfiguration";
import { knollcroftBusinessHotelRoomRequirementScreenConfiguration } from "./knollcroftBusinessHotelRoomRequirementScreenConfiguration";

const knollcroftBusinessIsEvenSpaceRequiredPointer: ScreenPointer = {
  type: ScreenPointerType.BRANCH_BY_EVENT_SPACE_REQUIREMENT,

  eventSpaceIsRequiredScreenConfiguration:
    knollcroftBusinessEventSpaceScreenConfiguration,
  eventSpaceIsNotRequiredScreenConfiguration:
    knollcroftBusinessHotelRoomRequirementScreenConfiguration,
};

export const knollcroftBusinessBudgetRangeScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.HEADER,
          backupText: "Do you have a budget in mind? (A range is fine)",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.RANGE_SLIDER,
          label: "Budget",
          valueMinKeyName: "min_budget",
          valueMaxKeyName: "max_budget",
          initialRangeMin: 0,
          initialRangeMax: 50000,
          initialStepSize: 100,
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Back",
          submitsForm: false,
          screenPointer: {
            type: ScreenPointerType.BACK,
          },
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Still figuring it out",
          submitsForm: false,
          screenPointer: knollcroftBusinessIsEvenSpaceRequiredPointer,
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Next",
          submitsForm: false,
          screenPointer: knollcroftBusinessIsEvenSpaceRequiredPointer,
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.BUTTON,
          label: "Back",
          submitsForm: false,
          screenPointer: {
            type: ScreenPointerType.BACK,
          },
        },
      ],
    },
  };
