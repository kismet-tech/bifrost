import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";

export const knollcroftCompletedFormBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.SMART_FAREWELL_SUBHEADER,
  },
  {
    formBlockType: FormBlockType.SUBHEADER,
    backupText:
      "Log in and we’ll send you a link to view and modify your inquiry--we can also send you preferred rates.",
  },
  {
    formBlockType: FormBlockType.GUEST_SOCIAL_MEDIA_LOGIN,
    includeFacebook: true,
  },
];
