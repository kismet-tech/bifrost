import {
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
  UIBlockType,
} from "@/models/configuration";

export const knollcroftCompletedScreenConfiguration: ScreenConfiguration = {
  layout: {
    blockType: BlockType.LAYOUT_BLOCK,
    layoutBlockType: LayoutBlockType.ROWS,
    rows: [
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SMART_FAREWELL_SUBHEADER,
      },
      {
        blockType: BlockType.UI_BLOCK,
        uiBlockType: UIBlockType.SUBHEADER,

        backupText:
          "Log in and we’ll send you a link to view and modify your inquiry--we can also send you preferred rates.",
      },
      //   {
      //     formBlockType: FormBlockType.GUEST_SOCIAL_MEDIA_LOGIN,
      //     includeFacebook: true,
      //   },
    ],
  },
};
