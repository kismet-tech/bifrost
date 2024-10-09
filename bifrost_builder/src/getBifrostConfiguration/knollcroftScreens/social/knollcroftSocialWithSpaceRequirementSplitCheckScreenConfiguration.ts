import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";
import { ScreenPointerType } from "@/models/configuration/ScreenPointer";
import { knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration } from "./knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration";

export const knollcroftSocialWithSpaceRequirementSplitCheckScreenConfiguration: ScreenConfiguration =
  {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          backupText: "How do you want us to split up the check?",
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "I’m booking for the whole group",
              keyName: "how_will_the_check_be_split_amongst_guests",
              keyValue: "user_is_booking_for_the_whole_group",
              submitsForm: false,
              pointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration,
              },
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Guests will book on their own",
              keyName: "how_will_the_check_be_split_amongst_guests",
              keyValue: "guest_will_book_separately",
              submitsForm: false,
              pointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration,
              },
            },
          ],
        },
        {
          blockType: BlockType.LAYOUT_BLOCK,
          layoutBlockType: LayoutBlockType.COLUMNS,
          columns: [
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Back",
              submitsForm: false,
              pointer: {
                type: ScreenPointerType.BACK,
              },
            },
            {
              blockType: BlockType.UI_BLOCK,
              uiBlockType: UIBlockType.BUTTON,
              label: "Skip",
              submitsForm: false,
              pointer: {
                type: ScreenPointerType.DIRECT,
                screenConfiguration:
                  knollcroftSocialWithSpaceRequirementEventSpaceEntryScreenConfiguration,
              },
            },
          ],
        },
      ],
    },
  };
