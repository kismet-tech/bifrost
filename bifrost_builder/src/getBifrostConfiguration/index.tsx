import {
  BifrostConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { knollcroftBusinessFormBlocks } from "./knollcroftBusinessFormBlocks";
import { knollcroftRoomOnlyFormBlocks } from "./knollcroftRoomOnlyFormBlocks";

export function getBifrostConfiguration(): BifrostConfiguration {
  //   const currentUrl = window.location.href;
  //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

  //   const pathname = window.location.pathname;
  //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

  const hostname = window.location.hostname;

  const urlPathname = window.location.pathname;

  console.log(`hostname: ${hostname}`);
  console.log(`urlPathname: ${urlPathname}`);

  // if (hostname === "www.knollcroft.com" && urlPathname === "/contact") {
  if (
    hostname === "www.knollcroft.com" &&
    ["/contact", "/groups"].some((knollcroftPathname) =>
      urlPathname.includes(knollcroftPathname)
    )
  ) {
    return {
      hotelId: "knollcroft",
      bifrostFormId: "1",
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
    };
  } else if (hostname === "theknollcroft.com" && urlPathname === "/") {
    return {
      hotelId: "knollcroft",
      bifrostFormId: "2",
      formBlocks: [
        {
          formBlockType: FormBlockType.METADATA,
          keyName: "inquiryCategory",
          keyValue: "Group Booking",
        },
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
      ],
    };
  } else if (hostname.includes("theneighborhoodhotel.com")) {
    if (urlPathname.includes("/group-bookings")) {
      return {
        hotelId: "nbhd",
        bifrostFormId: "3",
        formBlocks: [],
        // formBlocks: nbhdGroupBookingsFormBlocks,
      };
    } else if (urlPathname.includes("/extended-stays")) {
      return { hotelId: "nbhd", bifrostFormId: "4", formBlocks: [] };
      // return {
      //   hotelId: "nbhd",
      //   bifrostFormId: "4",
      //   formBlocks: nbhdExtendedStayBlocks,
      // };
    }
  }

  return { hotelId: "", bifrostFormId: "5", formBlocks: [] };
}
