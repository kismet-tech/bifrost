import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftV2InstantOfferScreenConfiguration: ScreenConfiguration =
  {
    formQuestionIds: [],
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.SUBHEADER,
          templateText:
            "Thanks for your interest in {{hotel_name}}. Someone will be in touch soon. Additionally, we’re able to offer the following options for instant booking based on the information you shared.",
          backupText:
            "Thanks for your interest in our hotel. Someone will be in touch soon. Additionally, we’re able to offer the following options for instant booking based on the information you shared.",
        },
        {
          blockType: BlockType.UI_BLOCK,
          uiBlockType: UIBlockType.INSTANT_OFFER,
        },
      ],
    },
  };
