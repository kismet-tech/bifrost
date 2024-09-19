import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";

export const knollcroftBusinessDatesPeopleRoomsFormBlocks: FormBlockConfiguration[] =
  [
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
          submitsForm: true,
          keyValue: "",
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
  ];

export const knollcroftBusinessFormBlocks: FormBlockConfiguration[] = [
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
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Company",
    keyName: "company",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.SELECT_INPUT,
    label: "Contact me by",
    keyName: "preferred_contact_method",
    options: [
      { label: "Phone", keyValue: "phone" },
      { label: "Text", keyValue: "text" },
      { label: "Email", keyValue: "email" },
    ],
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Number of People",
    keyName: "number_of_people_total",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.RETURN_TO_PREVIOUS_BRANCH_BUTTON,
    label: "Back",
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
            formBlockType: FormBlockType.HEADER,
            backupText: "Find out more",
          },
          {
            formBlockType: FormBlockType.SUBHEADER,
            backupText: "Will you need hotel rooms?",
          },
          {
            formBlockType: FormBlockType.BRANCHING_NODE,
            keyName: "requires_hotel_rooms",
            buttons: [
              {
                label: "Yes",
                keyValue: "true",
                submitsForm: false,
                branchFormBlocks: [
                  {
                    formBlockType: FormBlockType.BRANCHING_NODE,
                    keyName: "are_dates_fixed",
                    buttons: [
                      {
                        label: "I know dates",
                        keyValue: "fixed_dates",
                        submitsForm: false,
                        branchFormBlocks:
                          knollcroftBusinessDatesPeopleRoomsFormBlocks,
                      },
                      {
                        label: "I'm flexible or still planning",
                        keyValue: "flexible_dates",
                        submitsForm: false,
                        branchFormBlocks:
                          knollcroftBusinessDatesPeopleRoomsFormBlocks,
                      },
                    ],
                  },
                ],
              },
              {
                label: "No",
                keyValue: "does_not_require_hotel_rooms",
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
];
