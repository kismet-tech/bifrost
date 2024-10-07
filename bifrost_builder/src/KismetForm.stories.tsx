import { Meta, StoryObj } from "@storybook/react";
import { useLayoutEffect } from "react";
import { KismetForm } from "./components/KismetForm";
import {
  blueTheme,
  radiusPresets,
} from "./components/KismetForm/models/themes";
import { knollcroftFormBlocks } from "./getBifrostConfiguration/knollcroftFormBlocks";
import { injectTheme } from "./injectDynamicRFP/replaceForm";

const meta: Meta<typeof KismetForm> = {
  title: "KismetForm",
  component: KismetForm,
};
export default meta;

type Story = StoryObj<typeof KismetForm>;

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

    return <KismetForm {...args} />;
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
