import "@/globals.css";
import { KismetRootComponent } from "./components/RootComponent/RootComponent";

function App() {
  return (
    <>
      <KismetRootComponent
        bifrostTravelerId="local_testing"
        bifrostConfiguration={{
          hotelId: "testing",
          bifrostFormId: "testing-1",
          formBlocks: [],
        }}
      />
    </>
  );
}

export default App;
