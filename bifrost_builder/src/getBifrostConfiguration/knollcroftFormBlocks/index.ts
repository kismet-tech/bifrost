import {
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/RootComponent/models";
import { knollcroftTripDetailFormBlocks } from "./knollcroftTripDetailFormBlocks";

export const knollcroftFormBlocks: FormBlockConfiguration[] = [
  {
    formBlockType: FormBlockType.METADATA,
    keyName: "inquiryCategory",
    keyValue: "Group Booking",
  },
  {
    formBlockType: FormBlockType.HEADER,
    backupText: "Group stays",
  },
  {
    formBlockType: FormBlockType.SUBHEADER,
    backupText:
      "If it’s a group trip (whether large or small) we’ve got you covered",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "First name",
    keyName: "firstName",
    placeholder: "",
    autocomplete: "given-name",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Last name",
    keyName: "lastName",
    placeholder: "",
    autocomplete: "family-name",
    inputType: "text",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Email",
    keyName: "email",
    placeholder: "",
    autocomplete: "email",
    inputType: "email",
  },
  {
    formBlockType: FormBlockType.TEXT_INPUT,
    label: "Phone",
    keyName: "phoneNumber",
    placeholder: "",
    autocomplete: "tel",
    inputType: "tel",
  },
  {
    formBlockType: FormBlockType.BRANCHING_NODE,
    buttons: [
      {
        label: "Next",
        submitsForm: false,
        branchFormBlocks: knollcroftTripDetailFormBlocks,
      },
    ],
  },
];
