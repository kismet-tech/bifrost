import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";

export const nbhdExtendedStayBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.METADATA,
    keyName: "inquiryCategory",
    keyValue: "Extended Stay Booking",
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
    formBlockType: FormBlockType.SELECT_INPUT,
    label: "Bed Type",
    keyName: "bedType",
    options: [
      { label: "Studio", keyValue: "studio" },
      { label: "One", keyValue: "one" },
      { label: "Two", keyValue: "two" },
      { label: "Three", keyValue: "three" },
    ],
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Check-In Date & Check-Out Date",
    keyName: "dates",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Budget",
    keyName: "budget",
    placeholder: "",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_AREA_INPUT,
    label: "Additional Details",
    keyName: "additionalDetails",
    placeholder: "",
  },
];
