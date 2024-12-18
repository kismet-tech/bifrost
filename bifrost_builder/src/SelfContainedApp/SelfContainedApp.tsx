import "@/globals.css";
import {
  BifrostApi,
  BifrostFormApplication,
  BifrostFormStateProvider,
} from "@kismet_ai/aura";

import "@/globals.css";
import "@radix-ui/themes/styles.css";
import "react-day-picker/dist/style.css";

function SelfContainedApp() {
  // const apiBaseUrl: string = "https://api.makekismet.com";
  const apiBaseUrl: string = "http://localhost:4000";

  return (
    <div className="kismet-dynamic-rfp-widget">
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-day-picker/lib/style.css"
      ></link>
      <BifrostFormStateProvider
        bifrostApi={
          new BifrostApi({
            apiBaseUrl,
          })
        }
      >
        <BifrostFormApplication />
      </BifrostFormStateProvider>
    </div>
  );
}

export default SelfContainedApp;
