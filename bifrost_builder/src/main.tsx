import "@/globals.css";
import { injectDynamicRFP } from "./injectDynamicRFP";
import { BifrostConfiguration } from "./components/RootComponent/models";
import { getBifrostConfiguration } from "./getBifrostConfiguration";
import { registerBifrostPageVisit } from "./api/registerBifrostPageVisit";
import { getBifrostTravelerId } from "./utilities/getBifrostTravelerId";
import { maybeJoinTravelerWithKismetCampaign } from "./utilities/maybeJoinTravelerWithKismetCampaign";

declare global {
  interface Window {
    hasBifrostLoaded?: boolean;
  }
}

const loadBifrost = async () => {
  console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
  console.log("🧊  Placing the Bifrost 🧊");
  console.log("🧊  App Version: " + __APP_VERSION__ + " 🧊");
  console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");

  const bifrostConfiguration: BifrostConfiguration = getBifrostConfiguration();

  const { bifrostTravelerId } = await getBifrostTravelerId();

  console.log(`bifrostTravelerId: '${bifrostTravelerId}'`);

  registerBifrostPageVisit({
    hotelId: bifrostConfiguration.hotelId,
    url: window.location.href,
    referrerUrl: document.referrer,
    bifrostTravelerId,
  });

  maybeJoinTravelerWithKismetCampaign({
    bifrostTravelerId,
  });

  injectDynamicRFP({ bifrostTravelerId, bifrostConfiguration });
};

export const main = () => {
  if (!window.hasBifrostLoaded) {
    window.hasBifrostLoaded = true;

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      loadBifrost();
    } else {
      // Otherwise, set an event listener
      document.addEventListener("DOMContentLoaded", () => {
        loadBifrost();
      });
    }
  }
};

main();
