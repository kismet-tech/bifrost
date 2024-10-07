import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";

export const nbhdGroupBookingsFormBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.METADATA,
    keyName: "inquiryCategory",
    keyValue: "Group Booking",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Full Name",
    keyName: "fullName",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Email",
    keyName: "email",
    placeholder: "",
    inputType: "email",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Phone Number",
    keyName: "phoneNumber",
    placeholder: "",
    inputType: "tel",
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
    label: "Location",
    keyName: "location",
    options: [
      { label: "Lincoln Park", keyValue: "lincoln_park" },
      { label: "Grand Beach, MI", keyValue: "grand_beach" },
      { label: "New Buffalo, MI", keyValue: "new_buffalo" },
      { label: "Little Italy", keyValue: "little_italy" },
    ],
  },
  {
    formBlockType: FormBlockType.TEXT_AREA_INPUT,
    label: "Additional Details",
    keyName: "additionalDetails",
    placeholder: "",
  },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    buttons: [
      {
        label: "Submit",
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
];
