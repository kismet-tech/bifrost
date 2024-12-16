import "@/globals.css";
import {
  BifrostApi,
  BifrostFormApplication,
  BifrostFormStateProvider,
} from "@kismet_ai/aura";

function SelfContainedApp() {
  return (
    <div className="kismet-dynamic-rfp-widget">
      {/* <BifrostFormApplication /> */}

      {/* <AppViewport> */}
      <BifrostFormStateProvider bifrostApi={new BifrostApi()}>
        <BifrostFormApplication />
      </BifrostFormStateProvider>
      {/* </AppViewport> */}
    </div>
  );
}

export default SelfContainedApp;
