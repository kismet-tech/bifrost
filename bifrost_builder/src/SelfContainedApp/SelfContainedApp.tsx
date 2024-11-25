import "@/globals.css";
import { KismetRootComponent } from "../components/RootComponent/RootComponent";
import { localTestingConfiguration } from "./localTestingConfiguration";

function SelfContainedApp() {
  return (
    <div className="kismet-dynamic-rfp-widget">
      <KismetRootComponent
        bifrostTravelerId="local_testing"
        bifrostConfiguration={localTestingConfiguration}
      />
    </div>
  );
}

export default SelfContainedApp;
