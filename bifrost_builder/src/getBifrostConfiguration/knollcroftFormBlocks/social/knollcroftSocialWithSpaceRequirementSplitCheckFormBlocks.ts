import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";
import { knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks } from "./knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks";

export const knollcroftSocialWithSpaceRequirementSplitCheckFormBlocks: FormBlockConfiguration[] =
  [
    {
      formBlockType: FormBlockType.SUBHEADER,
      backupText: "How do you want us to split up the check?",
    },

    {
      formBlockType: FormBlockType.BRANCHING_NODE,
      keyName: "how_will_the_check_be_split_amongst_guests",
      buttons: [
        {
          label: "I’m booking for the whole group",
          keyValue: "user_is_booking_for_the_whole_group",
          submitsForm: false,
          branchFormBlocks:
            knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks,
        },
        {
          label: "Guests will book on their own",
          keyValue: "guest_will_book_separately",
          submitsForm: false,
          branchFormBlocks:
            knollcroftSocialWithSpaceRequirementEventSpaceFormBlocks,
        },
      ],
    },
    {
      formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
      label: "Back",
    },
  ];
