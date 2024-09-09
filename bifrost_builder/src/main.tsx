import "@/styles/index.css";
import { createRoot } from "react-dom/client";

import { KismetForm } from "./components/KismetForm";
import { FormFieldConfiguration } from "./components/KismetForm/models";
import { getFormFieldConfigurations } from "./components/KismetForm/getFormConfiguration";

console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
console.log("🧊  Placing the Bifrost 🧊");
console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");

const replaceForm = async () => {
  const formFieldConfigurations: FormFieldConfiguration[] =
    getFormFieldConfigurations();

  if (formFieldConfigurations.length === 0) {
    return;
  }

  const existingForm = document.querySelector("form.wpcf7-form");

  if (existingForm) {
    // console.log("Existing form found. Replacing the form now.");

    const newFormContainer = document.createElement("div");
    existingForm.replaceWith(newFormContainer);

    const root = createRoot(newFormContainer);
    root.render(
      <KismetForm formFieldConfigurations={formFieldConfigurations} />
    );

    console.log("☃️  The Bifrost is ready ☃️");
    console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
  } else {
    // console.error("Existing form not found. Please check the selector.");
  }
};

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  // If the DOM is already loaded, replace the form immediately
  // console.log("DOM is already loaded, initiating Bifrost.");
  replaceForm();
} else {
  // Otherwise, set an event listener
  document.addEventListener("DOMContentLoaded", () => {
    // console.log("DOM fully loaded and parsed, initiating Bifrost.");
    replaceForm();
  });
}
