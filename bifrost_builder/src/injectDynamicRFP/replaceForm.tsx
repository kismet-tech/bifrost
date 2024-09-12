import { KismetForm } from "@/components/KismetForm";
import { FormBlockConfiguration } from "@/components/KismetForm/models";
import { createRoot } from "react-dom/client";

interface ReplaceFormProps {
  dynamicRfpWidgetContainer: HTMLElement;
  formBlocks: FormBlockConfiguration[];
}

export const replaceForm = async ({
  dynamicRfpWidgetContainer,
  formBlocks,
}: ReplaceFormProps) => {
  // console.log("Existing form found. Replacing the form now.");
  const newFormContainer = document.createElement("div");
  dynamicRfpWidgetContainer.replaceWith(newFormContainer);

  const root = createRoot(newFormContainer);
  root.render(<KismetForm formFieldConfigurations={formBlocks} />);

  console.log("☃️  The Bifrost is ready ☃️");
  console.log("🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊🧊");
};
