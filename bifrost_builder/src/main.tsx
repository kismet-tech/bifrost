import "@/globals.css";
import "@radix-ui/themes/styles.css";

import { injectDynamicRFP } from "./injectDynamicRFP";
import "react-day-picker/dist/style.css";

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

  injectDynamicRFP();
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
