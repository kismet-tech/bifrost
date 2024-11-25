import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SelfContainedApp from "./SelfContainedApp/SelfContainedApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SelfContainedApp />
  </StrictMode>
);
