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
  // const apiBaseUrl: string = "https://api.makekismet.com";
  const apiBaseUrl: string = "http://localhost:4000";

  root.render(
    <>
      <BifrostFormStateProvider bifrostApi={new BifrostApi({ apiBaseUrl })}>
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
