import "@/styles/index.css";
import { injectDynamicRFP } from "./injectDynamicRFP";
import { getBifrostConfiguration } from "./getBifrostConfiguration";
import { BifrostConfiguration } from "./components/KismetForm/models";
import { sentryScope } from "./instrument";
// import { time } from "console";


console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
console.log("🧊  Placing the Bifrost 🧊");
console.log("🧊  App Version: " + __APP_VERSION__ + " 🧊");
console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");

console.log(window.location.href);

if (window.location.href.includes("knollcroft.com")) {

  // Capture v1 error with a specific name
  const errorV1 = new Error("example v1");
  errorV1.name = "CustomErrorV1"; // Set a unique name for v1
  sentryScope.setTransactionName("my custom title for error");
  sentryScope.captureException(errorV1);

  // Capture v2 error with a different specific name
  const errorV2 = new Error("example v2");
  errorV2.name = "CustomErrorV2"; // Set a unique name for v2
  sentryScope.setTransactionName("my custom title for error 2");
  sentryScope.captureException(errorV2, {
    data: {
      currentUrl: window.location.href,
    },
  });

  // sentryScope.setTransactionName(`my custom title for error`);
  // sentryScope.captureException(new Error("example v1"));

  // sentryScope.setTransactionName(`my custom title for error 2`);
  // sentryScope.captureException(new Error("example v2"), {
  //   data: {
  //     currentUrl: window.location.href,
  //   },
  // });

  // sentryCaptureException(new Error("example v3"));
}

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
