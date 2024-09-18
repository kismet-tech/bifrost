import "@/globals.css";
import { injectDynamicRFP } from "./injectDynamicRFP";
import { BifrostConfiguration } from "./components/KismetForm/models";
import { getBifrostConfiguration } from "./getBifrostConfiguration";

declare global {
  interface Window {
    hasBifrostLoaded?: boolean;
  }
}

export const main = () => {
  if (!window.hasBifrostLoaded) {
    window.hasBifrostLoaded = true;

    console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
    console.log("🧊  Placing the Bifrost 🧊");
    console.log("🧊  App Version: " + __APP_VERSION__ + " 🧊");
    console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");

    const bifrostConfiguration: BifrostConfiguration =
      getBifrostConfiguration();

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      // If the DOM is already loaded, replace the form immediately
      injectDynamicRFP({ bifrostConfiguration });
    } else {
      // Otherwise, set an event listener
      document.addEventListener("DOMContentLoaded", () => {
        injectDynamicRFP({ bifrostConfiguration });
      });
    }
  }
};

main();
