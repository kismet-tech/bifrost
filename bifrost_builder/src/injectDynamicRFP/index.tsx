import { replaceForm } from "./replaceForm";
import { BifrostConfiguration } from "@/components/KismetForm/models";

interface InjectDynamicRFPProps {
  bifrostTravelerId: string;
  bifrostConfiguration: BifrostConfiguration;
}

export const injectDynamicRFP = ({
  bifrostTravelerId,
  bifrostConfiguration,
}: InjectDynamicRFPProps) => {
  if (bifrostConfiguration.formBlocks.length === 0) {
    return;
  }

  // <div id="kismet-dynamic-rfp-widget"></div>
  // Placeholder
  let dynamicRfpWidgetContainer: HTMLElement | null = document.getElementById(
    "kismet-dynamic-rfp-widget"
  );

  if (dynamicRfpWidgetContainer) {
    return replaceForm({
      dynamicRfpWidgetContainer,
      bifrostTravelerId,
      bifrostConfiguration,
    });
  }

  // Wordpress Contact Form 7
  // https://wordpress.org/plugins/contact-form-7/
  dynamicRfpWidgetContainer = document.querySelector("form.wpcf7-form");

  if (dynamicRfpWidgetContainer) {
    return replaceForm({
      dynamicRfpWidgetContainer,
      bifrostTravelerId,
      bifrostConfiguration,
    });
  }

  if (!dynamicRfpWidgetContainer) {
    console.error("Widget container not found");
  }
};
