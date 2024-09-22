import { KismetForm } from "@/components/KismetForm";
import { BifrostConfiguration } from "@/components/KismetForm/models";
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

  const root = createRoot(newFormContainer);
  root.render(
    <KismetForm
      bifrostTravelerId={bifrostTravelerId}
      bifrostConfiguration={bifrostConfiguration}
    />
  );

  console.log("☃️ The Bifrost is ready ☃️");
  console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
};
