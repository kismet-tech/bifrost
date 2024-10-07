import { Meta, StoryObj } from "@storybook/react";
import { useLayoutEffect } from "react";
import { KismetRootComponent } from "./components/RootComponent/RootComponent";
import {
  blueTheme,
  radiusPresets,
} from "./components/RootComponent/models/themes";
import { knollcroftFormBlocks } from "./getBifrostConfiguration/knollcroftFormBlocks";
import { injectTheme } from "./injectDynamicRFP/replaceForm";

const meta: Meta<typeof KismetRootComponent> = {
  title: "KismetForm",
  component: KismetRootComponent,
};
export default meta;

type Story = StoryObj<typeof KismetRootComponent>;

export const Example: Story = {
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      formBlocks: knollcroftFormBlocks,
    },
  },
};

export const WithCustomTheme: Story = {
  render: (args) => {
    useLayoutEffect(() => {
      const formContainer = document.querySelector(
        ".kismet-dynamic-rfp-widget"
      ) as HTMLDivElement;
      const themeVariables = args.bifrostConfiguration.themeVariables;

      if (formContainer && themeVariables) {
        // Apply a custom font
        formContainer.style.setProperty("font-family", "Outfit");

        // Apply the theme from the bifrost configuration
        // This will normally be done in our `replaceForm` function
        injectTheme(formContainer, themeVariables);
      }
    }, []);

    return <KismetRootComponent {...args} />;
  },
  args: {
    bifrostTravelerId: "local_testing",
    bifrostConfiguration: {
      hotelId: "testing",
      bifrostFormId: "testing-1",
      formBlocks: knollcroftFormBlocks,
      themeVariables: { ...blueTheme, radius: radiusPresets.xl },
    },
  },
};
