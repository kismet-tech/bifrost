import { replaceForm } from "./replaceForm";

export const injectDynamicRFP = () => {
  // <div id="kismet-dynamic-rfp-widget"></div>
  // Placeholder
  let dynamicRfpWidgetContainer: HTMLElement | null = document.getElementById(
    "kismet-dynamic-rfp-widget"
  );

  if (dynamicRfpWidgetContainer) {
    return replaceForm({
      dynamicRfpWidgetContainer,
    });
  }

  // Wordpress Contact Form 7
  // https://wordpress.org/plugins/contact-form-7/
  dynamicRfpWidgetContainer = document.querySelector("form.wpcf7-form");

  if (dynamicRfpWidgetContainer) {
    return replaceForm({
      dynamicRfpWidgetContainer,
    });
  }

  if (!dynamicRfpWidgetContainer) {
    console.error("Widget container not found");
  }
};
