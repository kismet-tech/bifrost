import { KismetForm } from "./components/KismetForm";
import { Meta, StoryObj } from "@storybook/react";
import { knollcroftBusinessFormBlocks } from "./getBifrostConfiguration/knollcroftFormBlocks/knollcroftBusinessFormBlocks";
import { FormBlockType } from "./components/KismetForm/models";
import { knollcroftRoomOnlyFormBlocks } from "./getBifrostConfiguration/knollcroftFormBlocks/knollcroftRoomOnlyFormBlocks";

const meta: Meta<typeof KismetForm> = {
  title: "KismetForm",
  component: KismetForm,
};
export default meta;

type Story = StoryObj<typeof KismetForm>;

export const Example: Story = {
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      formBlocks: [
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
          formBlockType: FormBlockType.TEXT_AREA_INPUT,
          label: "Trip details",
          keyName: "additionalDetails",
          placeholder: "Tell us about your plans...",
        },
        {
          formBlockType: FormBlockType.BRANCHING_NODE,
          keyName: "booking_category",
          buttons: [
            {
              label: "Business",
              keyValue: "business",
              submitsForm: false,
              branchFormBlocks: knollcroftBusinessFormBlocks,
            },
            {
              label: "Social",
              keyValue: "social",
              submitsForm: false,
              branchFormBlocks: knollcroftRoomOnlyFormBlocks,
            },
            {
              label: "Other",
              keyValue: "other",
              submitsForm: false,
              branchFormBlocks: knollcroftRoomOnlyFormBlocks,
            },
          ],
        },
      ],
    },
  },
};
