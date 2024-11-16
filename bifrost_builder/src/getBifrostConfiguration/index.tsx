import {
  BifrostConfiguration,
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";
import { ThemeVariables, knollcroftTheme } from "@/models/configuration/themes";
import { knollcroftV2InstantOfferScreenConfiguration } from "./knollcroftV2Screens/screenConfigurations/knollcroftV2InstantOfferScreenConfiguration";
import { knollcroftV2RootScreenConfiguration } from "./knollcroftV2Screens/screenConfigurations/knollcroftV2RootScreenConfiguration";

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
  let rootScreenConfiguration: ScreenConfiguration = {
    formQuestionIds: [],
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [],
    },
  };
  let bifrostFormId: string = "";
  const themeVariables: ThemeVariables = knollcroftTheme;

  // if (hostname === "www.knollcroft.com" && urlPathname === "/contact") {
  if (hostname === "www.knollcroft.com") {
    hotelId = "mews-grand-hotel";

    if (urlPathname.includes("groups-beta")) {
      bifrostFormId = "16";
      rootScreenConfiguration = knollcroftV2InstantOfferScreenConfiguration;
    } else if (
      ["/contact"].some((knollcroftPathname) =>
        urlPathname.includes(knollcroftPathname)
      )
    ) {
      rootScreenConfiguration = knollcroftV2RootScreenConfiguration;
    } else if (
      ["/groups"].some((knollcroftPathname) =>
        urlPathname.includes(knollcroftPathname)
      )
    ) {
      bifrostFormId = "1";
      rootScreenConfiguration = knollcroftV2RootScreenConfiguration;
    }
  } else if (hostname === "theknollcroft.com") {
    hotelId = "mews-grand-hotel";
    bifrostFormId = "2";
    rootScreenConfiguration = knollcroftV2RootScreenConfiguration;
  } else if (hostname.includes("theneighborhoodhotel.com")) {
    hotelId = "nbhd";

    if (urlPathname.includes("/group-bookings")) {
      bifrostFormId = "3";
    } else if (urlPathname.includes("/extended-stays")) {
      bifrostFormId = "4";
    } else if (urlPathname.includes("/host-a-retreat")) {
      bifrostFormId = "5";
    }
  }

  return {
    hotelId,
    bifrostFormId,
    rootScreenConfiguration,
    themeVariables,
  };
}
