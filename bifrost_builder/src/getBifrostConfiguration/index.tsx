import {
  BifrostConfiguration,
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";
import { knollcroftRootScreenConfiguration } from "./knollcroftScreens/knollcroftRootScreenConfiguration";
import { neutralTheme, ThemeVariables } from "@/models/configuration/themes";

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
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      rows: [],
    },
  };
  let bifrostFormId: string = "";
  const themeVariables: ThemeVariables = neutralTheme;

  // if (hostname === "www.knollcroft.com" && urlPathname === "/contact") {
  if (hostname === "www.knollcroft.com") {
    hotelId = "knollcroft";

    if (
      ["/contact", "/groups"].some((knollcroftPathname) =>
        urlPathname.includes(knollcroftPathname)
      )
    ) {
      bifrostFormId = "1";
      rootScreenConfiguration = knollcroftRootScreenConfiguration;
    }
  } else if (hostname === "theknollcroft.com") {
    hotelId = "knollcroft";
    bifrostFormId = "2";
    rootScreenConfiguration = knollcroftRootScreenConfiguration;
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
