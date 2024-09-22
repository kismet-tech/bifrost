import "@/globals.css";
import { KismetForm } from "./components/KismetForm";

function App() {
  return (
    <>
      <KismetForm
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
