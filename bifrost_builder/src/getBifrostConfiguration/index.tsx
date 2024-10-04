import {
  BifrostConfiguration,
  FormBlockConfiguration,
  FormBlockType,
} from "@/components/KismetForm/models";
import { nbhdGroupBookingsFormBlocks } from "./nbhdFormBlocks/nbhdGroupBookings";
import { nbhdExtendedStayBlocks } from "./nbhdFormBlocks/nbhdExtendedStays";
import { knollcroftFormBlocks } from "./knollcroftFormBlocks";
import { nbhdRetreatBlocks } from "./nbhdFormBlocks/nbhdRetreat";

export function getBifrostConfiguration(): BifrostConfiguration {
  //   const currentUrl = window.location.href;
  //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

  //   const pathname = window.location.pathname;
  //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

  const hostname = window.location.hostname;

  const urlPathname = window.location.pathname;

  console.log(`hostname: ${hostname}`);
  console.log(`urlPathname: ${urlPathname}`);

  let hotelId: string = "";
  let formBlocks: FormBlockConfiguration[] = [];
  let bifrostFormId: string = "";

  // if (hostname === "www.knollcroft.com" && urlPathname === "/contact") {
  if (hostname === "www.knollcroft.com") {
    hotelId = "knollcroft";

    if (
      ["/contact", "/groups"].some((knollcroftPathname) =>
        urlPathname.includes(knollcroftPathname)
      )
    ) {
      bifrostFormId = "1";

      formBlocks = knollcroftFormBlocks;
    }

    return {
      hotelId,
      bifrostFormId,
      formBlocks,
    };
  } else if (hostname === "theknollcroft.com") {
    hotelId = "knollcroft";
    bifrostFormId = "2";

    formBlocks = [
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
    ];
  } else if (hostname.includes("theneighborhoodhotel.com")) {
    hotelId = "nbhd";

    if (urlPathname.includes("/group-bookings")) {
      bifrostFormId = "3";
      formBlocks = nbhdGroupBookingsFormBlocks;
    } else if (urlPathname.includes("/extended-stays")) {
      bifrostFormId = "4";
      formBlocks = nbhdExtendedStayBlocks;
    } else if (urlPathname.includes("/host-a-retreat")) {
      bifrostFormId = "5";
      formBlocks = nbhdRetreatBlocks;
    }
  }

  return {
    hotelId,
    bifrostFormId,
    formBlocks,
  };
}
