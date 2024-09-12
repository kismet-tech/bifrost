import { FormBlockConfiguration, FormBlockType } from "../models";
import { knollcroftBusinessFormBlocks } from "./knollcroftBusinessFormBlocks";
import { knollcroftRoomOnlyFormBlocks } from "./knollcroftRoomOnlyFormBlocks";

export function getBifrostConfigurationFormBlocks(): FormBlockConfiguration[] {
  //   const currentUrl = window.location.href;
  //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

  //   const pathname = window.location.pathname;
  //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

  const hostname = window.location.hostname;

  const urlPathname = window.location.pathname;

  // if (hostname === "www.knollcroft.com" && urlPathname === "/contact") {
  if (
    hostname === "www.knollcroft.com" &&
    ["/contact", "/groups"].some(
      (knollcroftPathname) => knollcroftPathname === urlPathname
    )
  ) {
    return [
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
    ];
  } else if (hostname === "theknollcroft.com" && urlPathname === "/") {
    return [
      {
        formBlockType: FormBlockType.TEXT_INPUT,
        label: "Full name",
        keyName: "fullName",
        placeholder: "Your full name",
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
        label: "Phone",
        keyName: "phoneNumber",
        placeholder: "Your phone number",
        inputType: "tel",
      },
      {
        formBlockType: FormBlockType.TEXT_AREA_INPUT,
        label: "The details",
        keyName: "additionalDetails",
        placeholder: "Tell us about your plans...",
      },
    ];
  } else if (urlPathname.includes("/group-bookings")) {
    return [];
    // return [
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Full Name",
    //     name: "fullName",
    //     placeholder: "Your full name",
    //     inputType: "text",
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Email",
    //     name: "email",
    //     placeholder: "Your email address",
    //     inputType: "email",
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Phone Number",
    //     name: "phoneNumber",
    //     placeholder: "Your phone number",
    //     inputType: "tel",
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Company",
    //     name: "company",
    //     placeholder: "Your company name",
    //     inputType: "text",
    //   },
    //   {
    //     formFieldType: FormFieldType.SELECT,
    //     label: "Location",
    //     name: "location",
    //     options: [
    //       { label: "Lincoln Park", name: "lincoln_park" },
    //       { label: "Grand Beach, MI", name: "grand_beach" },
    //       { label: "New Buffalo, MI", name: "new_buffalo" },
    //       { label: "Little Italy", name: "little_italy" },
    //     ],
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT_AREA,
    //     label: "Additional Details",
    //     name: "additionalDetails",
    //     placeholder: "Any additional details...",
    //   },
    // ];
  } else if (urlPathname.includes("/extended-stays")) {
    return [];
    // return [
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Full Name",
    //     name: "fullName",
    //     placeholder: "Your full name",
    //     inputType: "text",
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Email",
    //     name: "email",
    //     placeholder: "Your email address",
    //     inputType: "email",
    //   },
    //   {
    //     formFieldType: FormFieldType.SELECT,
    //     label: "Location",
    //     name: "location",
    //     options: [
    //       { label: "Lincoln Park", name: "lincoln_park" },
    //       { label: "Grand Beach, MI", name: "grand_beach" },
    //       { label: "New Buffalo, MI", name: "new_buffalo" },
    //       { label: "Little Italy", name: "little_italy" },
    //     ],
    //   },
    //   {
    //     formFieldType: FormFieldType.SELECT,
    //     label: "Bed Type",
    //     name: "bedType",
    //     options: [
    //       { label: "Studio", name: "studio" },
    //       { label: "One", name: "one" },
    //       { label: "Two", name: "two" },
    //       { label: "Three", name: "three" },
    //     ],
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Check-In Date & Check-Out Date",
    //     name: "dates",
    //     placeholder: "Your check-in and check-out dates",
    //     inputType: "text",
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT,
    //     label: "Budget",
    //     name: "budget",
    //     placeholder: "Your budget",
    //     inputType: "text",
    //   },
    //   {
    //     formFieldType: FormFieldType.TEXT_AREA,
    //     label: "Additional Details",
    //     name: "additionalDetails",
    //     placeholder: "Any additional details...",
    //   },
    // ];
  }

  return [];
}
