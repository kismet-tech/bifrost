import "@/globals.css";
import { KismetRootComponent } from "../components/RootComponent/RootComponent";
import { localTestingConfiguration } from "./localTestingConfiguration";

function App() {
  return (
    <>
      <KismetRootComponent
        bifrostTravelerId="local_testing"
        bifrostConfiguration={localTestingConfiguration}
      />
    </>
  );
}

export default App;
