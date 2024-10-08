import {
  BifrostConfiguration,
  BlockType,
  LayoutBlockType,
  ScreenConfiguration,
} from "@/models/configuration";

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
  const rootScreenConfiguration: ScreenConfiguration = {
    layout: {
      blockType: BlockType.LAYOUT_BLOCK,
      layoutBlockType: LayoutBlockType.ROWS,
      childConfigurations: [],
    },
  };
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
    }

    return {
      hotelId,
      bifrostFormId,
      rootScreenConfiguration,
    };
  } else if (hostname === "theknollcroft.com") {
    hotelId = "knollcroft";
    bifrostFormId = "2";
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
  };
}
