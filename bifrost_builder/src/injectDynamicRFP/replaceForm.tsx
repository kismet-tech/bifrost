// import { ThemeVariables } from "@/models/configuration/themes";
import { createRoot } from "react-dom/client";
import {
  BifrostApi,
  BifrostFormApplication,
  BifrostFormStateProvider,
} from "@kismet_ai/aura";
interface ReplaceFormProps {
  dynamicRfpWidgetContainer: HTMLElement;
}

export const replaceForm = async ({
  dynamicRfpWidgetContainer,
}: ReplaceFormProps) => {
  // console.log("Existing form found. Replacing the form now.");
  const newFormContainer = document.createElement("div");
  newFormContainer.classList.add("kismet-dynamic-rfp-widget");
  dynamicRfpWidgetContainer.replaceWith(newFormContainer);

  // if (bifrostConfiguration.themeVariables) {
  //   injectTheme(newFormContainer, bifrostConfiguration.themeVariables);
  // }

  const root = createRoot(newFormContainer);
  root.render(
    <>
      <BifrostFormStateProvider bifrostApi={new BifrostApi()}>
        <BifrostFormApplication />
      </BifrostFormStateProvider>
    </>
  );

  console.log("☃️ The Bifrost is ready ☃️");
  console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
};

// export const injectTheme = (
//   formContainer: HTMLDivElement,
//   themeVariables: ThemeVariables
// ) => {
//   for (const themeVariable of Object.entries(themeVariables)) {
//     const [varName, varValue] = themeVariable;
//     formContainer.style.setProperty("--" + varName, varValue);
//   }
// };
