import "@/globals.css";
import { injectDynamicRFP } from "./injectDynamicRFP";

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

  console.log("THIS HERE WAS HIT TODAY");

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
