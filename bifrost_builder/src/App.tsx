import "@/globals.css";
import { KismetForm } from "./components/KismetForm";

function App() {
  return (
    <>
      <KismetForm
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
