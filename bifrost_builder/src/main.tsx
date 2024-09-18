import "@/globals.css";
import { injectDynamicRFP } from "./injectDynamicRFP";
import { BifrostConfiguration } from "./components/KismetForm/models";
import { getBifrostConfiguration } from "./getBifrostConfiguration";

console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
console.log("🧊  Placing the Bifrost 🧊");
console.log("🧊  App Version: " + __APP_VERSION__ + " 🧊");
console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");

export const main = () => {
  const bifrostConfiguration: BifrostConfiguration = getBifrostConfiguration();

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
};

main();
