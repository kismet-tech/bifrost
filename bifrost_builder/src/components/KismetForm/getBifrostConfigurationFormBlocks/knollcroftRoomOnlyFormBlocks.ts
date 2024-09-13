import { FormBlockConfiguration, FormBlockType } from "../models";

export const knollcroftDatesPeopleRoomsFormBlocks: FormBlockConfiguration[] = [
  // {
  //   formBlockType: FormBlockType.HEADER,
  //   backupText: "Help us to quote",
  // },
  {
    formBlockType: FormBlockType.HEADER,
    backupText: "",
    templateText: "Hi {{firstName}}",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Dates",
    keyName: "date_range",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Number of people",
    keyName: "number_of_people_requiring_rooms",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Number of Rooms",
    keyName: "number_of_rooms",
    placeholder: "Number of rooms",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    keyName: "next",
    buttons: [
      {
        label: "Next",
        keyValue: "next",
        submitsForm: false,
        branchFormBlocks: [
          {
            formBlockType: FormBlockType.SUBHEADER,
            backupText: "How do you want us to split up the check?",
          },
          {
            formBlockType: FormBlockType.BRANCHING_NODE,
            keyName: "split_check",
            buttons: [
              {
                label: "I'm booking for the whole group",
                keyValue: "booking_for_the_whole_group",
                submitsForm: true,
                branchFormBlocks: [
                  {
                    formBlockType: FormBlockType.HEADER,
                    backupText: "Thank you!",
                  },

                  {
                    formBlockType: FormBlockType.SUBHEADER,
                    backupText: "We'll be in touch soon, watch your email!",
                  },
                ],
              },
              {
                label: "Guests will book on their own",
                keyValue: "guest_book_separately",
                submitsForm: true,
                branchFormBlocks: [
                  {
                    formBlockType: FormBlockType.HEADER,
                    backupText: "Thank you!",
                  },

                  {
                    formBlockType: FormBlockType.SUBHEADER,
                    backupText: "We'll be in touch soon, watch your email!",
                  },
                ],
              },
            ],
          },
          {
            formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
            label: "Back",
          },
        ],
      },
    ],
  },
  {
    formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
    label: "Back",
  },
];

export const knollcroftRoomOnlyFormBlocks: FormBlockConfiguration[] = [
  // {
  //   formBlockType: FormBlockType.HEADER,
  //   backupText: "Help us to quote",
  // },
  {
    formBlockType: FormBlockType.HEADER,
    backupText: "",
    templateText: "Hi {{firstName}}",
  },
  {
    formBlockType: FormBlockType.SMART_GREETING_SUBHEADER,
  },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    keyName: "date_flexibility",
    buttons: [
      {
        label: "I know dates",
        keyValue: "fixed_dates",
        submitsForm: false,
        branchFormBlocks: knollcroftDatesPeopleRoomsFormBlocks,
      },
      {
        label: "I'm flexible or still planning",
        keyValue: "flexible_dates",
        submitsForm: false,
        branchFormBlocks: knollcroftDatesPeopleRoomsFormBlocks,
      },
    ],
  },
  {
    formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
    label: "Back",
  },
];
