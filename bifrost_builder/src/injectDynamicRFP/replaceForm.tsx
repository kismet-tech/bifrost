import { KismetRootComponent } from "@/components/RootComponent/RootComponent";
import { ThemeVariables } from "@/models/configuration/themes";
import { BifrostConfiguration } from "@/models/configuration";
import { createRoot } from "react-dom/client";

interface ReplaceFormProps {
  dynamicRfpWidgetContainer: HTMLElement;
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export const replaceForm = async ({
  dynamicRfpWidgetContainer,
  bifrostTravelerId,
  bifrostConfiguration,
}: ReplaceFormProps) => {
  // console.log("Existing form found. Replacing the form now.");
  const newFormContainer = document.createElement("div");
  newFormContainer.classList.add("kismet-dynamic-rfp-widget");
  dynamicRfpWidgetContainer.replaceWith(newFormContainer);

  if (bifrostConfiguration.themeVariables) {
    injectTheme(newFormContainer, bifrostConfiguration.themeVariables);
  }

  const root = createRoot(newFormContainer);
  root.render(
    <KismetRootComponent
      bifrostTravelerId={bifrostTravelerId}
      bifrostConfiguration={bifrostConfiguration}
    />
  );

  console.log("☃️ The Bifrost is ready ☃️");
  console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
};

export const injectTheme = (
  formContainer: HTMLDivElement,
  themeVariables: ThemeVariables
) => {
  for (const themeVariable of Object.entries(themeVariables)) {
    const [varName, varValue] = themeVariable;
    formContainer.style.setProperty("--" + varName, varValue);
  }
};
